import time

from api import gpus, stats
from api.automated_tasks import backup_database, check_gpu_bookings
from api.config import settings
from api.database import init_db
from fastapi import APIRouter, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from fastapi_utilities import repeat_at

# Waiting for MySQL to start
time.sleep(7)

api_router = APIRouter()
api_router.include_router(stats.router, prefix="/stats", tags=["Stats"])
api_router.include_router(gpus.router, prefix="/gpu", tags=["GPUs"])

app = FastAPI(
    title='Manage GPU scheduling and cluster stats',
    description="""API to manage GPU scheduling and get cluster statistics

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
    swagger_ui_parameters={"defaultModelsExpandDepth": -1},
)
app.include_router(api_router)

@app.on_event("startup")
def create_db() -> None:
    init_db()

if settings.ENABLE_CRON:
    # Everyday at 09:00
    @app.on_event("startup")
    @repeat_at(cron='0 9 * * *')
    def daily_checks() -> None:
        check_gpu_bookings()

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