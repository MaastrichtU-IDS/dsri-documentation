import time

from api import gpus, users
from api.automated_tasks import backup_database, check_gpu_bookings
from api.database import init_db
from fastapi import APIRouter, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from fastapi_utils.tasks import repeat_at, repeat_every

# Waiting for MySQL to start
time.sleep(7)

api_router = APIRouter()
api_router.include_router(users.router, prefix="/user", tags=["Users"])
api_router.include_router(gpus.router, prefix="/gpu", tags=["GPUs"])


app = FastAPI(
    title='Manage DSRI users and GPU scheduling',
    description="""API to register DSRI users, manage GPU scheduling, and get statistics

[Source code](https://github.com/MaastrichtU-IDS/dsri-documentation)
""",
    license_info = {
        "name": "MIT license",
        "url": "https://opensource.org/licenses/MIT"
    },
    contact = {
        "name": "DSRI support team",
        "email": "DSRI-SUPPORT-L@maastrichtuniversity.nl",
        "url": "https://github.com/MaastrichtU-IDS/dsri-documentation",
    },
)
app.include_router(api_router)



@app.on_event("startup")
def create_db() -> None:
    init_db()


# @repeat_every(seconds=60 * 60 * 24)  # 1 day
# Note: internal time in the container is 2 hours earlier than Central European Time
# Can be changed with tzdata apt pkg
# Everyday at 09:00
@app.on_event("startup")
@repeat_at(cron='0 9 * * *')
def daily_checks() -> None:
    check_gpu_bookings()


# @repeat_every(seconds=60 * 60 * 24 * 7)  # 7 days
# At 09:00 on Monday and Thursday
@app.on_event("startup")
@repeat_at(cron='0 9 * * 1,4')
def weekly_backup() -> None:
    backup_database()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", include_in_schema=False)
def redirect_root_to_docs():
    """Redirect the route / to /docs"""
    return RedirectResponse(url='/docs')
