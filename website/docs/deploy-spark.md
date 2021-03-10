---
id: deploy-spark
title: Spark cluster
---

:::warning Request access to the Spark Operator

To be able to deploy Spark you will need to [ask the DSRI admins](/dsri-documentation/help) to enable the Spark Operator in your project. It will be done quickly, once enabled you will be able to start a Spark cluster in a few clicks.

:::

## Deploy a Spark cluster

Once the DSRI admins have enabled the Spark Operator your project, you should found a **Spark Cluster** entry in the Catalog (in the **Operator Backed** category)

<img src="/dsri-documentation/img/screenshot-spark-operator1.png" alt="Apache Spark in the Catalog" style={{maxWidth: '100%', maxHeight: '100%'}} />

Click on the **Spark Cluster** entry to deploy a Spark cluster.

You will be presented a form where you can provide the number of Spark workers in your cluster. 

Additionally you can provide a label which can be helpful later to manage or delete the cluster, use the name of your application and the label `app`, e.g.: `app=my-spark-cluster`

<img src="/dsri-documentation/img/screenshot-spark-operator2.png" alt="Deploy a Apache Spark cluster" style={{maxWidth: '100%', maxHeight: '100%'}} />

:::tip Change 

The number of Spark workers can be easily updated later in the Spark deployment YAML file.

:::

## Run on Spark

You can now start a spark-enabled JupyterLab, or any other spark-enabled applications, to use the Spark cluster deployed.

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
