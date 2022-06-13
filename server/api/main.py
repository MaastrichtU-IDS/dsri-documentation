import time
from typing import List, Optional

from api import gpus, users
from api.automated_tasks import backup_database, check_gpu_bookings
from fastapi import APIRouter, FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, RedirectResponse
from fastapi_utils.tasks import repeat_every
from pydantic import BaseModel, Field

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
        "name": "Vincent Emonet",
        "email": "vincent.emonet@gmail.com",
        "url": "https://github.com/vemonet",
    },
)

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
@repeat_every(seconds=60 * 60 * 24)  # 1 day
def daily_checks() -> None:
    check_gpu_bookings()


@app.on_event("startup")
@repeat_every(seconds=60 * 60 * 24 * 7)  # 7 days
def weekly_backup() -> None:
    backup_database()


@app.get("/", include_in_schema=False)
def redirect_root_to_docs():
    """Redirect the route / to /docs"""
    return RedirectResponse(url='/docs')
