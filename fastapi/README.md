# RD-FAIRmetric-F4

RD-FAIRmetric-F4


## Deploy the API

Clone the repository:

```bash
git clone https://github.com/LUMC-BioSemantics/RD-FAIRmetric-F4
cd RD-FAIRmetric-F4
```

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

