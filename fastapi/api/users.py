from fastapi import FastAPI, APIRouter, Request, Response, Body
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from typing import List, Optional
from pydantic import BaseModel
import os
from sqlmodel import Field, Session, SQLModel, create_engine, select
from datetime import datetime, timedelta, date
from sqlalchemy.exc import IntegrityError 

from api.notifications import post_msg_to_slack


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
    number_of_collaborators: Optional[int]
    # use_dsri_date: Optional[date]
    use_dsri_date: Optional[datetime]

class User(UserModel, table=True):
    comment: str = ''
    access_enabled: bool = False
    created_at: datetime = datetime.now()

engine = create_engine(os.getenv('SQL_URL'))
SQLModel.metadata.create_all(engine)
router = APIRouter()


@router.post("/register", name="Register a user to access the DSRI",
    description="Register a user in the DSRI database to request access to the DSRI. Email needs to end with `@maastrichtuniversity.nl`",
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
            return JSONResponse({'errorMessage': f'User with the email {createUser.email} already exists'})
        except Exception as e:
            print(e)
            return JSONResponse({'errorMessage': 'Error creating the user in the database, try again!'})

    print(post_msg_to_slack(f'👤➕ New user: {createUser.email}'))
    return JSONResponse({'message': f'User {createUser.email} successfully added'})


@router.get("/stats", name="Stats about the DSRI users and projects",
    description="Some stats about the DSRI users and projects",
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
