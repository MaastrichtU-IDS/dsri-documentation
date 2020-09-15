---
id: deploy-database
title: Deploy databases
---

## SQL databases

### Start postgres

> Check availability in the catalog or use Docker image.

### Start apache-drill

> Try the [ZooKeeper / Apache Drill deployment ](https://github.com/Agirish/drill-containers/tree/master/kubernetes) for Kubernetes from MapR.

## Triplestores

## GraphDB

Use official image from GraphDB on DockerHub.

### Blazegraph triplestore

Use [lyrasis/blazegraph](lyrasis/blazegraph) Docker image.

* Image Name:

  ```
  lyrasis/blazegraph:2.1.5
  ```

* Mounted path: `/data`.
* Put files to load in the `/data` and send the [dataloader.txt](https://github.com/MaastrichtU-IDS/d2s-core/blob/master/argo/support/blazegraph-dataloader.txt) file to the API to run the bulk load.

```shell
wget https://raw.githubusercontent.com/MaastrichtU-IDS/d2s-core/master/argo/support/blazegraph-dataloader.txt

curl -X POST --data-binary @blazegraph-dataloader.txt --header 'Content-Type:text/plain' http://blazegraph-test-vincent.app.dsri.unimaas.nl/bigdata/dataloader
```

### Start Virtuoso

```shell
oc create -f d2s-pod-virtuoso.yaml
```

> To be developed: use the [official OpenLink deployment](https://github.com/MaastrichtU-IDS/d2s-core/blob/master/argo/pods/d2s-pod-virtuoso7.yaml).
