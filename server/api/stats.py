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

    affiliations_stats = {}
    department_stats = {}
    total_projects = 0
    KNOWN_AFFILIATIONS = {'icts', 'fhml', 'bu', 'fdr', 'law', 'fin', 'fdewb', 'sbe', 'fdcw', 'fasos', 'ub', 'fdp', 'fpn', 'fs', 'fse'}

    AFFILIATION_RENAMES = {
        'fdr': 'law',
        'fdewb': 'sbe',
        'fdcw': 'fasos',
        'fdp': 'fpn',
    }
    
    for project in all_projects.items:
        name = project.metadata.name
        parts = name.split('-', 2)
        if len(parts) == 3 and parts[0] in KNOWN_AFFILIATIONS:
            total_projects += 1
            affiliation, department, slug = parts
        else:
            continue
        
        affiliation = AFFILIATION_RENAMES.get(affiliation, affiliation)
        
        affiliations_stats.setdefault(affiliation, {'projects': 0})
        affiliations_stats[affiliation]['projects'] += 1

        dept = f'{affiliation}-{department}'
        department_stats.setdefault(dept, {'projects': 0})
        department_stats[dept]['projects'] += 1

    return JSONResponse({
        'total_projects': total_projects,
        'affiliations': affiliations_stats
    })