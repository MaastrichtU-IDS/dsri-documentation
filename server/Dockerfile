FROM python:3.14-slim

WORKDIR /app/

ENV TZ=Europe/Amsterdam \
    PYTHONUNBUFFERED='1' \
    APP_MODULE=api.main:app

RUN apt-get update && \
    apt-get install -y --no-install-recommends wget tzdata default-libmysqlclient-dev pkg-config build-essential && \
    rm -rf /var/lib/apt/lists/* && \
    pip install --upgrade pip

# Download kubectl and oc CLI
RUN cd /tmp && \
    wget -q https://mirror.openshift.com/pub/openshift-v4/clients/oc/latest/linux/oc.tar.gz && \
    tar xvf oc.tar.gz && \
    mv oc kubectl /usr/local/bin/ && \
    rm -f oc.tar.gz

COPY requirements.txt /app/

RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY . /app

RUN pip install .

CMD ["uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "80"]