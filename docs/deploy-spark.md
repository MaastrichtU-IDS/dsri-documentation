---
id: deploy-spark
title: Start a Spark cluster
---

An [Apache Spark](https://spark.apache.org/) cluster can be deployed using a template in the [DSRI catalog](https://app.dsri.unimaas.nl:8443/console/catalog).

> ⚠️ You need to have root containers enabled, and a persistent storage in your project. 

The following services are deployed:

* a JupyterLab all-spark-notebook

* a configurable Spark cluster from [CSCfi/spark-openshift](https://github.com/CSCfi/spark-openshift)

> Feel free to [contact us](/dsri-documentation/help) to help you using Apache Spark in your project.

## Create the template

> You will need to have [the oc command line tool installed](/dsri-documentation/docs/openshift-install) to create the template.

Login with the `oc` command line tool and go to your project:

```shell
oc project <my_project>
```

Create the template:

```shell
oc apply -f https://raw.githubusercontent.com/vemonet/spark-openshift/master/spark-template-dsri.yml
```

## Deploy a Spark cluster

Go to the DSRI OpenShift web UI catalog and click on the **Apache Spark (Persistent)** application.

<img src="/dsri-documentation/img/screenshot-deploy-spark.png" alt="Deploy Apache Spark" style="max-width: 100%; max-height: 100%;" />

You will be prompted various parameters to configure your Spark cluster resources.

> 🚫 Only 1 Spark cluster should be deployed by project.

## Run on Spark

### Using PySpark

Use local Spark for testing:

```python
import findspark
findspark.init()
import pyspark
sc = pyspark.SparkContext(appName="Pi")
```

> It will use local[*] as Spark cluster

Use the deployed Spark cluster:

```shell
import pyspark
sc = pyspark.SparkContext(appName="Pi", master="spark://my-spark-spark-master:7077")
```

## Delete a running Spark cluster

Get all objects part of the Spark cluster:

```bash
oc get all --selector app=spark
```

Delete all objects generated for the Spark cluster:

```bash
oc delete all --selector app=spark
oc delete secret --selector app=spark
oc delete configmaps --selector app=spark
```

## Delete the Spark template

In case you want to delete or update the Spark template:

```shell
oc delete -f spark-template-dsri.yml
```
