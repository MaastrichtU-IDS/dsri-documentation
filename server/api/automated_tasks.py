import csv
import datetime
import os
import pathlib
from textwrap import dedent

from api.config import settings
from api.gpus import GpuBooking
from api.notifications import post_msg_to_slack, send_email
from api.utils import log, oc_login
from kubernetes.dynamic.exceptions import NotFoundError
from fastapi.encoders import jsonable_encoder
from sqlmodel import Session, SQLModel, create_engine, select

def _err(err) -> str:
    """Readable error: the API's message for kubernetes errors, otherwise a short str()."""
    return err.summary() if hasattr(err, 'summary') else str(err)[:200]

def _container_name(dyn_client, project_id, app_id) -> str:
    """Name of the container to patch in the Deployment `app_id`.
    Templates don't always name the container after the app (e.g. 'terminal'),
    and a strategic-merge patch with an unknown name would try to add a new container (422)."""
    dep = dyn_client.resources.get(api_version='apps/v1', kind='Deployment').get(name=app_id, namespace=project_id)
    names = [c.name for c in dep.spec.template.spec.containers]
    return app_id if app_id in names else names[0]

def _safe(fn, *args, **kwargs) -> None:
    """Notifications must never block enabling/disabling GPUs."""
    try:
        fn(*args, **kwargs)
    except Exception as err:
        log.error(f'{fn.__name__} failed: {err}')

def _patch_resource(dyn_client, api_version, kind, name, namespace, body_spec):
    """ Helper function to patch a resource """
    resource = dyn_client.resources.get(api_version=api_version, kind=kind)
    body = {
        'kind': kind,
        'apiVersion': api_version,
        'metadata': {'name': name},
        'spec': body_spec,
    }
    resource.patch(body=body, namespace=namespace)

def disable_gpu(project_id, app_id, dyn_client) -> str:
    logs = ''

    try:
        # Turn down the Deployment to 0 replicas
        _patch_resource(
            dyn_client=dyn_client, api_version='apps/v1', kind='Deployment', name=app_id, namespace=project_id, 
            body_spec= {
                'replicas': 0,
            }
        )
        logs = logs + f'✅ GPU pod *{app_id}* in *{project_id}* stopped\n'

    except Exception as err:
        logs = logs + f'⚠️  Error stopping the workspace *{app_id}* in *{project_id}*: {_err(err)}\n'

    try:
        # Patch Deployment GPU limits
        _patch_resource(
            dyn_client=dyn_client, api_version='apps/v1', kind='Deployment', name=app_id, namespace=project_id,
            body_spec= {
                'template': {
                    'spec': {
                        'containers': [
                            {
                                "name": _container_name(dyn_client, project_id, app_id),
                                "resources": {
                                    "limits": {
                                        "cpu": "32",
                                        "memory": "192Gi",
                                        "nvidia.com/gpu": None
                                    },
                                    "requests": {
                                        "cpu": "2",
                                        "memory": "4Gi",
                                        "nvidia.com/gpu": None
                                    }
                                }
                            }
                        ]
                    }
                }
            }
        )
        logs = logs + f'✅ GPU limits disabled for the pod *{app_id}* in *{project_id}*\n'

    except Exception as err:
        logs = logs + f'⚠️  Error disabling GPU limits for the pod *{app_id}* in *{project_id}*: {_err(err)}\n'

    try:
        # Patch ResourceQuota for GPU
        _patch_resource(
            dyn_client=dyn_client, api_version='v1', kind='ResourceQuota', name='gpu-quota', namespace=project_id,
            body_spec= {
                "hard": { "requests.nvidia.com/gpu": 0 }
            }
        )
        logs = logs + f'🧊 GPU quota of {project_id} set to 0'
        log.info(logs)

    except Exception as err:
        logs = logs + f'❌ Could not set the GPU quota to 0 in *{project_id}*. Error: {_err(err)}'

    return logs

CONTACT = '<a href="mailto:rcs-ub@maastrichtuniversity.nl">rcs-ub@maastrichtuniversity.nl</a>'
DOCS = '<a href="https://dsri.maastrichtuniversity.nl/docs/deploy-on-gpu" target="_blank">the documentation</a>'

def _project_exists(dyn_client, project_id):
    """True/False if we can tell, None if unknown (e.g. no permission to read namespaces)."""
    try:
        dyn_client.resources.get(api_version='v1', kind='Namespace').get(name=project_id)
        return True
    except NotFoundError:
        return False
    except Exception:
        return None

def enable_gpu(project_id, app_id, dyn_client):
    """Enable the GPU for a booking.
    Returns (slack_logs, email_html, started): email_html is the complete user message."""
    # 1) GPU quota of the project
    try:
        _patch_resource(
            dyn_client=dyn_client, api_version='v1', kind='ResourceQuota', name='gpu-quota', namespace=project_id,
            body_spec={"hard": {"requests.nvidia.com/gpu": 1}}
        )
    except NotFoundError:
        if _project_exists(dyn_client, project_id) is False:
            slack = f'❌ Project *{project_id}* does not exist, GPU not enabled'
            email = (f'⚠️ Your GPU booking for project <b>{project_id}</b> could not start: '
                     f'this project does not exist on the DSRI.<br/><br/>'
                     f'Check the project ID you used for your booking, and contact us at {CONTACT} so we can correct it.')
        else:
            slack = f'❌ Project *{project_id}* has no *gpu-quota* ResourceQuota, GPU not enabled'
            email = (f'⚠️ Your GPU booking for project <b>{project_id}</b> could not start automatically: '
                     f'the project is not set up for GPU usage yet.<br/><br/>'
                     f'Please contact us at {CONTACT} and we will enable it manually.')
        return slack, email, False
    except Exception as err:
        slack = f'❌ Could not set the GPU quota to 1 in *{project_id}*. Error: {_err(err)}'
        email = (f'⚠️ Your GPU booking for project <b>{project_id}</b> could not start automatically because of a technical error.<br/><br/>'
                 f'Please contact us at {CONTACT} and we will enable it manually.')
        return slack, email, False

    slack = f'✅ GPU quota of *{project_id}* set to *1*\n'

    # 2) GPU limits of the workspace (Deployment)
    try:
        _patch_resource(
            dyn_client=dyn_client, api_version='apps/v1', kind='Deployment', name=app_id, namespace=project_id,
            body_spec={
                'template': {
                    'spec': {
                        'containers': [
                            {
                                "name": _container_name(dyn_client, project_id, app_id),
                                "resources": {
                                    "limits": {"cpu": "64", "memory": "256Gi", "nvidia.com/gpu": "1"},
                                    "requests": {"cpu": "2", "memory": "4Gi", "nvidia.com/gpu": "1"}
                                }
                            }
                        ]
                    }
                }
            }
        )
        slack += f'✅ GPU limits of *{app_id}* in *{project_id}* set to *1*'
        email = (f'✅ Your GPU booking in project <b>{project_id}</b> has started!<br/><br/>'
                 f'The GPU has been enabled for your workspace <b>{app_id}</b>. '
                 f'Restart the workspace if needed, and start using the GPU.')
    except Exception as err:
        slack += f'⚠️  Could not change the GPU limits for *{app_id}* in *{project_id}*. Error: {_err(err)}'
        email = (f'✅ Your GPU booking in project <b>{project_id}</b> has started, and a GPU is available in the project.<br/><br/>'
                 f'However, the workspace <b>{app_id}</b> was not found, so the GPU could not be added to it automatically. '
                 f'You can add it to your workspace yourself.')
    return slack, email, True

def check_gpu_bookings() -> None:
    log.info(f'🔎 Checking GPU reservations to send booking notifications on the {datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%S")}')

    # Connect to the SQL DB
    engine = create_engine(settings.SQL_URL)
    SQLModel.metadata.create_all(engine)

    # Connect to the OpenShift cluster
    dyn_client = oc_login()

    # Query the SQL DB to get the GPU reservations
    # And send msgs if reservations starts/ends
    with Session(engine) as session:
        statement = select(GpuBooking)
        results = session.exec(statement).all()

        for resa in results:
            try:
                resa = jsonable_encoder(resa)
                start_date = datetime.datetime.fromisoformat(resa['starting_date']).date()
                end_date = datetime.datetime.fromisoformat(resa['ending_date']).date()

                # Check GPU booking ending tomorrow (we stop it at end_date + 1)
                if end_date == datetime.date.today():
                    email_msg = (
                        f'⚠️ Your GPU booking in project <b>{resa["project_id"]}</b> ends tomorrow at 9:00am.<br/><br/>'
                        f'At that moment your workspace <b>{resa["app_id"]}</b> will be <b>stopped</b> and the GPU removed from it. '
                        f'Anything outside the persistent folder will be lost, so make sure all data you want to keep is in the persistent folder.<br/><br/>'
                        f'Afterwards you can start the workspace again (without GPU) by scaling it back up to 1 pod.'
                    )
                    _safe(send_email, email_msg, to=resa["user_email"], subject="📀 DSRI GPU booking ending tomorrow")

                # Check if GPU booking end date +1 day is today (since we switch in the morning, it prevents losing a day)
                if end_date + datetime.timedelta(days=1) == datetime.date.today():
                    # Disable first: a failing email must never leave the GPU enabled
                    slack_msg = disable_gpu(resa["project_id"], resa["app_id"], dyn_client)

                    email_msg = (
                        f'⚠️ Your GPU booking in project <b>{resa["project_id"]}</b> has ended. '
                        f'Your workspace <b>{resa["app_id"]}</b> has been stopped and GPU access in your project has been disabled.<br/><br/>'
                        f'You can start the workspace again (without GPU) by scaling it back up to 1 pod.'
                    )
                    _safe(send_email, email_msg, to=resa["user_email"], subject="📀 DSRI GPU booking ended")
                    slack_msg = dedent(f"""\
                                        🚀🔌 Disabling the GPU for {resa["user_email"]} in *{resa["project_id"]}* (from {start_date} and {end_date}):\n""") + slack_msg
                    _safe(post_msg_to_slack, slack_msg)


                # Check GPU booking starting
                if start_date == datetime.date.today():
                    slack_logs, email_msg, started = enable_gpu(resa["project_id"], resa["app_id"], dyn_client)
                    slack_msg = (f'🚀🔋 Enabling the GPU for {resa["user_email"]} in *{resa["project_id"]}* '
                                 f'(from {start_date} to {end_date}):\n') + slack_logs
                    if started:
                        email_msg += (f'<br/><br/>For more details on using the GPU, see {DOCS}.<br/><br/>'
                                      f'The GPU will be automatically disabled at the end of your booking, '
                                      f'on {end_date + datetime.timedelta(days=1)} at 9:00am.')
                        subject = "📀 DSRI GPU booking started"
                    else:
                        subject = "⚠️ DSRI GPU booking could not start"
                    _safe(send_email, email_msg, to=resa["user_email"], subject=subject)
                    _safe(post_msg_to_slack, slack_msg)

            except Exception as err:
                log.error(err)

def backup_database() -> None:
    log.info(f'💾 Backing up the SQL database (export to CSV) on the {datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%S")}')

    # Connect to the SQL DB
    engine = create_engine(settings.SQL_URL)
    SQLModel.metadata.create_all(engine)
    DUMP_PATH = '/backup'

    with Session(engine) as session:
        date = datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
        folder_path = f'{DUMP_PATH}/dsri-db_{date}'
        pathlib.Path(folder_path).mkdir(parents=True, exist_ok=True)

        # Dump GPU bookings
        outfile = open(f'{folder_path}/dsri-db_{date}_gpu-booking.csv', 'w')
        writer = csv.writer(outfile)
        statement = select(GpuBooking)
        results = session.exec(statement).all()
        [writer.writerow([getattr(curr, column.name) for column in GpuBooking.__mapper__.columns]) for curr in results]
        outfile.close()

        log.info(f'✅ Database backed up successfully on the {date}')