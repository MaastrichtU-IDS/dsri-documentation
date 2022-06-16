from datetime import datetime


def log(msg)-> None:
    msg = '[' + str(datetime.now().strftime("%Y-%m-%dT%H:%M:%S")) + '] ' + str(msg)
    print(msg)