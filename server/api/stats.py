from api.utils import oc_login
from fastapi import APIRouter
from fastapi.responses import JSONResponse

router = APIRouter()

@router.get("/stats", name="Stats about the DSRI users and projects",
    description="Some stats about the DSRI users and projects",
    response_model=dict,
)
def get_stats() -> dict:
    dyn_client = oc_login()
    v1_projects = dyn_client.resources.get(api_version='project.openshift.io/v1', kind='Project')
    all_projects = v1_projects.get()

    faculty_stats = {}
    department_stats = {}
    total_projects = 0
    KNOWN_FACULTIES = {'fhml', 'fasos', 'sbe', 'fse'}

    for project in all_projects.items:
        name = project.metadata.name
        parts = name.split('-', 2)
        if len(parts) == 3 and parts[0] in KNOWN_FACULTIES:
            total_projects += 1
            faculty, department, slug = parts
        else:
            continue

        faculty_stats.setdefault(faculty, {'projects': 0})
        faculty_stats[faculty]['projects'] += 1

        dept = f'{faculty}-{department}'
        department_stats.setdefault(dept, {'projects': 0})
        department_stats[dept]['projects'] += 1

    return JSONResponse({
        'total_projects': total_projects,
        'faculties': faculty_stats
    })