FROM tiangolo/uvicorn-gunicorn-fastapi:python3.8

WORKDIR /app/

# RUN apt-get update && \
#     apt-get install -y python-mysqldb

COPY ./requirements.txt /app/

RUN pip install -r requirements.txt

COPY . /app

RUN python setup.py install

CMD ["uvicorn", "api.main:app",  "--host", "0.0.0.0", "--port", "80"]