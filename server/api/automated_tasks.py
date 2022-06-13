import csv
import os
import pathlib
from datetime import datetime

from api.gpus import GpuBooking
from api.notifications import post_msg_to_slack
from api.users import User
from fastapi.encoders import jsonable_encoder
from sqlmodel import Session, SQLModel, create_engine, select

# from scholarly import scholarly


# docker-compose exec cronjob watch cat /var/log/cron.log
def check_gpu_bookings() -> None:
    print(f'🔎 Checking GPU reservations to send booking notifications on the {datetime.today().date()}')

    # Connect to the SQL DB
    engine = create_engine(os.getenv('SQL_URL'))
    SQLModel.metadata.create_all(engine)

    # Query the SQL DB to get the GPU reservations
    # And send msgs if reservations starts/ends today
    with Session(engine) as session:
        statement = select(GpuBooking)
        results = session.exec(statement).all()
        schedule = []
        start_msgs = []
        end_msgs = []
        for resa in results:
            resa = jsonable_encoder(resa)
            schedule.append(resa)
            if datetime.fromisoformat(resa['starting_date']).date() == datetime.today().date():
                html_msg = f'✅ <b>GPU {resa["gpu_id"]}</b> in project <b>{resa["project_id"]}</b> for {resa["user_email"]}'
                start_msgs.append(html_msg)
                text_msg = f'💽 🚀 Booking starts: *GPU {resa["gpu_id"]}* in project *{resa["project_id"]}* for {resa["user_email"]} on the {datetime.today().date()}\n'
                text_msg = text_msg + """```
    oc patch resourcequota/gpu-quota --patch '{"spec":{"hard": {"requests.nvidia.com/gpu": 1}}}' -n """ + resa['project_id'] + """
    ```"""
                
                print(post_msg_to_slack(text_msg))
                
            if datetime.fromisoformat(resa['ending_date']).date() == datetime.today().date():
                html_msg = f'❌ <b>GPU {resa["gpu_id"]}</b> in project <b>{resa["project_id"]}</b> for {resa["user_email"]}'
                end_msgs.append(html_msg)
                text_msg = f'💽 🛬 Booking ends: *GPU {resa["gpu_id"]}* in project *{resa["project_id"]}* for {resa["user_email"]} on the {datetime.today().date()}\n'
                text_msg = text_msg + """```
    oc patch resourcequota/gpu-quota --patch '{"spec":{"hard": {"requests.nvidia.com/gpu": 0}}}' -n """ + resa['project_id'] + """
    ```"""
                print(post_msg_to_slack(text_msg))

        send_msg = ''
        if len(start_msgs) > 0:
            send_msg = send_msg + '<h2>🚀 Reservations starting</h2>\n<p>\n' + '</p>\n<p>'.join(start_msgs) + '\n</p>\n'
        if len(end_msgs) > 0:
            send_msg = send_msg + '\n<h2>🛬 Reservations ending</h2>\n<p>\n' + '</p>\n<p>'.join(end_msgs) + '\n</p>\n'
        
        ## Send email disabled because UM smtp not reachable from IDS servers
        # if len(send_msg) > 0:
        #     send_email(send_msg)



def backup_database() -> None:
    print(f'💾 Backing up the SQL database (export to CSV) on the {datetime.today().date()}')

    # Connect to the SQL DB
    engine = create_engine(os.getenv('SQL_URL'))
    SQLModel.metadata.create_all(engine)
    DUMP_PATH = '/backup'

    with Session(engine) as session:
        date = datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
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
