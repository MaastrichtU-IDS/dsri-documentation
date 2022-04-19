---
id: jupyterhub-workspace
title: JupyterHub workspace
---

## 🪐 Start your workspace

You can easily start a data science workspace with JupyterLab, VisualStudio Code and Conda pre-installed on the DSRI with JupyterHub:

1. Connect to the UM VPN
2. Go to https://jupyterhub-github.apps.dsri2.unimaas.nl
3. Login with your [GitHub](https://github.com) account
4. Choose the type of workspace, and the resources limitations 
5. Optionally you can provide additional parameters as environment variables:
   1. `GIT_NAME` and `GIT_EMAIL`: your name and email that will be used when committing with git
   2. `GIT_URL`: the URL of a git repository to be automatically cloned in the workspace, if there is a `requirements.txt` it will be automatically installed with `pip`


Once your workspace has started you can:

* Use the `persistent` folder to put data that will be kept even when the server is stopped, or if you use a different type of workspace
* Clone your code repository with `git`
* Install packages with `mamba`/`conda` or `pip`
* Go to the workspace overview: https://jupyterhub-github.apps.dsri2.unimaas.nl/hub/home to see your workspace, and stop it.

:::tip 

Put all the commands you use to install the packages required to run your code in a file in the `persistent` folder (ideally in the git repository with your code), so you can easily reinstall your environment if your workspace is stopped.

:::

## 📦️ Manage dependencies with Conda

In your workspace you can install new `conda` environments, if they include the packages  `nb_conda_kernels` and `ipykernel`, then you will be able to easily start notebooks in those environments from the JupyterLab Launcher page.

Install a conda environment from a file with `mamba` (it is like `conda` but faster):

```bash
mamba env create -f environment.yml
```

You'll need to wait for 1 minute before the new conda environment becomes available on the JupyterLab Launcher page.

You can easily install an environment with a different version of Python if you need it. Here is an example of an `environment.yml` file to create an environment with Python 3.9, install the minimal dependencies required to easily starts notebooks in this environment with `conda`, and install a `pip` package:

```yaml
name: py39
channels:
  - defaults
  - conda-forge
  - anaconda
dependencies:
  - python=3.9
  - ipykernel
  - nb_conda_kernels
  - pip
  - pip:
    - matplotlib
```

## 🐙 Use git in JupyterLab

You can use `git` from the terminal.

You can also use the [JupyterLab Git extension](https://github.com/jupyterlab/jupyterlab-git) or the VisualStudio Code git integration to clone and manage your `git` repositories.

They will ask you for a username and personal access token if the repository is private, or the first time you want to push changes.

<!--

<img src="https://raw.githubusercontent.com/jupyterlab/jupyterlab-git/master/docs/figs/preview.gif" alt="JupyterLab Git extension" style={{maxWidth: '100%', maxHeight: '100%'}} />

## ⚡️ Use the Spark cluster

A Spark cluster with 3 workers is available from your workspace, it can be accessed at the URL `spark://spark-cluster:7077`

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

Or with pandas:

```python
from pyspark.sql import SparkSession

spark = SparkSession.builder.getOrCreate()
```

```python
from datetime import datetime, date
import pandas as pd
from pyspark.sql import Row

df = spark.createDataFrame([
    Row(a=1, b=2., c='string1', d=date(2000, 1, 1), e=datetime(2000, 1, 1, 12, 0)),
    Row(a=2, b=3., c='string2', d=date(2000, 2, 1), e=datetime(2000, 1, 2, 12, 0)),
    Row(a=4, b=5., c='string3', d=date(2000, 3, 1), e=datetime(2000, 1, 3, 12, 0))
])
df
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
-->