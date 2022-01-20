import os
import requests
import json

import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


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
    print(data)
    print(str(os.getenv('SLACK_BOT_TOKEN')))
    try:
        return requests.post(
            'https://slack.com/api/chat.postMessage', 
            json.dumps(data), 
            headers={
                'Authorization': 'Bearer ' + str(os.getenv('SLACK_BOT_TOKEN')),
                'Content-type': 'application/json; charset=utf-8'
            }
        ).json()
    except Exception as e:
        return e


## Send an email with UM smtp server (require VPN connection)
# https://kb.icts.maastrichtuniversity.nl/display/ISM/E-mail+-+Universal+UM+email+server+names
def send_email(email_msg):
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

