---
id: okd3-deploy-spark
title: Start a Spark cluster
---


:::warning Work in progress

Deploying an [Apache Spark](https://spark.apache.org/) cluster is a **work in progress** on the DSRI, **[contact us](/dsri-documentation/help)** if you are interested in trying it out.

:::


## Create the template

The following services are deployed by this Spark template:

* a JupyterLab all-spark-notebook
* a configurable Spark cluster from [CSCfi/spark-openshift](https://github.com/CSCfi/spark-openshift)
* a storage automatically created

Create the template:

```shell
oc apply -f https://raw.githubusercontent.com/vemonet/spark-openshift/master/spark-template-dsri.yml
```

## Deploy a Spark cluster

Go to the DSRI OpenShift web UI catalog and click on the **Apache Spark (Persistent)** application.

<img src="/dsri-documentation/img/screenshot-deploy-spark.png" alt="Deploy Apache Spark" style={{maxWidth: '100%', maxHeight: '100%'}} />

You will be prompted various parameters to configure your Spark cluster resources.

:::caution 1 cluster per project

Only 1 Spark cluster should be deployed by project.

:::

## Run on Spark

### Using PySpark

Use local Spark for testing, it will use `local[*]` as Spark cluster

```python
import findspark
findspark.init()
import pyspark
sc = pyspark.SparkContext(appName="Pi")
```

Use the deployed Spark cluster:

```shell
import pyspark
sc = pyspark.SparkContext(appName="Pi", master="spark://my-spark-spark-master:7077")
```

## Delete a running Spark cluster

Get all objects part of the Spark cluster:

```bash
oc get all,secret,configmaps --selector app=spark
```

## Delete the Spark template

In case you want to delete or update the Spark template:

```shell
oc delete -f https://raw.githubusercontent.com/vemonet/spark-openshift/master/spark-template-dsri.yml
```

## Alternative: deploy Spark with Helm

You can use Helm to deploy Spark on OpenShift.

1. Install Helm following instructions at [this page](/dsri-documentation/docs/helm).

2. Install Microsoft Spark charts, with Zeppelin notebook and Livy API: https://artifacthub.io/packages/helm/microsoft/spark