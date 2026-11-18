import html
import re
from datetime import date, datetime, timedelta
from typing import List, Optional
from textwrap import dedent

from api.database import engine
from api.notifications import send_email
from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from pydantic import validator
from sqlmodel import Field, Session, SQLModel, select

NUMBER_OF_GPUS = 7
MAX_BOOK_DAYS = 4
MAX_BOOK_DAYS_PER_MONTH = 4  # total days allowed across ALL bookings in a calendar month
MAX_DAYS_AHEAD = 60          # how far in the future a booking may start

# Server-side validation (the frontend checks are only cosmetic)
EMAIL_RE = re.compile(r"^[a-z0-9._-]{1,64}@(student\.)?maastrichtuniversity\.nl$")
# Kubernetes DNS-1123 label: what OpenShift project and app names actually allow
K8S_NAME_RE = re.compile(r"^[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?$")

router = APIRouter()


class CreateBooking(SQLModel, table=False):
    user_email: str = Field(primary_key=True, max_length=120)
    starting_date: datetime = Field(primary_key=True)
    ending_date: datetime = Field(primary_key=True)
    project_id: str = Field(primary_key=False, max_length=63)
    app_id: str = Field(primary_key=False, max_length=63)

    @validator("user_email")
    def check_email(cls, v: str) -> str:
        v = v.strip().lower()
        if not EMAIL_RE.fullmatch(v):
            raise ValueError("the email address must end with @maastrichtuniversity.nl or @student.maastrichtuniversity.nl")
        return v

    @validator("project_id", "app_id")
    def check_k8s_name(cls, v: str) -> str:
        v = v.strip()
        if not K8S_NAME_RE.fullmatch(v):
            raise ValueError("the app ID should only contain lowercase, alphanumeric characters and/or -, cannot start or end with - and can only be max 63 chars")
        return v

    @validator("starting_date")
    def check_start(cls, v: datetime) -> datetime:
        today = date.today()
        # -1 day tolerance: the calendar sends local midnight as UTC (previous day)
        if v.date() < today - timedelta(days=1):
            raise ValueError("starting date cannot be in the past")
        if v.date() > today + timedelta(days=MAX_DAYS_AHEAD):
            raise ValueError(f"starting date cannot be more than {MAX_DAYS_AHEAD} days ahead")
        return v

    @validator("ending_date")
    def check_end(cls, v: datetime, values: dict) -> datetime:
        start = values.get("starting_date")
        if start is not None and v < start:
            raise ValueError("ending date must be on or after starting date")
        return v


class GpuBooking(CreateBooking, table=True):
    gpu_id: Optional[int] = Field(default=None, primary_key=True)
    # default_factory: the old `= datetime.now()` was evaluated once at import time
    created_at: datetime = Field(default_factory=datetime.now)


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


# Sum how many days `user_email` has already booked in the same
# calendar month as `reference_date`, across ALL of their bookings.
def get_user_days_booked_this_month(session: Session, user_email: str, reference_date: datetime) -> int:
    year = reference_date.year
    month = reference_date.month

    statement = select(GpuBooking).where(GpuBooking.user_email == user_email)
    existing_bookings = session.exec(statement).all()

    total_days = 0
    for booking in existing_bookings:
        if booking.starting_date.year == year and booking.starting_date.month == month:
            delta = booking.ending_date - booking.starting_date
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

    # Monthly cap check, across all of this user's existing bookings
    # that start in the same calendar month as this new request.
    new_booking_days = delta.days + 1
    with Session(engine) as session:
        user_days_booked_this_month = get_user_days_booked_this_month(
            session, schedule.user_email, schedule.starting_date
        )

    if user_days_booked_this_month + new_booking_days > MAX_BOOK_DAYS_PER_MONTH:
        return JSONResponse({
            'errorMessage': (
                f'You have already booked {user_days_booked_this_month} day(s) of GPU time '
                f'this month. This request would bring your total to '
                f'{user_days_booked_this_month + new_booking_days} days, exceeding the '
                f'{MAX_BOOK_DAYS_PER_MONTH}-day monthly limit. Contact rcs-ub@maastrichtuniversity.nl '
                f'if you need an exception.'
            )
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

            # Never put user input into HTML unescaped
            project = html.escape(booking.project_id)

            email_msg = dedent(f"""\
                                ✅ A GPU has been booked from {booking.starting_date.date()} to {booking.ending_date.date()} in project <b>{project}</b><br/><br/>
                                The GPU will be automatically enabled in your project <b>{project}</b> on the <b>{booking.starting_date.date()}</b> at 9:00am, and disabled on the {booking.ending_date.date() + timedelta(days=1)} at 9:00am<br/><br/>
                                <b>Please note:</b> the GPU is only enabled automatically if you booked <b>before 09:00 AM</b> on your start date. If you booked after 09:00 AM, please contact us at <a href="mailto:rcs-ub@maastrichtuniversity.nl">rcs-ub@maastrichtuniversity.nl</a> and we will enable it manually.<br/><br/>
                                Ideally you should start your workspace before getting the GPU enabled, to prepare your data in the persistent folder, and create a script to install your dependencies. Then you can easily enable the GPU in this workspace once your reservation starts, see the documentation for more details: <a href="https://dsri.maastrichtuniversity.nl/docs/deploy-on-gpu#prepare-your-gpu-workspace" target="_blank">https://dsri.maastrichtuniversity.nl/docs/deploy-on-gpu</a><br/><br/>
                                If you want to cancel your reservation please send an email to <a href="mailto:rcs-ub@maastrichtuniversity.nl">rcs-ub@maastrichtuniversity.nl</a>
                                """)
            send_email(email_msg, to=booking.user_email, subject="📀 DSRI GPU booking registered")

            return JSONResponse({'message': 'GPU booking successfully submitted, you will receive an email with more details soon.'})
        except Exception as e:
            print(e)
            return JSONResponse({'errorMessage': 'Error creating the GPU booking.'})