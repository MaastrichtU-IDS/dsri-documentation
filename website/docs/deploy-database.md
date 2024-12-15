---
id: deploy-database
title: Databases
---

## SQL databases

You can easily create a database from the templates available in the DSRI OpenShift web UI catalog:

<img src="/img/screenshot-databases.png" alt="Databases in catalog web UI" style={{maxWidth: '100%', maxHeight: '100%'}} />

You can connect to a database from another application in the same project by using the database service name as hostname:

<img src="/img/screenshot_database_service.png" alt="Databases in catalog web UI" style={{maxWidth: '100%', maxHeight: '100%'}} />

You can also use the `oc` CLI to get the services in your project:

```bash
oc get services
```

### Start PostgreSQL 🐘

Use the **Postgresql** template in the DSRI OpenShift web UI catalog to start a SQL database. 

:::tip Connect to the database

When the database has been deployed, you can connect from another pod using your favorite language and connector.

:::

Example with the `psql` Command Line Interface:

```bash
apt-get update && apt-get install postgresql-client -y
```

Connect to the Postgresql database using the service name (change depending on the username and database name you chose):

```bash
psql -h postgresql-db -U postgres db
```

Checkout the [dsri-demo repository](https://github.com/MaastrichtU-IDS/dsri-demo) for a quick demo for accessing and using a PostgreSQL database from a Jupyter notebook on the DSRI.

### Start MySQL 🐬

Use the **MySQL** template in the DSRI OpenShift web UI catalog.

:::tip Connect to the database

When the database has been deployed, you can connect from another pod using your favorite language and connector.

:::

Example with the `mysql` Command Line Interface:

```bash
apt-get update && apt-get install mariadb-client -y
```

Connect to the MySQL database using the service name:

```bash
mysql -h example-mysql -p
```

Checkout the [dsri-demo repository](https://github.com/MaastrichtU-IDS/dsri-demo) for a quick demo for accessing and using a MySQL database from a Jupyter notebook on the DSRI.

> Alternatively, MySQL databases can be started using Helm, see the [Helm documentation page](/docs/helm#install-a-helm-chart) for more details.

<!-- MariaDB not working

### Start MariaDB 🦦

Use the **MariaDB** template in the DSRI OpenShift web UI catalog.

:::tip Connect to the database

When the database has been deployed, you can connect from another pod using your favorite language and connector.

:::

Example with the `mysql` Command Line Interface:

```bash
apt-get update && apt-get install mariadb-client -y
```

Connect to the MariaDB database using the service name:

```bash
mysql -h example-mysql -p
```

### Start Apache Drill 🔩

:::info Contact us

Contact us to install Apache Drill

:::

Use the [ZooKeeper / Apache Drill deployment ](https://github.com/Agirish/drill-containers/tree/master/kubernetes) for Kubernetes.

-->

## NoSQL databases

### MongoDB 🌿

[MongoDB](https://www.mongodb.com/) is a general purpose, document-based, distributed database built for modern application developers and for the cloud era. 

**MongoDB** can be deployed via Helm Chart as follows:

1) Install the Helm Client as explained in (https://dsri.maastrichtuniversity.nl/docs/helm)

2) Add the Bitnami Helm Repository. Bitnami offers a wide range of Helm charts, and you can add their repository with the following command:
```bash
 helm repo add bitnami https://charts.bitnami.com/bitnami

 helm repo update
```
3) you can **deploy MongoDB** as follows:
```bash
   helm install my-mongodb bitnami/mongodb
```
4) You can connect with **my-mongodb** as follows (within the cluster, for ex; via a terminal session opened at https://console-openshift-console.apps.dsri2.unimaas.nl/):

In the follwoing scripts, we assume that we are working with a project/namespace named as 'manu-test'. Replace this with your own project/namespace name.
MongoDB can be accessed on the following DNS name(s) and ports from within your cluster:

    my-mongodb.manu-test.svc.cluster.local

To get the root password run:

    export MONGODB_ROOT_PASSWORD=$(kubectl get secret --namespace manu-test my-mongodb -o jsonpath="{.data.mongodb-root-password}" | base64 -d)

To connect to your database, create a MongoDB; client container:

    kubectl run --namespace manu-test my-mongodb-client --rm --tty -i --restart='Never' --env="MONGODB_ROOT_PASSWORD=$MONGODB_ROOT_PASSWORD" --image docker.io/bitnami/mongodb:8.0.4-debian-12-r0 --command -- bash

Then, run the following command:

    export MONGODB_ROOT_USER="root"
    mongosh admin --host "my-mongodb" --authenticationDatabase admin --username $MONGODB_ROOT_USER --password $MONGODB_ROOT_PASSWORD

To connect to your database from outside the cluster execute the following commands:

    kubectl port-forward --namespace manu-test svc/my-mongodb 27017:27017 &
    mongosh --host 127.0.0.1 --authenticationDatabase admin --username $MONGODB_ROOT_USER --password $MONGODB_ROOT_PASSWORD


### Redis 🎲

[Redis](http://redis.io/) is an advanced key-value cache and store. It is often referred to as a data structure server since keys can contain  strings, hashes, lists, sets, sorted sets, bitmaps and hyperlog.

Use the **Redis** template in the DSRI OpenShift web UI catalog.

:::tip Connect to the database

Use the service name as hostname to connect from another pod in the same project.

:::

## Graph databases

### OpenLink Virtuoso triplestore

Search for the **Virtuoso triplestore** template in the DSRI web UI catalog. Instantiate the template to create a Virtuoso triplestore in your project.

The deployment is based on the latest open source version of Virtuoso: https://hub.docker.com/r/openlink/virtuoso-opensource-7

:::tip Connect to the database

Use the service name as hostname to connect from another pod in the same project.

:::

### Ontotext GraphDB triplestore

Use the official DockerHub image if you have an enterprise license. Or [build](https://maastrichtu-ids.github.io/dsri-documentation/docs/guide-dockerfile-to-openshift) GraphDB free edition image from [graphdb-docker on GitHub](https://github.com/Ontotext-AD/graphdb-docker).

After downloading the `.zip` file from the github to your laptop, unzip it and go the `graphdb-docker-master` folder in your terminal:

```bash
cd graphdb-docker-master
```

Before creating your GraphDB ImageStream, make sure you are in the right project:

```bash
oc project my-project
```

Create the ImageStream for GraphDB:

```bash
oc new-build --name graphdb --binary
```

Build the image on the DSRI and save it in the ImageStream:

```bash
oc start-build graphdb --from-dir=. --follow --wait
```

You can now use the **Ontotext GraphDB** template to deploy a GraphDB instance on DSRI. 

Use the name of the ImageStream when instantiating the template, you can check if the image was properly built in **Search** > Filter **Resources** for ImageStreams

:::tip Connect to the database

Use the service name as hostname to connect from another pod in the same project.

:::

<!-- 
### AllegroGraph

[AllegroGraph®](https://franz.com/agraph/) is a modern, high-performance, persistent graph database. It supports  SPARQL, RDFS++, and Prolog reasoning from numerous client applications. 

AllegroGraph has not been tested on DSRI yet, but it can be deployed on Kubernetes using Helm, cf. https://www.github.com/franzinc/agraph-examples/tree/master/clustering%2Fkubernetes%2Fmmr%2Fkubernetes-mmr.md



### Blazegraph triplestore

Use [lyrasis/blazegraph](https://hub.docker.com/r/lyrasis/blazegraph) Docker image (optimized for OpenShift).

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

### Start Neo4j

From [Neo4j community charts](https://artifacthub.io/packages/helm/equinor-charts/neo4j-community).

Add repository:

```bash
helm repo add equinor-charts https://equinor.github.io/helm-charts/charts/
helm repo update 
```

Start Neo4j in current project:

```bash
helm upgrade --install neo4j-community equinor-charts/neo4j-community --set acceptLicenseAgreement=yes --set neo4jPassword=mypassword
```

> Try setting extraVars: `--set extraVars='NEO4J_dbms_connector_bolt_address=0.0.0.0:7687'`

Go to the web UI, and add the following `env` variable to the YAML of the deployment created ([fix](https://stackoverflow.com/questions/59439263/getting-neo4j-running-on-openshift)):

``` yaml
env:
  - name: NEO4J_dbms_connector_bolt_address
    value: 0.0.0.0:7687
```

3 nodes cluster:

```bash
helm install mygraph RELEASE_URL --set acceptLicenseAgreement=yes --set neo4jPassword=mySecretPassword
```

Expose a route to Neo4j:

```bash
oc expose service neo4j-community-neo4j-community 
```

Manually expose a route to `neo4j-bolt` on port 7687 (click on the service, then create route)

:::info Bolt URL

Provide the bolt route URL, e.g. http://neo4j-bolt-ids-shared-project.app.dsri.unimaas.nl

Use the `neo4j` username to login.

:::

:::tip Use Neo4j Enterprise edition

Alternatively, Neo4j Enterprise edition is more recent: https://artifacthub.io/packages/helm/neo4j-helm/neo4j

```bash
helm install mygraph https://github.com/neo4j-contrib/neo4j-helm/releases/download/4.1.3-1/neo4j-4.1.3-1.tgz --set core.standalone=true --set acceptLicenseAgreement=yes --set neo4jPassword=mypassword
```

:::

-->
