---
id: deploy-database
title: Databases
---

## SQL databases

You can easily create a database from the templates available in the DSRI OpenShift web UI catalog:

<img src="/dsri-documentation/img/screenshot-databases.png" alt="Databases in catalog web UI" style={{maxWidth: '100%', maxHeight: '100%'}} />

You can connect to a database from another application in the same project by using the database service name as hostname:

<img src="/dsri-documentation/img/screenshot_database_service.png" alt="Databases in catalog web UI" style={{maxWidth: '100%', maxHeight: '100%'}} />

You can also use the `oc` CLI to get the services in your project:

```bash
oc get services
```

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

> Alternatively, MySQL databases can be started using Helm, see the [Helm documentation page](/dsri-documentation/docs/helm#install-a-helm-chart) for more details.

### Start PostgreSQL 🐘

Use the **Postgresql** template in the DSRI OpenShift web UI catalog.

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

### Start Apache Drill 🔩

:::info Contact us

Contact us to install Apache Drill

:::

Use the [ZooKeeper / Apache Drill deployment ](https://github.com/Agirish/drill-containers/tree/master/kubernetes) for Kubernetes from MapR.

## NoSQL databases

### MongoDB 🌿

[MongoDB](https://www.mongodb.com/) is a general purpose, document-based, distributed database built for modern application developers and for the cloud era. 

Use the **MongoDB** template in the DSRI OpenShift web UI catalog.

:::tip Connect to the database

Use the service name as hostname to connect from another pod in the same project.

:::

### Redis 🎲

[Redis](http://redis.io/) is an advanced key-value cache and store. It is often referred to as a data structure server since keys can contain  strings, hashes, lists, sets, sorted sets, bitmaps and hyperlog.

Use the **Redis** template in the DSRI OpenShift web UI catalog.

:::tip Connect to the database

Use the service name as hostname to connect from another pod in the same project.

:::

## Graph databases

### Ontotext GraphDB triplestore

Use the official DockerHub image if you have an enterprise license. Or [build](/dsri-documentation/guide-dockerfile-to-openshift) GraphDB free edition image from [graphdb-docker on GitHub](https://github.com/Ontotext-AD/graphdb-docker).

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

### Start Virtuoso triplestore

Use the [official OpenLink deployment](https://github.com/MaastrichtU-IDS/d2s-core/blob/master/argo/pods/d2s-pod-virtuoso7.yaml) and `anyuid` service account.

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