---
id: catalog-opendatahub
title: OpenDataHub

---


:::warning Work in progress

Deploying an [OpenDataHub](https://opendatahub.io) cluster is a **work in progress** on the DSRI, **[contact us](/dsri-documentation/help)** if you are interested in trying it out.

:::

[OpenDataHub](https://opendatahub.io) is a project to orchestrate the deployment of Data Science applications on OpenShift, based on KubeFlow.

## Components available on DSRI

Those components have been tested on the DSRI:

* [JupyterHub](https://github.com/MaastrichtU-IDS/odh-manifests/blob/master/jupyterhub/README.md)
* [Spark Operator](https://github.com/MaastrichtU-IDS/odh-manifests/blob/master/radanalyticsio/README.md) from [radanalytics](https://radanalytics.io/)

### Start Spark with JupyterHub

1. Checkout the [official documentation to start an instance of OpenDataHub](https://opendatahub.io/docs/getting-started/quick-installation.html) (note that the Operator has already been installed)

2. Then visit the [documentation to reach the Spark cluster](https://opendatahub.io/docs/getting-started/basic-tutorial.html) from a Jupyter notebook.

## All components

Here are all the components that can be deployed as part of an [OpenDataHub](https://opendatahub.io):

- [JupyterHub](https://github.com/MaastrichtU-IDS/odh-manifests/blob/master/jupyterhub/README.md)
- [Airflow](https://github.com/MaastrichtU-IDS/odh-manifests/blob/master/airflow/README.md)
- [Argo](https://github.com/MaastrichtU-IDS/odh-manifests/blob/master/odhargo/README.md)
- [Grafana](https://github.com/MaastrichtU-IDS/odh-manifests/blob/master/grafana/README.md) & [Prometheus](https://github.com/MaastrichtU-IDS/odh-manifests/blob/master/prometheus/README.md) for data/logs visualization
- [Spark Operator](https://github.com/MaastrichtU-IDS/odh-manifests/blob/master/radanalyticsio/README.md) from [radanalytics](https://radanalytics.io/)
- [Kafka](https://github.com/MaastrichtU-IDS/odh-manifests/blob/master/kafka/README.md)/Strimzi for streaming applications
- [Superset](https://github.com/MaastrichtU-IDS/odh-manifests/blob/master/superset/README.md) for data visualization
- [AI Library](https://github.com/MaastrichtU-IDS/odh-manifests/blob/master/ai-library/README.md) (Seldon to publish AI models)

Let us know if you need help to deploy one of those components on the DSRI.