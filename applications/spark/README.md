Deploy an Apache Spark cluster

https://artifacthub.io/packages/search?ts_query_web=spark&sort=relevance&page=1

## Bitnami Helm chart

The most up-to-date deployment that enables to deploy a Spark cluster

https://artifacthub.io/packages/helm/bitnami/spark

In version 5 the `spark-submit` master URL was simpler: https://github.com/bitnami/charts/tree/ca634f31d57d94d5d777f74e5ba5dad65c50c09a/bitnami/spark#submit-an-application

### Install

```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
```

### Deploy

```bash
helm install spark-cluster -f values.yaml bitnami/spark --version 6.0.0
```

You can expose the Spark web UI by running those 2 commands:

```bash
oc expose svc/spark-cluster-master-svc --port=http
oc patch route/spark-cluster-master-svc --patch '{"spec":{"tls": {"termination": "edge", "insecureEdgeTerminationPolicy": "Redirect"}}}'
```

To properly access the logs in the Spark web UI you will need to provide your Spark web UI route URL in the `values.yaml` for `-Dspark.ui.reverseProxyUrl=`

### Run spark app

Run python script:

```bash
spark-submit \
	--master spark://spark-cluster:7077 \
	--deploy-mode cluster \
	sparkpi.py 1000
```

Getting the same error with bitnami and radanalytics Spark clusters:

> Caused by: io.netty.channel.AbstractChannel$AnnotatedNoRouteToHostException: No route to host: jupyterhub-nb-vemonet/172.30.70.65:33445
> Caused by: java.net.NoRouteToHostException: No route to host

Run (full instructions):

```bash
spark-submit \
    --class org.apache.spark.examples.SparkPi \
    --conf spark.kubernetes.container.image=bitnami/spark:3 \
    --master k8s://https://k8s-apiserver-host:k8s-apiserver-port \
    --conf spark.kubernetes.driverEnv.SPARK_MASTER_URL=spark://spark-master-svc:spark-master-port \
    --deploy-mode cluster \
    ./examples/jars/spark-examples_2.12-3.2.0.jar 1000
```

### Uninstall

```bash
helm uninstall spark-cluster
```

## GCP Operator

https://github.com/GoogleCloudPlatform/spark-on-k8s-operator

Only deploys SparkApplication (require to pre-build the docker image with the code you want to run inside...)

## Radanalytics

Not updated for 2 years, operator written in java

Does not support submitting Spark jobs from notebooks: https://github.com/radanalyticsio/spark-operator/issues/350

## Livy

https://github.com/JahstreetOrg/spark-on-kubernetes-helm

https://github.com/JahstreetOrg/spark-on-kubernetes-helm/tree/master/charts/livy
