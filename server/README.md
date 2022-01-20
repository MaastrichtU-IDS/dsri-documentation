# DSRI documentation API


## Deploy the API


### For development

Install dependencies from the source code:

```bash
pip install -e .
```

Start the API locally on http://localhost:8000

```bash
uvicorn api.main:app --reload
```

### With docker

From the root of this repository, run:

```bash
docker-compose up
```

Access it on http://localhost:8000

