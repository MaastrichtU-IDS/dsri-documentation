import csv
import os
import pathlib
from datetime import datetime

from api.config import settings
from api.gpus import GpuBooking
from api.users import User
from sqlmodel import Session, SQLModel, create_engine, select


## NOT USED ANYMORE: everything happens in api/automated_tasks.py


print(f'💾 Backing up the SQL database (export to CSV) on the {datetime.today().date()}')
# docker-compose exec cronjob watch cat /var/log/cron.log

# Connect to the SQL DB
engine = create_engine(settings.SQL_URL)
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