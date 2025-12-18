---
id: jupyterhub-spark
title: JupyterHub with Spark
---

JupyterHub is ideal to enable multiple users easily start predefined workspaces in the same project. The complimentary Apache Spark cluster can be used from the workspaces to perform distributed processing.

## 🧊 Install kfctl

You will need to have the usual `oc` tool installed, and to install `kfctl` on your machine, a tool to deploy Kubeflow applications, download the [latest version for your OS 📥️](https://github.com/kubeflow/kfctl/releases) 

You can then install it by downloading the binary and putting it in your path, for example on Linux:

```bash
wget https://github.com/kubeflow/kfctl/releases/download/v1.2.0/kfctl_v1.2.0-0-gbc038f9_linux.tar.gz
tar -xzf kfctl_v1.2.0-0-gbc038f9_linux.tar.gz
sudo mv kfctl /usr/local/bin/
```

Clone the repository with the DSRI custom images and deployments for the OpenDataHub platform, and go to the `kfdef` folder:

```bash
git clone https://github.com/MaastrichtU-IDS/odh-manifests
cd odh-manifests/kfdef
```

## 🪐 Deploy JupyterHub and Spark

:::info Go the the kfdef folder

All scripts need to be run from the `kfdef` folder 📂

:::

You can deploy JupyterHub with 2 different authentications system, use the file corresponding to your choice:

* For the default DSRI authentication use `kfctl_openshift_dsri.yaml`

* For GitHub authentication use `kfctl_openshift_github.yaml`

  * You need to create a new GitHub OAuth app: https://github.com/settings/developers

  * And provide the GitHub client ID and secret through environment variable before running the start script:

    ```bash
    export GITHUB_CLIENT_ID=YOUR_CLIENT_ID
    export GITHUB_CLIENT_SECRET=YOUR_CLIENT_SECRET
    ```

First you will need to change the `namespace:` in the file you want to deploy, to provide the project where you want to start JupyterHub (currently `opendatahub-ids`), then you can deploy JupyterHub and Spark with `kfctl`:

```bash
./start_odh.sh kfctl_openshift_dsri.yaml
```

🗄️ Persistent volumes are automatically created for each instance started in JupyterHub to insure persistence of the data even JupyterHub is stopped. You can find the persistent volumes in the DSRI web UI, go to the **Administrator** view > **Storage** > **Persistent Volume Claims**.



⚡️ A Spark cluster with 3 workers is automatically created with the service name `spark-cluster`, you can use the URL of the master node to access it from your workspace: `spark://spark-cluster:7077`

## ✨ Use the Spark cluster

:::caution Matching Spark versions

Make sure all the Spark versions are matching, the current default version is `3.0.1`

:::

You can test the Spark cluster connection with PySpark:

```python
from pyspark.sql import SparkSession, SQLContext
import os
import socket
# Create a Spark session
spark_cluster_url = "spark://spark-cluster:7077"
spark = SparkSession.builder.master(spark_cluster_url).getOrCreate()
sc = spark.sparkContext

# Test your Spark connection
spark.range(5, numPartitions=5).rdd.map(lambda x: socket.gethostname()).distinct().collect()
# Or try:
#x = ['spark', 'rdd', 'example', 'sample', 'example']
x = [1, 2, 3, 4, 5]
y = sc.parallelize(x)
y.collect()
# Or try:
data = [1, 2, 3, 4, 5]
distData = sc.parallelize(data)
distData.reduce(lambda a, b: a + b)
```

### Match the version

Make sure all the Spark versions are matching, the current default version is `3.0.1`:

* Go to the Spark UI to verify the version of the Spark cluster
* Run `spark-shell --version` to verify the version of the Spark binary installed in the workspace
* Run `pip list | grep pyspark` to verify the version of the PySpark library

Check the [JupyterLab workspace `Dockerfile`](https://github.com/MaastrichtU-IDS/jupyterlab/blob/main/Dockerfile#L14) to change the version of Spark installed in the workspace, and see how you can download and install a new version of the Spark binary.

If you need to change the Python, Java or PySpark version in the workspace you can create a `environment.yml` file, for example for `2.4.5`:

```yaml
name: spark
channels:
  - defaults
  - conda-forge
  - anaconda
dependencies:
  - python=3.7
  - openjdk=8
  - ipykernel 
  - nb_conda_kernels
  - pip
  - pip:
    - pyspark==2.4.5
```

Create the environment with `conda`:

```bash
mamba env create -f environment.yml
```

### Spark UI

You can also create a route to access the Spark UI and monitor the activity on the Spark cluster:

```bash
oc expose svc/spark-cluster-ui
```

Get the Spark UI URL:

```bash
oc get route --selector radanalytics.io/service=ui --no-headers -o=custom-columns=HOST:.spec.host
```

### New Spark cluster

You can create a new Spark cluster, for example here using Spark `3.0.1` with the installed Spark Operator:

```bash
cat <<EOF | oc apply -f -
apiVersion: radanalytics.io/v1
kind: SparkCluster
metadata:
  name: spark-cluster
spec:
  customImage: quay.io/radanalyticsio/openshift-spark:3.0.1-2
  worker:
    instances: '10'
    memory: "4Gi"
    cpu: 4
  master:
    instances: '1'
    memory: "4Gi"
    cpu: 4
  env:
  - name: SPARK_WORKER_CORES
    value: 4
EOF
```

You can browse the list of available [image versions here](https://quay.io/repository/radanalyticsio/openshift-spark?tag=latest&tab=tags)

See the Radanalytics [Spark operator example configuration](https://github.com/radanalyticsio/spark-operator/blob/master/examples/cluster-with-config.yaml) for more details on the Spark cluster configuration. 

## 🗑️ Delete the deployment

Delete the running JupyterHub application and Spark cluster, including persistent volumes:

```bash
./delete_odh.sh kfctl_openshift_dsri.yaml
```


<!--

:::warning Restricted user

The users will be able to install new `pip` packages in their JupyterLab instance, but they will not have `sudo` privileges (so they cannot install `apt` or `yum` packages for example). This can be changed by editing the KubeSpawner python script in the ConfigMap to use `serviceAccountName: anyuid`

::: -->