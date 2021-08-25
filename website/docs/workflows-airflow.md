---
id: workflows-airflow
title: Deploy Airflow
---

Deploy Apache Airflow to run workflows (aka. DAGs), hosted in a Git repository, on the DSRI. 

For more informations about Apache Airflow, go to https://airflow.apache.org

Here are a few links for more details on the official Airflow Helm chart:

* [Helm chart docs](https://airflow.apache.org/docs/helm-chart/stable/index.html)
* [Helm chart source code](https://github.com/apache/airflow/tree/main/chart)
* [Helm chart parameters](https://airflow.apache.org/docs/helm-chart/stable/parameters-ref.html)

## Install the chart

You will need to have Helm installed on your computer to deploy a GitHub Actions Runner, see the [Helm docs](/docs/helm) for more details.

Install the Helm chart to be able to deploy Airflow on the DSRI:

```bash
helm repo add apache-airflow https://airflow.apache.org
helm repo update
```

## Deploy Airflow

You will need to define the parameters of your Airflow deployment in a `values.yml` file, use [this file](https://github.com/MaastrichtU-IDS/dsri-documentation/blob/master/applications/airflow/values.yml) as base, and edit it to use your own dags. Download the file:

```bash
wget https://raw.githubusercontent.com/MaastrichtU-IDS/dsri-documentation/master/applications/airflow/values.yml
```

Deploy Airflow with the parameters defined in `values.yml` and a password for the web interface. The dags in Airflow will be automatically synchronized with the GitHub repository defined in the `gitSync` parameter:

```bash
helm install airflow apache-airflow/airflow \
    -f values.yml \
    --set webserver.defaultUser.password=yourpassword
```

Fix the postgresql deployment (because setting the `serviceAccount.name` of the sub chart `postgresql` don't work, but should be possible according to the [official helm docs](https://helm.sh/docs/chart_template_guide/subcharts_and_globals/)):

```bash
oc patch statefulset/airflow-postgresql --patch '{"spec":{"template":{"spec": {"serviceAccountName": "anyuid"}}}}'
```

To access it you can forward the webserver on your machine http://localhost:8080

```bash
oc port-forward svc/airflow-webserver 8080
```

Or expose the service on a URL (accessible when on the UM VPN) with HTTPS enabled:

```bash
oc expose svc/airflow-webserver
oc patch route/airflow-webserver --patch '{"spec":{"tls": {"termination": "edge", "insecureEdgeTerminationPolicy": "Redirect"}}}'
```

## Example workflows

You can find example DAGs for bash operator, python operator and Kubernetes pod operator [here](https://github.com/MaastrichtU-IDS/dsri-documentation/tree/master/applications/airflow/dags).

Here an example of a DAG using the Kubernetes pod operator to run tasks as pods, you will need to change the `namespace` parameter to your DSRI project where Airflow is deployed:

```python
from airflow import DAG
from datetime import datetime, timedelta
from airflow.contrib.operators.kubernetes_pod_operator import KubernetesPodOperator
from airflow.operators.dummy_operator import DummyOperator

default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'start_date': datetime.utcnow(),
    'email': ['airflow@example.com'],
    'email_on_failure': False,
    'email_on_retry': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=5)
}
dag = DAG(
    'kubernetes_pod_operator',
    default_args=default_args, 
    schedule_interval=None
    # schedule_interval=timedelta(minutes=10)
)

start = DummyOperator(task_id='run_this_first', dag=dag)

passing = KubernetesPodOperator(
    namespace='CHANGEME',
    image="python:3.6",
    cmds=["python","-c"],
    arguments=["print('hello world')"],
    labels={"app": "airflow"},
    name="passing-test",
    task_id="passing-task",
    get_logs=True,
    dag=dag
)

passing.set_upstream(start)
```

## Delete the chart

```bash
helm uninstall airflow
```
