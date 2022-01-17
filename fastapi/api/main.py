from fastapi import FastAPI, APIRouter, Request, Response
from fastapi.responses import JSONResponse, RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from pydantic import BaseModel, Field

from api import users, gpus


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


@app.get("/", include_in_schema=False)
def redirect_root_to_docs():
    """Redirect the route / to /docs"""
    return RedirectResponse(url='/docs')
