---
id: openshift-services
title: Deploy services
---

Services available for the **Data Science Research Infrastructure**.

Feel free to propose new services using [pull requests](https://github.com/MaastrichtU-IDS/dsri-documentation/pulls) or request new ones by creating a [new issues](https://github.com/MaastrichtU-IDS/dsri-documentation/issues).

A service can be easily deployed from a [Docker image](https://hub.docker.com/).

---

## Data Science

### Jupyter lab

[![Jupyterlab](/dsri-documentation/img/jupyter_logo.png)](https://jupyter.org/)

Use [amalic/jupyterlab](https://hub.docker.com/r/amalic/jupyterlab/) Docker image.

* Image name:
  
  ```
  amalic/jupyterlab
  ```
  
* Environment variables:
  
  * `PASSWORD=my_password`
  
* Mounted volume: `/notebooks`

> Network port: `8888`

> Use [OpenShift secrets](/dsri-documentation/docs/openshift-secret) to provide password in a secure manner. (**TODO:** improve doc).

---

### Anaconda and Tensorflow with Jupyter

Use [jupyter/tensorflow-notebook](https://hub.docker.com/r/jupyter/tensorflow-notebook) official Docker image.

* Image name:

  ```shell
  jupyter/tensorflow-notebook
  ```
  
* Environment variables:

  * `JUPYTER_ENABLE_LAB=yes` (optional)

* Mounted path: `/home/jovyan`

> Go to the `pod logs` to get the `login token`.

Or build **Jupyter for OpenShift**:

https://github.com/jupyter-on-openshift/jupyter-notebooks/tree/develop/tensorflow-notebook

```shell
oc new-build --name tensorflow-notebook --binary
oc start-build tensorflow-notebook --from-dir=. --follow --wait
oc new-app tensorflow-notebook
oc expose svc/tensorflow-notebook
oc get route
# Delete build:
oc delete build tensorflow-notebook
```

> To test

---

### RStudio

[![RStudio](/dsri-documentation/img/rstudio_logo.png)](https://rstudio.com/)

Use [rocker/rstudio](https://hub.docker.com/r/rocker/rstudio/) Docker image.

* Image name:
  
  ```
  rocker/rstudio
  ```

* Environment variables:
  * `ROOT=TRUE`
  * `PASSWORD=my_password`
* Mounted path: `/home` (rstudio files goes to `/home/rstudio`)

> Username: `rstudio`

> Network port: `8787`

---

### Matlab

Use the Dockerfile provided by IDS which includes a license.

```shell
oc new-build --name matlab-ids --binary
oc start-build matlab-ids --from-dir=. --follow --wait
oc new-app matlab-ids
oc expose svc/matlab-ids
```

> Navigate to the pod terminal.

> Not working on DSRI at the moment, error at loading/unzipping the R2017b_glnxa64.tar.gz file during `oc start-build`.

---

## Databases

From [d2s-argo-workflows](https://github.com/MaastrichtU-IDS/data2services-argo-workflows).

### Blazegraph triplestore

Use [lyrasis/blazegraph](lyrasis/blazegraph) Docker image.

* Image Name:

  ```
  lyrasis/blazegraph:2.1.5
  ```

* Mounted path: `/data`.
* Put files to load in the `/data` and send the [dataloader.txt](https://github.com/MaastrichtU-IDS/d2s-argo-workflows/blob/master/support/blazegraph-dataloader.txt) file to the API to run the bulk load.

```shell
wget https://raw.githubusercontent.com/MaastrichtU-IDS/d2s-argo-workflows/master/support/blazegraph-dataloader.txt

curl -X POST --data-binary @blazegraph-dataloader.txt --header 'Content-Type:text/plain' http://blazegraph-test-vincent.app.dsri.unimaas.nl/bigdata/dataloader
```

### Start postgres

> **TODO:** available in a catalog?

### Start apache-drill

> **TODO:** try the [ZooKeeper / Apache Drill deployment ](https://github.com/Agirish/drill-containers/tree/master/kubernetes) for Kubernetes from MapR.

### Start Virtuoso

```shell
oc create -f d2s-pod-virtuoso.yaml
```

> **TODO:** use the [official OpenLink deployment](https://github.com/MaastrichtU-IDS/d2s-argo-workflows/blob/master/pods/d2s-pod-virtuoso7.yaml).

---

## Connect to DockerHub

Create secret to pull private images.

```shell
oc create secret docker-registry docker-hub-secret --docker-server=docker.io --docker-username=your-dockerhub-username --docker-password=your-dockerhub-password --docker-email=your-dockerhub-email
```

