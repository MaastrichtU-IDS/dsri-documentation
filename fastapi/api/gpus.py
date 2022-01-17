import os
from datetime import datetime, timedelta
from typing import List, Optional

# import datetime
import requests
from fastapi import APIRouter, Body, FastAPI, Request, Response
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from sqlalchemy.exc import IntegrityError
from sqlmodel import Field, Session, SQLModel, create_engine, select

NUMBER_OF_GPUS = 8
MAX_BOOK_DAYS = 14


router = APIRouter()

class CreateGpuSchedule(SQLModel, table=False):
    user_email: str = Field(primary_key=True)
    starting_date: datetime = Field(primary_key=True)
    ending_date: datetime = Field(primary_key=True)
    project_id: str = Field(primary_key=False)

class GpuSchedule(CreateGpuSchedule, table=True):
    gpu_id: Optional[int] = Field(primary_key=True)




engine = create_engine(os.getenv('SQL_URL'))
SQLModel.metadata.create_all(engine)


@router.get("/reservations", name="Get the Reservations of the DSRI GPUs",
    description="Reservations of the DSRI GPUs",
    response_model=dict,
)            
def get_gpu_reservations() -> dict:
    with Session(engine) as session:
        statement = select(GpuSchedule)
        results = session.exec(statement).all()
        schedule = []
        for resa in results:
            resa = jsonable_encoder(resa)
            del resa['user_email']
            del resa['project_id']
            schedule.append(resa)
    return JSONResponse(schedule)


def get_booked_days() -> dict:
    with Session(engine) as session:
        statement = select(GpuSchedule)
        results = session.exec(statement).all()
        booked_days = {}
        for resa in results:
            # resa = jsonable_encoder(resa)
            # del resa['user_email']
            print(resa)
            print(resa.starting_date)
            print(resa.ending_date)

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

@router.get("/booked-days", name="Get Days where DSRI GPUs are booked",
    description="Day where DSRI GPUs are fully booked and no reservation can be added",
    response_model=dict,
)            
def get_gpu_booked_days() -> dict:
    booked_days = get_booked_days()
    return JSONResponse(booked_days)


@router.post("/request", name="Request a DSRI GPU for a period",
    description="Request a DSRI GPU for a period, this will check if any GPU are available for the requested period",
    response_model=dict,
)            
def create_gpu_schedule(schedule: CreateGpuSchedule = Body(...)) -> dict:
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
        return JSONResponse({'message': f'Error: you can book a GPU for a maximum of {str(MAX_BOOK_DAYS)} days'})

    for i in range(delta.days + 1):
        day_time = schedule.starting_date + timedelta(days=i)
        day = day_time.date()
        # print('booked_days!!!!!')
        # print(booked_days)

        if str(day) in booked_days.keys():
            if booked_days[str(day)]['fullyBooked']:
                days_already_booked.append(str(day))
            else:
                for booked_gpu in booked_days[str(day)].keys():
                    # print('booked_gpu')
                    # print(booked_gpu)
                    if not booked_gpu == 'fullyBooked' and not booked_gpu in booked_gpus:
                        # booked_gpus.push(booked_gpu)
                        booked_gpus.append(booked_gpu)

    if len(days_already_booked) > 0:
        # raise 'Error: some of the dates provided are already fully booked: ' + str(', '.join(already_booked))
        return JSONResponse({'message': 'Error: some of the dates provided are already fully booked: ' + str(', '.join(days_already_booked))})

    print('booked_gpus')
    print(booked_gpus)
    while True:
        if str(gpu_id) in booked_gpus:
            gpu_id += 1
        else:
            break;
    print('gpu_id')
    print(gpu_id)
    create_schedule = GpuSchedule.from_orm(schedule)
    create_schedule.gpu_id = gpu_id
    print('create_schedule!!')
    print(create_schedule)
        # return JSONResponse({'message': 'Error: some of the dates provided are already fully booked: ' + str(', '.join(already_booked))})

    # try:
    #     create_schedule = GpuSchedule.from_orm(schedule)
    # except Exception as e:
    #     print(e)
    #     # print(e.message)
    #     # return JSONResponse({'message': 'Error: some of the dates provided are already fully booked: ' + str(', '.join(already_booked))})
    #     return JSONResponse({'message': 'Error: date range already booked'})

    with Session(engine) as session:
        # db_user = User.from_orm(createUser)
        try:
            session.add(create_schedule)
            session.commit()
            # print(create_schedule)
            return JSONResponse({'message': 'GPU request successfully submitted, you will receieve an email with more details soon.'})
        except Exception as e:
            print(e)
            return JSONResponse({'message': 'Error creating the schedule entry in the calendar'})

