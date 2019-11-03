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

## Databases

From [d2s-argo-workflows](https://github.com/MaastrichtU-IDS/data2services-argo-workflows).

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

