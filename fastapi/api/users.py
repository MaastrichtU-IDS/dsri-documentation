from fastapi import FastAPI, APIRouter, Request, Response, Body
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from typing import List, Optional
from pydantic import BaseModel, Field

import os
# import datetime
import requests

from sqlmodel import Field, Session, SQLModel, create_engine, select
from datetime import datetime, timedelta
from sqlalchemy.exc import IntegrityError 

router = APIRouter()


class UserModel(SQLModel, table=False):
    email: str = Field(default='@maastrichtuniversity.nl', primary_key=True)
    username: str
    employee_id: str
    affiliation: str
    project_type: str
    project_description: str
    gdpr: str
    git_repo: Optional[str]
    project_id: Optional[str]
    hear_about_us: Optional[str]

class User(UserModel, table=True):
    comment: str = ''
    access_enabled: bool = False
    created_at: datetime = datetime.now()

engine = create_engine(os.getenv('SQL_URL'))
SQLModel.metadata.create_all(engine)


@router.post("/register", name="Register a user to the DSRI",
    description="Register a user to the DSRI database. Email needs to end with `@maastrichtuniversity.nl`",
    response_model=dict,
)            
def register_user(createUser: UserModel = Body(...)) -> dict:
    with Session(engine) as session:
        db_user = User.from_orm(createUser)
        print(db_user)
        try:
            session.add(db_user)
            session.commit()
        except IntegrityError:
            return JSONResponse({'message': 'User with the email {createUser.email} already exists'})
        except Exception as e:
            print(e)
            return JSONResponse({'message': 'Error creating the user in the database'})

    return JSONResponse({'message': f'User {createUser.email} successfully added'})


@router.get("/stats", name="Stats about the DSRI users and projects",
    description="Stats about the DSRI users and projects",
    response_model=dict,
)            
def get_stats() -> dict:
    with Session(engine) as session:
        statement = select(User)
        users = session.exec(statement)
        user_count = 0
        for user in users:
            user_count += 1
    return JSONResponse({'number_of_users': user_count})
