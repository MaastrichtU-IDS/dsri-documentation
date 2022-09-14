FROM tiangolo/uvicorn-gunicorn-fastapi:python3.8

WORKDIR /app/

ENV TZ=Europe/Amsterdam \
    PYTHONUNBUFFERED='1' \
    APP_MODULE=api.main:app \
    MAX_WORKERS='16'

## Check here for more details on how the image is built and which env variables are available
# https://github.com/tiangolo/uvicorn-gunicorn-docker/tree/master/docker-images
#   WORKER_CLASS=uvicorn.workers.UvicornWorker \
#   WORKERS_PER_CORE='1' \
#   LOG_LEVEL=info

RUN apt-get update && \
    apt-get install -y wget tzdata

# Download kubectl and oc CLI
RUN cd /tmp && \
    wget -q https://mirror.openshift.com/pub/openshift-v4/clients/oc/latest/linux/oc.tar.gz && \
    tar xvf oc.tar.gz && \
    mv oc kubectl /usr/local/bin/
    # Other option: https://github.com/openshift/okd/releases/download/4.9.0-0.okd-2022-01-14-230113/openshift-client-linux-4.9.0-0.okd-2022-01-14-230113.tar.gz
    # curl https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3 | bash


## Create non root user "app" in group "app"
RUN addgroup --system app && adduser --system --group app

## Make sure all files belongs to the app user
RUN chown -R app:app /app && \
    chown -R app:app $HOME && \
    chown -R app:app /usr/local

## Switch to app user to install the python app
USER app

COPY requirements.txt /app/

RUN pip install -r requirements.txt

COPY . /app

RUN python setup.py install


# By default this image entrypoint will use gunicorn to start multiple uvicorn workers 


## Copy cron file to the cron.d directory
# COPY cron/gpu-notification-cron /etc/cron.d/gpu-notification-cron
# RUN chmod 0644 /etc/cron.d/gpu-notification-cron  && \
#     crontab /etc/cron.d/gpu-notification-cron
    # touch /var/log/cron.log
