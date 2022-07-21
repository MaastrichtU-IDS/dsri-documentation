import os
import re
import time
from datetime import date, datetime, timedelta
from typing import List, Optional

from api.config import settings
from api.notifications import post_msg_to_slack
from api.utils import oc_login
from fastapi import APIRouter, Body, HTTPException, Request, Response
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field, validator
from sqlalchemy.exc import IntegrityError, OperationalError
from sqlmodel import Field, Session, SQLModel, create_engine, select

# from sqlalchemy import VARCHAR
# from MySQLdb import OperationalError



# Login with LDAP: https://gist.github.com/femmerling/5097365

class CreateUser(SQLModel, table=False):
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

    @validator("email", "username", "employee_id", "affiliation", "project_type", "project_description", "gdpr")
    def reject_empty_strings(cls, v):
        assert v != ''
        return v

    @validator("email")
    def validate_email(cls, v):
        pattern = re.compile("^[a-zA-Z0-9\.-_]+@(?:student.)?maastrichtuniversity.nl$")
        assert pattern.match(v)
        return v

    # class config: validate_assignment = True

class User(CreateUser, table=True):
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
def register_user(createUser: CreateUser = Body(...)) -> dict:
    with Session(engine) as session:
        db_user = User.from_orm(createUser)
        # db_user = User.validate(createUser)
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
            return JSONResponse({'errorMessage': f'Error creating the user in the database, please communicate this error message to the DSRI support team to help resolve it: {e}'})


    # TODO: add this email to the dsri-allow-login list automatically

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

    # Get projects count from cluster
    dyn_client, k8s_client, kubeConfig = oc_login()
    v1_projects = dyn_client.resources.get(api_version='project.openshift.io/v1', kind='Project')
    all_projects = v1_projects.get()
    projects_list = []
    for project in all_projects.items:
        if 'openshift' not in project.metadata.name:
            projects_list.append(project.metadata.name)

    return JSONResponse({
        'users': user_count, 
        'departments': affiliation_stats,
        'projects': len(projects_list),
        'project_types': project_stats,
        'users_timeline': users_timeline
    })
    # Check fairificator > Evaluation.tsv for doughnut



class AdminPassword(BaseModel):
    password: str = ''


@router.post("/admin", name="Admin info about the DSRI users",
    description="Admin information about the DSRI users",
    response_model=dict,
)            
def post_users_admin(body: AdminPassword = Body(...)) -> dict:
    if body.password != settings.API_PASSWORD:
        raise HTTPException(status_code=403, detail=f"Wrong password")

    with Session(engine) as session:
        # Get database users
        statement = select(User).order_by(User.created_at)
        db_users_results = session.exec(statement)
        db_users = []
        for user in db_users_results:
            db_users.append({
                'email': user.email,
                'username': user.username,
                'employee_id': user.employee_id,
            })

        # Get users from cluster
        dyn_client, k8s_client, kubeConfig = oc_login()
        v1_projects = dyn_client.resources.get(api_version='user.openshift.io/v1', kind='User')
        cluster_users = v1_projects.get()
        
        cluster_users_list = []
        users_not_in_db = []
        for cluster_user in cluster_users.items:
            cluster_users_list.append({
                'id': cluster_user.metadata.name,
                'fullName': cluster_user.fullName
            })
            cluster_username = cluster_user.metadata.name.lower()
            found_in_db = False
            
            # Check database users if there is one matching
            for db_user in db_users:
                if db_user['email'].lower().startswith(cluster_username):
                    found_in_db = True
                    break
                if db_user['employee_id'].lower().startswith(cluster_username):
                    found_in_db = True
                    break
                
            if not found_in_db:
                users_not_in_db.append(cluster_user.metadata.name)

        return JSONResponse({
            'users_not_in_database': users_not_in_db,
            'cluster_users_count': len(cluster_users.items),
            'database_users_count': len(db_users),
            'cluster_users': cluster_users_list,
            'database_users': db_users,
        })