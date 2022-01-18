FROM tiangolo/uvicorn-gunicorn-fastapi:python3.8

WORKDIR /app/

RUN apt-get update && \
    apt-get install -y cron 

COPY requirements.txt /app/

RUN pip install -r requirements.txt

COPY . /app

RUN python setup.py install

# Copy cron file to the cron.d directory
COPY scripts/gpu-notification-cron /etc/cron.d/gpu-notification-cron
RUN chmod 0644 /etc/cron.d/gpu-notification-cron  && \
    crontab /etc/cron.d/gpu-notification-cron && \
    touch /var/log/cron.log


CMD ["uvicorn", "api.main:app",  "--host", "0.0.0.0", "--port", "80"]