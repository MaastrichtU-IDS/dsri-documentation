from fastapi import FastAPI, APIRouter, Request, Response, Body
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from typing import List, Optional
from pydantic import BaseModel
import os
import time
from sqlmodel import Field, Session, SQLModel, create_engine, select
from datetime import datetime, timedelta, date
from sqlalchemy.exc import IntegrityError, OperationalError
# from sqlalchemy import VARCHAR
# from MySQLdb import OperationalError

from api.notifications import post_msg_to_slack


# Login with LDAP: https://gist.github.com/femmerling/5097365

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
    gdpr_avg_number: Optional[str]

class User(UserModel, table=True):
    comment: str = ''
    access_enabled: bool = False
    created_at: datetime = datetime.now()

# engine = create_engine(os.getenv('SQL_URL'))
engine = create_engine(os.getenv('SQL_URL'), pool_pre_ping=True, pool_recycle=3600)
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
        except OperationalError as e:
            # if e[0] == 2006:
            # Sometime we get "MySQL server has gone away" and we just need to rerun the query
            print(e)
            print('Got "MySQL server has gone away" error, retrying to add the user.')
            # engine = create_engine(os.getenv('SQL_URL'))
            time.sleep(1)
            return register_user(createUser)
            # else:
            #     print('Operational error')
            #     print(e)
            #     return JSONResponse({'errorMessage': 'Error creating the user in the database, try again!'})
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
        statement = select(User).order_by(User.created_at)
        users = session.exec(statement)
        user_count = 0
        affiliation_stats = {}
        project_stats = {}
        users_timeline = {}
        for user in users:
            user_count += 1

            if not user.affiliation in affiliation_stats.keys():
                affiliation_stats[user.affiliation] = {'users': 0}
            affiliation_stats[user.affiliation]['users'] += 1

            if not user.project_type in project_stats.keys():
                project_stats[user.project_type] = {'users': 0}
            project_stats[user.project_type]['users'] += 1

            creation_date = user.created_at.strftime("%Y-%m-%d")
            if not creation_date in users_timeline.keys():
                users_timeline[creation_date] = user_count
            else:
                users_timeline[creation_date] = users_timeline[creation_date] + 1
            
    return JSONResponse({
        'users': user_count, 
        'departments': affiliation_stats,
        'projects': project_stats,
        'users_timeline': users_timeline
    })
    # Check fairificator > Evaluation.tsv for doughnut
