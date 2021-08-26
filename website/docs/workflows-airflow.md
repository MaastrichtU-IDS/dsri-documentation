---
id: workflows-airflow
title: Deploy Airflow
---

Deploy [Apache Airflow](https://airflow.apache.org) to run workflows (aka. DAGs), hosted in a Git repository, on the DSRI. 

## Install the chart

You will need to have Helm installed on your computer to deploy a GitHub Actions Runner, see the [Helm docs](/docs/helm) for more details.

Install the Helm chart to be able to deploy Airflow on the DSRI:

```bash
helm repo add apache-airflow https://airflow.apache.org
helm repo update
```

## Deploy Airflow

You can quickly deploy Airflow on the DSRI, with DAGs automatically synchronized with your Git repository. 

We use a [`values.yml` file](https://github.com/MaastrichtU-IDS/dsri-documentation/blob/master/applications/airflow/values.yml) with all default parameters pre-defined for the DSRI, so you just need to edit the password and git repository configuration in this command, and run it:

```bash
helm install airflow apache-airflow/airflow \
    -f https://raw.githubusercontent.com/MaastrichtU-IDS/dsri-documentation/master/applications/airflow/values.yml \
    --set webserver.defaultUser.password=yourpassword \
    --set dags.gitSync.repo=https://github.com/bio2kg/bio2kg-etl.git \
    --set dags.gitSync.branch=main \
    --set dags.gitSync.subPath=workflows/dags
```

:::info 

If you need to do more configuration you can download the a [`values.yml` file](https://github.com/MaastrichtU-IDS/dsri-documentation/blob/master/applications/airflow/values.yml), edit it directly to your settings and use this file locally with `-f values.yml`

:::

A few seconds after Airflow started to install, fix the postgresql deployment in a different terminal window (unfortunately setting the `serviceAccount.name` of the sub chart `postgresql` don't work, even if it should be possible according to the [official helm docs](https://helm.sh/docs/chart_template_guide/subcharts_and_globals/)):

```bash
oc patch statefulset/airflow-postgresql --patch '{"spec":{"template":{"spec": {"serviceAccountName": "anyuid"}}}}'
```

Once Airflow finished to deploy, you can access it temporarily by forwarding the webserver on your machine at http://localhost:8080

```bash
oc port-forward svc/airflow-webserver 8080:8080
```

Or permanently expose the service on a URL (accessible when on the UM VPN) with HTTPS enabled:

```bash
oc expose svc/airflow-webserver
oc patch route/airflow-webserver --patch '{"spec":{"tls": {"termination": "edge", "insecureEdgeTerminationPolicy": "Redirect"}}}'
```

Finally, get the route to the Airflow web interface, or access it via the DSRI web UI:

```bash
oc get routes
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

## See also

Here are a few links for more details on the official Airflow Helm chart:

* [Helm chart docs](https://airflow.apache.org/docs/helm-chart/stable/index.html)
* [Helm chart source code](https://github.com/apache/airflow/tree/main/chart)
* [Helm chart parameters](https://airflow.apache.org/docs/helm-chart/stable/parameters-ref.html)

Other ways to deploy Airflow on OpenShift:

* [Community Helm chart GitHub repo](https://github.com/airflow-helm/charts/tree/main/charts/airflow)
* [Airflow template for OpenShift](https://github.com/CSCfi/airflow-openshift)