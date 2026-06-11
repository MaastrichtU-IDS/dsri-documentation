---
id: deploy-database
title: Databases
---

The DSRI provides templates for several SQL, NoSQL, and graph databases. You can deploy them directly from the [DSRI Catalog](https://console-openshift-console.apps.dsri2.unimaas.nl/catalog) (make sure the **Templates** checkbox is checked) or via Helm.

Once a database is running, you can connect to it from another pod in the same project using the **database service name as hostname**. To list services in your project:

```bash
oc get services
```

## SQL databases

### PostgreSQL

Find and instantiate the **PostgreSQL** template in the DSRI Catalog.

To connect from another pod, first install the client:

```bash
apt-get update && apt-get install postgresql-client -y
```

Then connect using the service name:

```bash
psql -h postgresql-db -U postgres db
```

See the [dsri-demo repository](https://github.com/MaastrichtU-IDS/dsri-demo) for an example of accessing PostgreSQL from a Jupyter notebook.

### MySQL

Find and instantiate the **MySQL** template in the DSRI Catalog.

To connect from another pod, first install the client:

```bash
apt-get update && apt-get install mariadb-client -y
```

Then connect using the service name:

```bash
mysql -h example-mysql -p
```

See the [dsri-demo repository](https://github.com/MaastrichtU-IDS/dsri-demo) for an example of accessing MySQL from a Jupyter notebook.

:::tip

MySQL can also be deployed using Helm. See the [Helm documentation](/docs/helm#install-a-helm-chart) for details.

:::

## NoSQL databases

### MongoDB

[MongoDB](https://www.mongodb.com/) is a document-based distributed database. It can be deployed via Helm using the Bitnami chart.

First, install the Helm client as described in the [Helm documentation](/docs/helm). Then add the Bitnami repository:

```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
```

Deploy MongoDB:

```bash
helm install my-mongodb bitnami/mongodb
```

To connect from within the cluster (replace `my-project` with your project name):

```bash
export MONGODB_ROOT_PASSWORD=$(oc get secret --namespace my-project my-mongodb -o jsonpath="{.data.mongodb-root-password}" | base64 -d)

oc run --namespace my-project my-mongodb-client --rm --tty -i --restart='Never' \
  --env="MONGODB_ROOT_PASSWORD=$MONGODB_ROOT_PASSWORD" \
  --image docker.io/bitnami/mongodb:8.0.4-debian-12-r0 --command -- bash
```

Then connect to the database:

```bash
export MONGODB_ROOT_USER="root"
mongosh admin --host "my-mongodb" --authenticationDatabase admin \
  --username $MONGODB_ROOT_USER --password $MONGODB_ROOT_PASSWORD
```

To connect from outside the cluster:

```bash
oc port-forward --namespace my-project svc/my-mongodb 27017:27017 &
mongosh --host 127.0.0.1 --authenticationDatabase admin \
  --username $MONGODB_ROOT_USER --password $MONGODB_ROOT_PASSWORD
```

### Redis

[Redis](http://redis.io/) is a key-value cache and store, often used as a data structure server.

Find and instantiate the **Redis** template in the DSRI Catalog. Connect from another pod in the same project using the service name as hostname.

## Graph databases

### OpenLink Virtuoso

Find and instantiate the **Virtuoso triplestore** template in the DSRI Catalog. The deployment is based on the [open source version of Virtuoso](https://hub.docker.com/r/openlink/virtuoso-opensource-7).

Connect from another pod in the same project using the service name as hostname.

### Ontotext GraphDB

Use the official DockerHub image if you have an enterprise license. For the free edition, build the image from [graphdb-docker on GitHub](https://github.com/Ontotext-AD/graphdb-docker).

Download and unzip the repository, then navigate to the folder:

```bash
cd graphdb-docker-master
```

Make sure you are in the right project:

```bash
oc project my-project
```

Create an ImageStream and build the image on the DSRI:

```bash
oc new-build --name graphdb --binary
oc start-build graphdb --from-dir=. --follow --wait
```

Then find and instantiate the **Ontotext GraphDB** template in the DSRI Catalog, using the name of the ImageStream you just created. You can verify the image was built correctly under **Search** > **Resources** > **ImageStreams**.

Connect from another pod in the same project using the service name as hostname.