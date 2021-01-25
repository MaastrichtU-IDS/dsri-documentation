---
id: catalog-data-streaming
title: Data streaming
---

## Apache Flink

[Apache Flink](https://flink.apache.org/) enables processing of Data Streams using languages such as Java or Scala .

:::caution Root permission required

🔒 You need root containers enabled (aka. anyuid) in your project to start this application.

:::

Create the Apache Flink template in your project using [vemonet/flink-on-openshift](https://github.com/vemonet/flink-on-openshift)

```shell
oc apply -f https://raw.githubusercontent.com/vemonet/flink-on-openshift/master/template-flink-dsri.yml
```

Use the template to start the cluster from the catalog.

Use this command to get the Flink Jobmanager pod id and copy file to the pod.

```shell
oc get pod --selector app=flink --selector component=jobmanager --no-headers -o=custom-columns=NAME:.metadata.name

# Example creating the workspace folder and copying the RMLStreamer.jar to the pod
oc exec <pod_id> -- mkdir -p /mnt/workspace/resources
oc cp workspace/resources/RMLStreamer.jar <pod_id>:/mnt/
```

Delete the Apache Flink cluster (change the application name):

```bash
oc delete all,secret,configmaps,serviceaccount,rolebinding --selector app=flink-cluster
```
