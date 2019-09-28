---
id: start-ecosystem
title: DSRI Ecosystem
---

Containers available for the **Data Science Research Infrastructure**.

Feel free to propose new containers using [pull requests](https://github.com/MaastrichtU-IDS/dsri-documentation/pulls).

Build a container using a simple [Docker image](https://hub.docker.com/) .

---

## Data Science

### Jupyter lab

[![RStudio](/img/jupyter_logo.png)](https://jupyter.org/)

Use [amalic/jupyterlab](https://hub.docker.com/r/amalic/jupyterlab/) Docker image.

* Network port: `8888`
* Mounted volume: `/notebooks`
* Environment variables:
  * `PASSWORD=my_password`

---

### RStudio

[![RStudio](/img/rstudio_logo.png)](https://rstudio.com/)

Use [rocker/rstudio](https://hub.docker.com/r/rocker/rstudio/) Docker image.

* Network port: `8787`
* Mounted volume: `/srv`
* Environment variables:
  * `ROOT=TRUE`
  * `PASSWORD=my_password`

---

## Databases

From [d2s-argo-workflows](https://github.com/MaastrichtU-IDS/data2services-argo-workflows).

### Start apache-drill

```shell
# Create pod
oc create -f d2s-pod-drill.yaml
# Create service for the pod
oc create -f d2s-service-drill.yaml
```

> OpenShift should already [propose Apache Drill](https://thenewstack.io/mapr-brings-apache-spark-and-apache-drill-to-kubernetes/) deployment.

### Start postgres

> **TODO**

### Start Virtuoso

```shell
oc create -f d2s-pod-virtuoso.yaml
```

> **TODO**

---

## Utility

### Filebrowser

[![filebrowser](/img/filebrowser_banner.svg)](https://filebrowser.xyz/)

Deploy [filebrowser](https://hub.docker.com/r/filebrowser/filebrowser) over [MapR](https://mapr.com/) to access storage volumes.

Go to https://app.dsri.unimaas.nl:8443/console/catalog > click `Deploy image`.

- Add to Project: `argo`
- Image Name: `filebrowser/filebrowser` 
- Give a name to your image: `filebrowser`
- Click `Deploy`
- Go to `argo` project > Click on latest deployment of the `filebrowser`
- Delete the automatically mounted volume, and add the persistent volume (`data2services-storage`). Should be on `/srv`
- Add route

> Access on http://d2s-filebrowser-argo.app.dsri.unimaas.nl/files/

> Credentials: `admin` / `admin`