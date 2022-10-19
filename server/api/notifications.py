import json
import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

import requests


# To post to Slack, create an app with a bot, and get its bot token: https://api.slack.com/apps 
# Bot tokens access scope: chat:write chat:write.customize
def post_msg_to_slack(text):
    # print('📬️ Sending a Slack message')
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


html_footer = """<br/><br/><br/>Best regards,
<br/><br/>The DSRI team at Maastricht University"""
plain_footer = """\nBest regards,
The DSRI team at Maastricht University"""


## Send an email with UM smtp server (require VPN connection)
# https://kb.icts.maastrichtuniversity.nl/display/ISM/E-mail+-+Universal+UM+email+server+names
def send_email(msg, to, fromaddr="DSRI-SUPPORT-L@maastrichtuniversity.nl", subject="📀 DSRI GPU bookings"):
    # fromaddr = f"{os.getenv('CLUSTER_USER')}@maastrichtuniversity.nl"
    # fromaddr = 'DSRI-SUPPORT-L@maastrichtuniversity.nl'
    
    toaddrs  = [to]
    # print(f"📬️ Sending an email from {fromaddr} to {toaddrs}")

    # Create message container - the correct MIME type is multipart/alternative.
    email = MIMEMultipart('alternative')
    email['Subject'] = subject
    email['From'] = fromaddr
    email['To'] = ', '.join(toaddrs)

    # Create the body of the message (a plain-text and an HTML version).
    text = msg + plain_footer
    html = f"""\
    <html>
    <head>
        <style></style>
    </head>
    <body>
        {msg + html_footer}
    </body>
    </html>
    """
    # Record the MIME types of both parts - text/plain and text/html.
    part1 = MIMEText(text, 'plain')
    part2 = MIMEText(html, 'html')
    # Attach parts into message container.
    email.attach(part1)
    email.attach(part2)

    try :
        smtp = smtplib.SMTP(host='smtp.maastrichtuniversity.nl', port=25)
        # identify ourselves to smtp client
        # smtp.ehlo()
        # smtp.starttls()
        # smtp.set_debuglevel(False)
        # smtp.login(os.getenv('CLUSTER_USER'), os.getenv('CLUSTER_PASSWORD'))
        
        smtp.sendmail(fromaddr, toaddrs, email.as_string())
        smtp.quit()
        # print('✅ Email sent')
    except Exception as e:
        print('Error sending the email')
        print(e)

