---
id: deploy-database
title: Databases
---

The DSRI provides templates for several SQL, NoSQL, and graph databases. You can deploy them directly from the [DSRI Catalog](https://console.dsri.unimaas.nl/catalog/) or via Helm.

Once a database is running, you can connect to it from another pod in the same project using the **database service name as hostname**. To list services in your project:

```bash
oc get services
```

:::info
Our cluster enforces mandatory CPU, memory, and ephemeral-storage requests/limits on every pod. All templates below already account for this, if you create a custom pod yourself (e.g. a test/client pod), remember to set these explicitly or it will be rejected.
:::

## SQL databases

### PostgreSQL

Find and instantiate the **PostgreSQL** template in the DSRI Catalog. Username and password are auto-generated if left blank when instantiating.

To connect from another pod, first install the client:

```bash
apt-get update && apt-get install postgresql-client -y
```

Retrieve the generated credentials:

```bash
oc get secret postgresql -o jsonpath='{.data.database-user}' | base64 -d; echo
oc get secret postgresql -o jsonpath='{.data.database-password}' | base64 -d; echo
oc get secret postgresql -o jsonpath='{.data.database-name}' | base64 -d; echo
```

Then connect using the service name:

```bash
psql -h postgresql -U <username> -d <database-name>
```

See the [dsri-demo repository](https://github.com/MaastrichtU-IDS/dsri-demo) for an example of accessing PostgreSQL from a Jupyter notebook.

### MySQL

Find and instantiate the **MySQL** template in the DSRI Catalog.

To connect from another pod, first install the client:

```bash
apt-get update && apt-get install mariadb-client -y
```

Retrieve the generated credentials:

```bash
oc get secret mysql -o jsonpath='{.data.database-user}' | base64 -d; echo
oc get secret mysql -o jsonpath='{.data.database-password}' | base64 -d; echo
oc get secret mysql -o jsonpath='{.data.database-name}' | base64 -d; echo
```

Then connect using the service name:

```bash
mysql -h mysql -u <username> -p<password> <database-name>
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

Retrieve the root password:

```bash
export MONGODB_ROOT_PASSWORD=$(oc get secret --namespace my-project my-mongodb -o jsonpath="{.data.mongodb-root-password}" | base64 -d)
```

To connect from within the cluster, create a temporary MongoDB client pod (replace `my-project` with your project name):

```bash
oc run --namespace my-project my-mongodb-client --rm --tty -i --restart='Never' \
  --env="MONGODB_ROOT_PASSWORD=$MONGODB_ROOT_PASSWORD" \
  --image registry-1.docker.io/bitnami/mongodb:latest --command -- bash
```

Then connect to the database:

```bash
mongosh admin --host "my-mongodb" --authenticationDatabase admin \
  -u root -p $MONGODB_ROOT_PASSWORD
```

To connect from outside the cluster:

```bash
oc port-forward --namespace my-project svc/my-mongodb 27017:27017 &
mongosh --host 127.0.0.1 --authenticationDatabase admin \
  -u root -p $MONGODB_ROOT_PASSWORD
```

### Redis

[Redis](http://redis.io/) is a key-value cache and store, often used as a data structure server.

Find and instantiate the **Redis** template in the DSRI Catalog. A connection password is auto-generated for you.

Retrieve the password and connect from another pod in the same project using the service name as hostname:

```bash
export REDIS_PASSWORD=$(oc get secret redis -o jsonpath="{.data.database-password}" | base64 -d)

redis-cli -h redis -a $REDIS_PASSWORD ping
```

A successful connection returns `PONG`.

## Graph databases

### OpenLink Virtuoso

Find and instantiate the **Virtuoso triplestore** template in the DSRI Catalog. The deployment is based on the [open source version of Virtuoso](https://hub.docker.com/r/openlink/virtuoso-opensource-7), and runs on port `8890`.

Connect from another pod in the same project using the service name as hostname:

```bash
curl -I http://virtuoso:8890/sparql
```

A successful connection returns `HTTP/1.1 200 OK`.

### Ontotext GraphDB

Find and instantiate the **Ontotext GraphDB** template in the DSRI Catalog. No manual build required. The template uses a pre-built image ready to deploy directly.

:::info
If you have an enterprise license, you can point the template's image parameter at the official DockerHub image instead. For the free edition, note that as of GraphDB 11, Ontotext requires requesting a separate free license before the database will start: see the [GraphDB Free download page](https://www.ontotext.com/products/graphdb/) for details. The image used by default in this template predates that requirement.
:::

Connect from another pod in the same project using the service name as hostname:

```bash
curl -I http://graphdb:7200/
```