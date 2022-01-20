import os
from datetime import datetime, timedelta
from typing import List, Optional
import requests
from fastapi import APIRouter, Body, FastAPI, Request, Response
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from sqlalchemy.exc import IntegrityError
from sqlmodel import Field, Session, SQLModel, create_engine, select

from api.notifications import post_msg_to_slack


NUMBER_OF_GPUS = 8
MAX_BOOK_DAYS = 14


class CreateGpuBooking(SQLModel, table=False):
    user_email: str = Field(primary_key=True)
    starting_date: datetime = Field(primary_key=True)
    ending_date: datetime = Field(primary_key=True)
    project_id: str = Field(primary_key=False)

class GpuBooking(CreateGpuBooking, table=True):
    gpu_id: Optional[int] = Field(primary_key=True)
    created_at: datetime = datetime.now()

engine = create_engine(os.getenv('SQL_URL'))
SQLModel.metadata.create_all(engine)
router = APIRouter()


@router.get("/reservations", name="Get the list of Reservations for the DSRI GPUs",
    description="List of reservations for the DSRI GPUs",
    response_model=List[dict],
)            
def get_gpu_reservations() -> List[dict]:
    with Session(engine) as session:
        statement = select(GpuBooking)
        results = session.exec(statement).all()
        reservations = []
        for resa in results:
            resa = jsonable_encoder(resa)
            # Dont return user email and project ID for privacy 
            del resa['user_email']
            del resa['project_id']
            reservations.append(resa)
    return JSONResponse(reservations)


# Get a dict with all days with GPUs booked 
def get_booked_days() -> dict:
    with Session(engine) as session:
        statement = select(GpuBooking)
        reservations = session.exec(statement).all()
        booked_days = {}
        for resa in reservations:
            delta = resa.ending_date - resa.starting_date   # returns timedelta
            for i in range(delta.days + 1):
                day_time = resa.starting_date + timedelta(days=i)
                day = day_time.date()
                if not str(day) in booked_days.keys():
                    booked_days[str(day)] = {'fullyBooked': False}
                booked_days[str(day)][str(resa.gpu_id)] = {
                    'starting_date': str(resa.starting_date),
                    'ending_date': str(resa.ending_date)
                }
                # booked_days[day].append(str(resa.gpu_id))
                if len(booked_days[str(day)].keys()) >= NUMBER_OF_GPUS + 1:
                    booked_days[str(day)]['fullyBooked'] = True
    return booked_days


@router.get("/booked-days", name="Get days when DSRI GPUs are booked",
    description="Dict of days, with which GPUs are booked for each day, and if the day is fully booked",
    response_model=dict,
)            
def get_gpu_booked_days() -> dict:
    booked_days = get_booked_days()
    return JSONResponse(booked_days)


@router.post("/request", name="Request a DSRI GPU for a period",
    description="Request a DSRI GPU for a period, this will check if any GPU are available for the requested period",
    response_model=dict,
)            
def create_gpu_schedule(schedule: CreateGpuBooking = Body(...)) -> dict:
    # Generate GPU ID depending on availability
    booked_days = get_booked_days()
    booked_gpus = []
    days_already_booked = []
    gpu_id = 1
    # Fix issue where the date provided by the calendar are -1 day
    schedule.starting_date += timedelta(days=1)
    schedule.ending_date += timedelta(days=1)
    delta = schedule.ending_date - schedule.starting_date
    if delta.days + 1 > MAX_BOOK_DAYS:
        return JSONResponse({'errorMessage': f'You can book a GPU for a maximum of {str(MAX_BOOK_DAYS)} days'})

    for i in range(delta.days + 1):
        day_time = schedule.starting_date + timedelta(days=i)
        day = day_time.date()

        if str(day) in booked_days.keys():
            if booked_days[str(day)]['fullyBooked']:
                days_already_booked.append(str(day))
            else:
                for booked_gpu in booked_days[str(day)].keys():
                    if not booked_gpu == 'fullyBooked' and not booked_gpu in booked_gpus:
                        booked_gpus.append(booked_gpu)

    if len(days_already_booked) > 0:
        return JSONResponse({'errorMessage': 'Some of the dates requested are already fully booked: ' + str(', '.join(days_already_booked))})

    while True:
        # Get a GPU ID that is available for the period requested
        if str(gpu_id) in booked_gpus:
            gpu_id += 1
        else:
            break;
    if gpu_id > NUMBER_OF_GPUS:
        return JSONResponse({'errorMessage': 'No GPU available for the dates provided.'})

    create_booking = GpuBooking.from_orm(schedule)
    create_booking.gpu_id = gpu_id

    with Session(engine) as session:
        try:
            session.add(create_booking)
            session.commit()
            print(post_msg_to_slack(f'📅➕ New booking: GPU {create_booking.gpu_id} for {create_booking.user_email} from {create_booking.starting_date} to {create_booking.ending_date}'))
            return JSONResponse({'message': 'GPU booking successfully submitted, you will receive an email with more details soon.'})
        except Exception as e:
            print(e)
            return JSONResponse({'errorMessage': 'Error creating the GPU booking.'})

