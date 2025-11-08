import csv
import datetime
import os
import pathlib

from api.config import settings
from api.gpus import GpuBooking
from api.notifications import post_msg_to_slack, send_email
from api.users import User
from api.utils import log, oc_login
from fastapi.encoders import jsonable_encoder
from sqlmodel import Session, SQLModel, create_engine, select



def disable_gpu(project_id, app_id, dyn_client) -> str:
    logs = ''

    try:
        # Turn down the Deployment to 0 replicas
        dyn_dc = dyn_client.resources.get(api_version=settings.CLUSTER_API_VERSION, kind='Deployment')
        body = {
            'kind': 'Deployment',
            'apiVersion': settings.CLUSTER_API_VERSION,
            'metadata': {'name': app_id},
            'spec': {
                'replicas': 0,
            }
        }
        dyn_dc.patch(body=body, namespace=project_id)
        logs = logs + f'✅ GPU pod *{app_id}* in *{project_id}* stopped\n'

    except Exception as err:
        logs = logs + f'⚠️  Error stopping the workspace *{app_id}* in *{project_id}*: {str(err)[:21]}\n'

    try:
        # Patch Deployment GPU limits
        dyn_dc = dyn_client.resources.get(api_version=settings.CLUSTER_API_VERSION, kind='Deployment')
        body = {
            'kind': 'Deployment',
            'apiVersion': settings.CLUSTER_API_VERSION,
            'metadata': {'name': app_id},
            'spec': {
                'template': {
                    'spec': {
                        'containers': [
                            {
                                "name": app_id,
                                "resources": {}
                            }
                        ]
                    }
                }
            }
        }
        dyn_dc.patch(body=body, namespace=project_id)
        logs = logs + f'✅ GPU limits disabled for the pod *{app_id}* in *{project_id}\n'

    except Exception as err:
        logs = logs + f'⚠️  Error disabling GPU limits for the pod *{app_id}* in *{project_id}*: {str(err)[:21]}\n'

    # Patch ResourceQuota for GPU
    try:
        dyn_quota = dyn_client.resources.get(api_version='v1', kind='ResourceQuota')
        body = {
            'kind': 'ResourceQuota',
            'apiVersion': 'v1',
            'metadata': {'name': 'gpu-quota'},
            "spec": {
                "hard": { "requests.nvidia.com/gpu": 0 }
            }
        }
        dyn_quota.patch(body=body, namespace=project_id)
        logs = logs + f'🧊 GPU quota of {project_id} set to 0'
        log.info(logs)

    except Exception as err:
        logs = logs + f'❌ Could not set the GPU quota to 0 in *{project_id}*. Error: {str(err)[:21]}'

    return logs

    # with oc.project(project_id), oc.timeout(10*60):
    #     log.info(f"✅ Found the project {oc.get_project_name()}, disabling GPU")

    # Stop the GPU pod, and change GPU quota to 0
    # cmds = [
    #     """oc patch dc/""" + app_id + """ --type=json -p='[{"op": "replace", "path": "/spec/replicas", "value": 0}]' -n """ + project_id,
    #     """oc patch dc/""" + app_id + """ --type=json -p='[{"op": "replace", "path": "/spec/template/spec/containers/0/resources", "value": {}}]' -n """ + project_id,
    #     """oc patch resourcequota/gpu-quota --patch '{"spec":{"hard": {"requests.nvidia.com/gpu": 0}}}' -n """ + project_id
    # ]
    # for cmd in cmds:
    #     # os.system(cmd)
    #     # log.info(subprocess.run(cmd.split(' '), capture_output=True))
    #     log.info(subprocess.check_output(cmd, shell=True, stderr=subprocess.STDOUT))

    #     return f"🛬✅ Successfully disabled GPU for {app_id} in {project_id}"
    # except Exception as err:
    #     return f"🛬⚠️ Could not disable the GPU for {app_id} in {project_id}: {str(err)[:21]}"



def enable_gpu(project_id, app_id, dyn_client):
    logs = ''
    email = ''
    try:
        dyn_quota = dyn_client.resources.get(api_version='v1', kind='ResourceQuota')
        body = {
            'kind': 'ResourceQuota',
            'apiVersion': 'v1',
            'metadata': {'name': 'gpu-quota'},
            "spec": {
                "hard": { "requests.nvidia.com/gpu": 1 }
            }
        }
        dyn_quota.patch(body=body, namespace=project_id)
        logs = logs + f'✅ GPU quota of *{project_id}* set to *1*\n'
        email = email + f'The GPU was successfully enabled in your project <b>{project_id}</b><br/><br/>'

        try:
            # Patch Deployment
            dyn_dc = dyn_client.resources.get(api_version=settings.CLUSTER_API_VERSION, kind='Deployment')
            body = {
                'kind': 'Deployment',
                'apiVersion': settings.CLUSTER_API_VERSION,
                'metadata': {'name': app_id},
                'spec': {
                    'template': {
                        'spec': {
                            'containers': [
                                {
                                    "name": app_id,
                                    "resources": {
                                        "requests": {"nvidia.com/gpu": 1},
                                        "limits": {"nvidia.com/gpu": 1}
                                    }
                                }
                            ]
                        }
                    }
                }
            }
            dyn_dc.patch(body=body, namespace=project_id)
            logs = logs + f'✅ GPU limits of *{app_id}* in *{project_id}* set to *1*'
            email = email + f'The GPU was successfully enabled for your workspace <b>{app_id}</b> in your project <b>{project_id}</b>. You can restart the workspace if needed, and start using the GPU.<br/><br/>'

        except Exception as err:
            # Error when editing Deployment
            logs = logs + f'⚠️  Could not change the GPU limits for *{app_id}* in *{project_id}*. Error: {str(err)[:21]}'
            email = email + f'The workspace provided <b>{app_id}</b> was not found in the project <b>{project_id}</b>, hence the GPU could not be enabled automatically. You will need to enable it by yourself.'

    except Exception as err:
        # Error when editing GPU quota
        logs = logs + f'❌ Could not set the GPU quota to 1 in *{project_id}*. Error: {str(err)[:21]}\n'
        email = email + f'The project provided <b>{project_id}</b> was not found, hence the GPU could not be enabled. Contact the DSRI team on Slack or via DSRI-SUPPORT-L@maastrichtuniversity.nl<br/>'

    return logs, email

    # with oc.project(project_id), oc.timeout(10*60):
    #     log.info(f"✅ Found the project {oc.get_project_name()}, enabling GPU")
    # Change GPU quota to 1, and enable the GPU in the pod
    # cmds = [
    #     """oc patch resourcequota/gpu-quota --patch '{"spec":{"hard": {"requests.nvidia.com/gpu": 1}}}' -n """ + project_id,
    #     """oc patch dc/""" + app_id + """ --type=json -p='[{"op": "replace", "path": "/spec/template/spec/containers/0/resources", "value": {"requests": {"nvidia.com/gpu": 1}, "limits": {"nvidia.com/gpu": 1}}}]' -n """ + project_id,
    # ]
    # for cmd in cmds:
    #     # os.system(cmd)
    #     # log.info(subprocess.run(cmd.split(' '), capture_output=subprocess.PIPE).stdout.decode('utf-8'))
    #     # log.info(subprocess.run(cmd.split(' '), capture_output=True))
    #     log.info(subprocess.check_output(cmd, shell=True, stderr=subprocess.STDOUT))

    # return f"🚀✅ Successfully enabled GPU for {app_id} in {project_id}"


def check_gpu_bookings() -> None:
    log.info(f'🔎 Checking GPU reservations to send booking notifications on the {datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%S")}')

    # Connect to the SQL DB
    engine = create_engine(settings.SQL_URL)
    SQLModel.metadata.create_all(engine)

    # Connect to the OpenShift cluster
    dyn_client, k8s_client, kubeConfig = oc_login()

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
                    email_msg = f"""⚠️ Your GPU booking in project <b>{resa["project_id"]}</b> will end tomorrow at 9:00am!<br/><br/>
Make sure you have properly moved all data you want to keep in the persistent folder, as the pod will be restarted automatically.
"""
                    send_email(email_msg, to=resa["user_email"], subject="📀 DSRI GPU booking ending tomorrow")


                # Check if GPU booking end date +1 day is today (since we switch in the morning, it prevents losing a day)
                if end_date + datetime.timedelta(days=1) == datetime.date.today():
                    email_msg = f"""⚠️ Your GPU booking in project <b>{resa["project_id"]}</b> just ended, and the access to the GPU in your project has been disabled<br/><br/>"""
                    send_email(email_msg, to=resa["user_email"], subject="📀 DSRI GPU booking ended")
#                     slack_msg = f'📀 🛬 Booking ends: *GPU {resa["gpu_id"]}* in project *{resa["project_id"]}* for {resa["user_email"]} on the {datetime.date.today()}\n'
#                     slack_msg = slack_msg + """```
# oc patch resourcequota/gpu-quota --patch '{"spec":{"hard": {"requests.nvidia.com/gpu": 0}}}' -n """ + resa['project_id'] + """
# ```"""
                    slack_msg = disable_gpu(resa["project_id"], resa["app_id"], dyn_client)
                    slack_msg = f"""🚀🔌 Disabling the GPU for {resa["user_email"]} in *{resa["project_id"]}* (from {start_date} and {end_date}):\n""" + slack_msg
                    post_msg_to_slack(slack_msg)


                # Check GPU booking starting
                if start_date == datetime.date.today():
                    slack_msg, email_logs = enable_gpu(resa["project_id"], resa["app_id"], dyn_client)
                    slack_msg = f"""🚀🔋 Enabling the GPU for {resa["user_email"]} in *{resa["project_id"]}* (from {start_date} to {end_date}):\n""" + slack_msg
                    email_msg = f"""✅ Your GPU booking in project <b>{resa["project_id"]}</b> just started!<br/><br/>
{email_logs}<br/>
For more details, checkout the documentation to see how to enable or use the GPU: <a href="https://dsri.maastrichtuniversity.nl/docs/deploy-on-gpu#enable-gpu-in-your-workspace" target="_blank">https://dsri.maastrichtuniversity.nl/docs/deploy-on-gpu</a><br/><br/>
The GPU will be automatically disabled at the end of your booking on the {end_date} at 9:00am
"""
                    send_email(email_msg, to=resa["user_email"], subject="📀 DSRI GPU booking starting")
                    post_msg_to_slack(slack_msg)

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

        # Dump Users
        outfile = open(f'{folder_path}/dsri-db_{date}_users.csv', 'w')
        writer = csv.writer(outfile)
        statement = select(User)
        results = session.exec(statement).all()
        [writer.writerow([getattr(curr, column.name) for column in User.__mapper__.columns]) for curr in results]
        outfile.close()

        log.info(f'✅ Database backed up successfully on the {date}')



# Just here as an example, but not really used in practice
# pip install scholarly

# def get_publications_about_dsri() -> None:
#     # will paginate to the next page by default
#     pubs = scholarly.search_pubs("This research was made possible, in part, using the Data Science Research Infrastructure (DSRI) hosted at Maastricht University")
#     valid_pubs = []
#     limit = 20
#     for i, pub in enumerate(pubs):
#         if i >= limit:
#             break
#         if 'data science research infrastructure' in pub['bib']['abstract'].lower():
#             if 'dsri' in pub['bib']['abstract'].lower():
#                 if 'maastricht university' in pub['bib']['abstract'].lower():
#                     valid_pubs.append({
#                         'title': pub['bib']['title'],
#                         'authors': ', '.join(pub['bib']['author']),
#                         'pub_year': pub['bib']['pub_year'],
#                         'venue': pub['bib']['venue'],
#                         'abstract': pub['bib']['abstract'],
#                         'url': pub['pub_url'],
#                     })
#     print(json.dumps(valid_pubs, indent=2))
