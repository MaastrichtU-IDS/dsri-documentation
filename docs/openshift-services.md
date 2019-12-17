---
id: openshift-services
title: Deploy services
---

Services available for the **Data Science Research Infrastructure**.

Feel free to propose new services using [pull requests](https://github.com/MaastrichtU-IDS/dsri-documentation/pulls) or request new ones by creating a [new issues](https://github.com/MaastrichtU-IDS/dsri-documentation/issues).

A service can be easily deployed from a [Docker image](/dsri-documentation/docs/guide-dockerfile-to-openshift).

---

## Data Science

### Jupyter notebooks

[![Jupyterlab](/dsri-documentation/img/jupyter_logo.png)](https://jupyter.org/)

See the [Deploy Jupyter Notebooks](/dsri-documentation/docs/openshift-deploy-jupyter) page.

---

### RStudio

[![RStudio](/dsri-documentation/img/rstudio_logo.png)](https://rstudio.com/)

Use [rocker/rstudio](https://hub.docker.com/r/rocker/rstudio/) Docker image.

* Image name:
  
  ```
  rocker/rstudio
  ```

* Environment variables:
  * `ROOT` : `TRUE`
  * `PASSWORD` : `my_password`
* Mounted path: `/home` (rstudio files goes to `/home/rstudio`)

> Username: `rstudio`

> Network port: `8787`

---

### Matlab

> Work in progress at the moment. Please [let us know](mailto:dsri-support-l@maastrichtuniversity.nl) if you are interested in deploying Matlab on the DSRI.

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

