---
id: deploy-database
title: Start databases
---

## SQL databases

### Start MySQL

MySQL databases can be started using Helm, see the [Helm documentation page](/dsri-documentation/docs/helm#install-a-helm-chart) to start a MySQL database in your project.

### Start apache-drill

Use the [ZooKeeper / Apache Drill deployment ](https://github.com/Agirish/drill-containers/tree/master/kubernetes) for Kubernetes from MapR.

## Graph databases

## Ontotext GraphDB triplestore

Use the official DockerHub image if you have an enterprise license. Or [build](/dsri-documentation/guide-dockerfile-to-openshift) GraphDB free edition image from [graphdb-docker on GitHub](https://github.com/Ontotext-AD/graphdb-docker).

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

### Start Virtuoso triplestore

Use the [official OpenLink deployment](https://github.com/MaastrichtU-IDS/d2s-core/blob/master/argo/pods/d2s-pod-virtuoso7.yaml) and `anyuid` service account.
