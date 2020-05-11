---
id: deploy-spark
title: Deploy a Spark cluster
---

A [Apache Spark](https://spark.apache.org/) cluster can be deployed using a template in the [DSRI catalog](https://app.dsri.unimaas.nl:8443/console/catalog).

Feel free to [contact us](/dsri-documentation/help) to help you create the template in your project.

## Create the template

Clone the [vemonet/spark-openshift](https://github.com/vemonet/spark-openshift) repository:

```bash
git clone https://github.com/vemonet/spark-openshift.git
cd spark-openshift
```

Login with the `oc` command line tool and go to your project:

```shell
oc project <my_project>
```

Create the template:

```shell
oc create -f spark-template-existing-pvc.yml
```

> ⚠️ Root access is required to run Spark in your project.

## Deploy a Spark cluster

Go to the DSRI OpenShift web UI catalog and click on the **Apache Spark** application.

You will be prompted various parameters to configure your Spark cluster resources.

> 🚫 Only 1 Spark cluster should be deployed by project.

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
oc delete -f spark-template-existing-pvc.yml
```

