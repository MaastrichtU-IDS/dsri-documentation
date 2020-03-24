---
id: deploy-services
title: Deploy services
---

Services available for the **Data Science Research Infrastructure**.

Feel free to propose new services using [pull requests](https://github.com/MaastrichtU-IDS/dsri-documentation/pulls) or request new ones by creating a [new issues](https://github.com/MaastrichtU-IDS/dsri-documentation/issues).

A service can be easily deployed from a [Docker image](/dsri-documentation/docs/guide-dockerfile-to-openshift).

---

## Data Science

### Jupyter notebooks

See the [Deploy Jupyter Notebooks](/dsri-documentation/docs/openshift-deploy-jupyter) documentation page.

### RStudio

RStudio can be deployed from the [OpenShift Catalog](https://app.dsri.unimaas.nl:8443/console/catalog):

<img src="/dsri-documentation/img/screenshot-deploy-rstudio.png" alt="Deploy RStudio" style="max-width: 100%; max-height: 100%;" />

This deployment uses a Persistent Volume Claim for Storage.

> See the [official Docker image documentation](https://github.com/rocker-org/rocker/wiki/Using-the-RStudio-image) for more details.

> See also this deployment for OpenShift: https://github.com/CSCfi/rstudio-openshift

### Matlab

> Work in progress at the moment. Please [let us know](mailto:dsri-support-l@maastrichtuniversity.nl) if you are interested in deploying Matlab on the DSRI.

---

## Databases

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
