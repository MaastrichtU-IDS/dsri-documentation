import os
from datetime import datetime, timedelta
from typing import List, Optional

from api.database import engine
from api.notifications import post_msg_to_slack, send_email
from fastapi import APIRouter, Body, FastAPI, Request, Response
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from pydantic import validator
from sqlmodel import Field, Session, SQLModel, select


NUMBER_OF_GPUS = 7
MAX_BOOK_DAYS = 4
MAX_DAYS_IN_ROLLING_WINDOW = 7
ROLLING_WINDOW_WEEKS = 4
MAX_ADVANCE_BOOKING_WEEKS = 5

router = APIRouter()


class CreateBooking(SQLModel, table=False):
    user_email: str = Field(primary_key=True)
    starting_date: datetime = Field(primary_key=True)
    ending_date: datetime = Field(primary_key=True)
    project_id: str = Field(primary_key=False)
    app_id: str = Field(primary_key=False)

    @validator("user_email", "starting_date", "ending_date", "project_id", "app_id")
    def reject_empty_strings(cls, v):
        assert str(v) != ''
        return v


class GpuBooking(CreateBooking, table=True):
    gpu_id: Optional[int] = Field(primary_key=True)
    created_at: datetime = datetime.now()


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


# Calculate total days booked by a user within a rolling window
def get_user_booked_days_in_window(user_email: str, window_start: datetime, window_end: datetime) -> int:
    """
    Calculate the total number of days a user has booked within a given time window.

    Args:
        user_email: The email of the user
        window_start: Start of the rolling window
        window_end: End of the rolling window

    Returns:
        Total number of days booked by the user in the window
    """
    with Session(engine) as session:
        statement = select(GpuBooking).where(GpuBooking.user_email == user_email)
        user_bookings = session.exec(statement).all()

        total_days = 0
        for booking in user_bookings:
            # Check if booking overlaps with the window
            booking_start = max(booking.starting_date, window_start)
            booking_end = min(booking.ending_date, window_end)

            # If there's an overlap, count the days
            if booking_start <= booking_end:
                delta = booking_end - booking_start
                total_days += delta.days + 1

        return total_days


@router.post("/request", name="Request a DSRI GPU for a period",
    description="Request a DSRI GPU for a period, this will check if any GPU are available for the requested period",
    response_model=dict,
)
def create_gpu_schedule(schedule: CreateBooking = Body(...)) -> dict:
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

    # Check that booking is not too far in advance (max 5 weeks)
    max_advance_date = datetime.now() + timedelta(weeks=MAX_ADVANCE_BOOKING_WEEKS)
    if schedule.starting_date > max_advance_date:
        return JSONResponse({
            'errorMessage': f'You can only book GPUs up to {MAX_ADVANCE_BOOKING_WEEKS} weeks in advance. '
                          f'The earliest date you can book for this request is {max_advance_date.date()}.'
        })

    # Check rolling window constraint: max 7 days in any 4-week period
    # Look back 4 weeks from the END of the new booking
    requested_days = delta.days + 1
    window_end = schedule.ending_date
    window_start = window_end - timedelta(weeks=ROLLING_WINDOW_WEEKS)

    # Get existing bookings in this window for the user
    existing_days_in_window = get_user_booked_days_in_window(schedule.user_email, window_start, window_end)

    # Calculate total days including the new request
    # Note: Since MAX_BOOK_DAYS is 4 and the window is 4 weeks (28 days),
    # the new booking will always fall entirely within the window
    total_days_in_window = existing_days_in_window + requested_days

    if total_days_in_window > MAX_DAYS_IN_ROLLING_WINDOW:
        days_available = MAX_DAYS_IN_ROLLING_WINDOW - existing_days_in_window
        return JSONResponse({
            'errorMessage': f'You can only book a maximum of {MAX_DAYS_IN_ROLLING_WINDOW} days within a {ROLLING_WINDOW_WEEKS}-week rolling window. '
                          f'You currently have {existing_days_in_window} day(s) booked in this period, so you can only book {max(0, days_available)} more day(s). '
                          f'Please choose a shorter period or wait until some of your existing reservations expire.'
        })

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
            break
    if gpu_id > NUMBER_OF_GPUS:
        return JSONResponse({'errorMessage': 'No GPU available for the dates provided. You need to choose a period were a GPU is continually available. Check the detailed view of the GPU schedule.'})

    booking = GpuBooking.from_orm(schedule)
    booking.gpu_id = gpu_id

    with Session(engine) as session:
        try:
            session.add(booking)
            session.commit()

            email_msg = f"""✅ A GPU has been booked from {booking.starting_date.date()} to {booking.ending_date.date()} in project <b>{booking.project_id}</b><br/><br/>
The GPU will be automatically enabled in your project <b>{booking.project_id}</b> on the <b>{booking.starting_date.date()}</b> at 9:00am, and disabled on the {booking.ending_date.date() + timedelta(days=1)} at 9:00am<br/><br/>
Ideally you should start your workspace before getting the GPU enabled, to prepare your data in the persistent folder, and create a script to install your dependencies. Then you can easily enable the GPU in this workspace once your reservation starts, see the documentation for more details: <a href="https://dsri.maastrichtuniversity.nl/docs/deploy-on-gpu#prepare-your-gpu-workspace" target="_blank">https://dsri.maastrichtuniversity.nl/docs/deploy-on-gpu</a><br/><br/>
If you want to cancel your reservation please send an email to <a href="mailto:DSRI-SUPPORT-L@maastrichtuniversity.nl>DSRI-SUPPORT-L@maastrichtuniversity.nl</a>
"""
            send_email(email_msg, to=booking.user_email, subject="📀 DSRI GPU booking registered")
            # print(post_msg_to_slack(f'📅➕ New booking: GPU {booking.gpu_id} for {booking.user_email} from {booking.starting_date} to {booking.ending_date}'))
            return JSONResponse({'message': 'GPU booking successfully submitted, you will receive an email with more details soon.'})
        except Exception as e:
            print(e)
            return JSONResponse({'errorMessage': 'Error creating the GPU booking.'})

