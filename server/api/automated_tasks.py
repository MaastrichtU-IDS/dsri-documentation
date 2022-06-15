import csv
import datetime
import os
import pathlib

import openshift as oc
from api.gpus import GpuBooking
from api.notifications import post_msg_to_slack, send_email
from api.users import User
from fastapi.encoders import jsonable_encoder
from sqlmodel import Session, SQLModel, create_engine, select

# from datetime import datetime, timedelta
# from scholarly import scholarly

# https://github.com/openshift/openshift-client-python
def oc_login() -> None:
    cluster_user = os.getenv('CLUSTER_USER')
    cluster_password = os.getenv('CLUSTER_PASSWORD')
    os.system(f"oc login https://api.dsri2.unimaas.nl:6443 --insecure-skip-tls-verify -u {cluster_user} -p {cluster_password}")


def disable_gpu(project_id, app_id) -> str:
    try:
        with oc.project(project_id), oc.timeout(10*60):
            print(f"✅ Found the project {oc.get_project_name()}, disabling GPU")
            # TODO: Stop the GPU pod, and change GPU quota to 0
            os.system("""oc patch dc/""" + app_id + """ --type=json -p='[{"op": "replace", "path": "/spec/replicas", "value": 0}] -n """ + project_id)
            os.system("""oc patch dc/""" + app_id + """ --type=json -p='[{"op": "replace", "path": "/spec/template/spec/containers/0/resources", "value": {}}] -n """ + project_id)
            os.system("""oc patch resourcequota/gpu-quota --patch '{"spec":{"hard": {"requests.nvidia.com/gpu": 0}}}' -n """ + project_id)

            # Read in the current state of the pod resources and represent them as python objects
            # for pod_obj in oc.selector('pods').objects():    
            #     # The APIObject class exposes several convenience methods for interacting with objects
            #     print('Analyzing pod: {}'.format(pod_obj.name()))
            #     pod_obj.print_logs(timestamps=True, tail=15)

            return f"🛬✅ Successfully disabled GPU for {app_id} in {project_id}"
    except Exception as err:
        return f"🛬⚠️ Could not disable the GPU for {app_id} in {project_id}: {str(err)}"



def enable_gpu(project_id, app_id) -> str:
    try:
        with oc.project(project_id), oc.timeout(10*60):
            print(f"✅ Found the project {oc.get_project_name()}, enabling GPU")
            # TODO: Change GPU quota to 1, and enable the GPU in the pod
            os.system("""oc patch resourcequota/gpu-quota --patch '{"spec":{"hard": {"requests.nvidia.com/gpu": 1}}}' -n """ + project_id)
            os.system("""oc patch dc/""" + app_id + """ --type=json -p='[{"op": "replace", "path": "/spec/template/spec/containers/0/resources", "value": {"requests": {"nvidia.com/gpu": 1}, "limits": {"nvidia.com/gpu": 1}}}] -n """ + project_id)

            return f"🚀✅ Successfully enabled GPU for {app_id} in {project_id}"
    except Exception as err:
        return f"🚀⚠️ Could not enable the GPU for {app_id} in {project_id}: {str(err)}"


def check_gpu_bookings() -> None:
    print(f'🔎 Checking GPU reservations to send booking notifications on the {datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%S")}')

    # Connect to the SQL DB
    engine = create_engine(os.getenv('SQL_URL'))
    SQLModel.metadata.create_all(engine)

    # Connect to the OpenShift cluster
    oc_login()

    # Query the SQL DB to get the GPU reservations
    # And send msgs if reservations starts/ends 
    with Session(engine) as session:
        statement = select(GpuBooking)
        results = session.exec(statement).all()

        for resa in results:
            try:
                resa = jsonable_encoder(resa)
                # schedule.append(resa)

                # Check GPU booking ending tomorrow
                if datetime.datetime.fromisoformat(resa['ending_date']).date() == datetime.date.today():
                    email_msg = f"""⚠️ Your GPU booking in project <b>{resa["project_id"]}</b> will end tomorrow at 9:00am!<br/><br/>
Make sure you have properly moved all data you want to keep in the persistent folder, as the pod will be restarted automatically.
"""
                    send_email(email_msg, to=resa["user_email"], subject="📀 DSRI GPU booking ending tomorrow")


                # Check GPU booking ending today (1 day after the end date since we stop in the morning)
                # if datetime.datetime.fromisoformat(resa['ending_date']).date() == datetime.datetime.today().date():
                if datetime.datetime.fromisoformat(resa['ending_date']).date() + datetime.timedelta(days=1) == datetime.date.today():
                    email_msg = f"""⚠️ Your GPU booking in project <b>{resa["project_id"]}</b> just ended, and the access to the GPU in your project has been disabled<br/><br/>"""
                    send_email(email_msg, to=resa["user_email"], subject="📀 DSRI GPU booking ended")
                    # end_msgs.append(email_msg)
                    slack_msg = f'📀 🛬 Booking ends: *GPU {resa["gpu_id"]}* in project *{resa["project_id"]}* for {resa["user_email"]} on the {datetime.date.today()}\n'
                    slack_msg = slack_msg + """```
oc patch resourcequota/gpu-quota --patch '{"spec":{"hard": {"requests.nvidia.com/gpu": 0}}}' -n """ + resa['project_id'] + """
```"""
                    # slack_msg = disable_gpu(resa["project_id"], resa["app_id"])
                    post_msg_to_slack(slack_msg)
                    # send_email(slack_msg, to=resa["user_email"])


                # Check GPU booking starting
                if datetime.datetime.fromisoformat(resa['starting_date']).date() == datetime.date.today():
                    email_msg = f"""✅ Your GPU booking in project <b>{resa["project_id"]}</b> just started! The GPU has been enabled in your project.<br/><br/>
Checkout the documentation to see how to enable the GPU on the application you want: <a href="https://dsri.maastrichtuniversity.nl/docs/deploy-on-gpu#enable-gpu-in-your-workspace" target="_blank">https://dsri.maastrichtuniversity.nl/docs/deploy-on-gpu</a><br/><br/>
The GPU will be automatically disabled at the end of your booking on the {datetime.datetime.fromisoformat(resa['ending_date']).date()} at 9:00am
"""
                    send_email(email_msg, to=resa["user_email"], subject="📀 DSRI GPU booking starting")
                    # start_msgs.append(email_msg)
                    slack_msg = f'📀 🚀 Booking starts: *GPU {resa["gpu_id"]}* in project *{resa["project_id"]}* for {resa["user_email"]} on the {datetime.date.today()}\n'
                    slack_msg = slack_msg + """```
oc patch resourcequota/gpu-quota --patch '{"spec":{"hard": {"requests.nvidia.com/gpu": 1}}}' -n """ + resa['project_id'] + """
```"""
                    # slack_msg = enable_gpu(resa["project_id"], resa["app_id"])
                    post_msg_to_slack(slack_msg)
                    # print(post_msg_to_slack(slack_msg))

            except Exception as err:
                print(err)

            # send_msg = ''
            # if len(start_msgs) > 0:
            #     send_msg = send_msg + '<h2>🚀 Reservations starting</h2>\n<p>\n' + '</p>\n<p>'.join(start_msgs) + '\n</p>\n'
            # if len(end_msgs) > 0:
            #     send_msg = send_msg + '\n<h2>🛬 Reservations ending</h2>\n<p>\n' + '</p>\n<p>'.join(end_msgs) + '\n</p>\n'
            # TODO: Send email disabled because UM smtp not reachable from IDS servers
            # if len(send_msg) > 0:
            #     send_email(send_msg)



def backup_database() -> None:
    print(f'💾 Backing up the SQL database (export to CSV) on the {datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%S")}')

    # Connect to the SQL DB
    engine = create_engine(os.getenv('SQL_URL'))
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

        print(f'✅ Database backed up successfully on the {date}')



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
