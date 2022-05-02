FROM tiangolo/uvicorn-gunicorn-fastapi:python3.8

WORKDIR /app/

RUN apt-get update && \
    apt-get install -y cron wget

COPY requirements.txt /app/

RUN pip install -r requirements.txt

COPY . /app

RUN python setup.py install

# Copy cron file to the cron.d directory
COPY cron/gpu-notification-cron /etc/cron.d/gpu-notification-cron
RUN chmod 0644 /etc/cron.d/gpu-notification-cron  && \
    crontab /etc/cron.d/gpu-notification-cron && \
    touch /var/log/cron.log

# Install kubectl and oc
# wget https://github.com/openshift/okd/releases/download/4.9.0-0.okd-2022-01-14-230113/openshift-client-linux-4.9.0-0.okd-2022-01-14-230113.tar.gz


# Download kubectl and oc CLI
RUN cd /tmp && \
    wget https://mirror.openshift.com/pub/openshift-v4/clients/oc/latest/linux/oc.tar.gz && \
    tar xvf oc.tar.gz && \
    mv oc kubectl /usr/local/bin/
    # curl https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3 | bash


CMD ["uvicorn", "api.main:app",  "--host", "0.0.0.0", "--port", "80"]