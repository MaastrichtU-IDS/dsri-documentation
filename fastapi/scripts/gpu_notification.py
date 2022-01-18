import os
from datetime import datetime, timedelta
import requests
import json
from fastapi.encoders import jsonable_encoder
from sqlmodel import Field, Session, SQLModel, create_engine, select

import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from api.gpus import GpuSchedule

print(f'🔎 Checking GPU reservations to send booking notifications')

# Connect to the SQL DB
engine = create_engine(os.getenv('SQL_URL'))
SQLModel.metadata.create_all(engine)

## Send an email with UM smtp server (require VPN connection)
# https://kb.icts.maastrichtuniversity.nl/display/ISM/E-mail+-+Universal+UM+email+server+names
def sendEmail(email_msg):
    print('📬️ Sending an email')
    fromaddr = 'vincent.emonet@maastrichtuniversity.nl'
    # Service with 100 emails/day free: https://sendgrid.com/
    
    # smtp_user = os.getenv('SMTP_USER', 'Vincent.Emonet')
    # password = os.getenv('SMTP_PASSWORD', 'password')
    toaddrs  = ['vincent.emonet@maastrichtuniversity.nl']

    # Create message container - the correct MIME type is multipart/alternative.
    msg = MIMEMultipart('alternative')
    msg['Subject'] = "DSRI GPU bookings"
    msg['From'] = fromaddr
    msg['To'] = ', '.join(toaddrs)

    # Create the body of the message (a plain-text and an HTML version).
    text = email_msg
    html = f"""\
    <html>
    <head>
        <style></style>
    </head>
    <body>
        {email_msg}
    </body>
    </html>
    """
    # Record the MIME types of both parts - text/plain and text/html.
    part1 = MIMEText(text, 'plain')
    part2 = MIMEText(html, 'html')
    # Attach parts into message container.
    msg.attach(part1)
    msg.attach(part2)

    try :
        server = smtplib.SMTP(host='smtp.maastrichtuniversity.nl', port=25)
        # server = smtplib.SMTP('smtp.gmail.com', 587)
        # server = smtplib.SMTP()
        # server.connect(server_smtp, port_smtp)
        # server.set_debuglevel(True)
        # server.starttls()
        # server.ehlo()
        # server.login(smtp_user, password)
        # server.sendmail(fromaddr, toaddrs, BODY.encode('utf-8'))
        server.sendmail(fromaddr, toaddrs, msg.as_string())
        server.quit()
    except Exception as e:
        print(e)


# To post to Slack, create an app with a bot, and get its bot token: https://api.slack.com/apps 
# Bot tokens access scope: chat:write chat:write.customize
def post_msg_to_slack(text):
    print('📬️ Sending a Slack message')
    data = {
        "channel": os.getenv('SLACK_CHANNEL'),
        "text": text,
        # 'icon_emoji': ':date:',
        # 'username': 'DSRI GPU booker',
    }
    return requests.post(
        'https://slack.com/api/chat.postMessage', 
        json.dumps(data), 
        headers={
            'Authorization': 'Bearer ' + str(os.getenv('SLACK_BOT_TOKEN')),
            'Content-type': 'application/json; charset=utf-8'
        }
    ).json()

# Query the SQL DB to get the GPU reservations
# And send msgs if reservations starts/ends today
with Session(engine) as session:
    statement = select(GpuSchedule)
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
            text_msg = f'🚀 Starting: *GPU {resa["gpu_id"]}* in project *{resa["project_id"]}* for {resa["user_email"]}'
            print(post_msg_to_slack(text_msg))
            
        if datetime.fromisoformat(resa['ending_date']).date() == datetime.today().date():
            html_msg = f'❌ <b>GPU {resa["gpu_id"]}</b> booking in project <b>{resa["project_id"]}</b> for {resa["user_email"]}'
            end_msgs.append(html_msg)
            text_msg = f'🛬 Ending: *GPU {resa["gpu_id"]}* booking in project *{resa["project_id"]}* for {resa["user_email"]}'
            print(post_msg_to_slack(text_msg))

    send_msg = ''
    if len(start_msgs) > 0:
        send_msg = send_msg + '<h2>🚀 Reservations starting</h2>\n<p>\n' + '</p>\n<p>'.join(start_msgs) + '\n</p>\n'
    if len(end_msgs) > 0:
        send_msg = send_msg + '\n<h2>🛬 Reservations ending</h2>\n<p>\n' + '</p>\n<p>'.join(end_msgs) + '\n</p>\n'
    
    ## Send email disabled because UM smtp not reachable from IDS servers
    # if len(send_msg) > 0:
    #     sendEmail(send_msg)

