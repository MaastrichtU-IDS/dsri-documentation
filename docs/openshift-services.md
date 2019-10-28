---
id: openshift-services
title: Deploy services
---

Services available for the **Data Science Research Infrastructure**.

Feel free to propose new services using [pull requests](https://github.com/MaastrichtU-IDS/dsri-documentation/pulls) or request new ones by creating a [new issues](https://github.com/MaastrichtU-IDS/dsri-documentation/issues).

A service can be easily deployed services from a [Docker image](https://hub.docker.com/) .

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

Build using `oc` (in git repository)

```shell
oc new-build --name amalic-jupyterlab --binary
oc start-build amalic-jupyterlab --from-dir=. --follow --wait
oc new-app amalic-jupyterlab
oc expose svc/amalic-jupyterlab
```

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

### Start apache-drill

```shell
# Create pod
oc create -f d2s-pod-drill.yaml
# Create service for the pod
oc create -f d2s-service-drill.yaml
```

> **TODO:** try the [ZooKeeper / Apache Drill deployment ](https://github.com/Agirish/drill-containers/tree/master/kubernetes) for Kubernetes.

### Start postgres

> **TODO:** available in a catalog?

### Start Virtuoso

```shell
oc create -f d2s-pod-virtuoso.yaml
```

> **TODO:** use the [official OpenLink deployment](https://github.com/MaastrichtU-IDS/d2s-argo-workflows/blob/master/pods/d2s-pod-virtuoso7.yaml).

---

## Utility

### Filebrowser

[![filebrowser](/dsri-documentation/img/filebrowser_banner.svg)](https://filebrowser.xyz/)

Deploy a [filebrowser](https://hub.docker.com/r/filebrowser/filebrowser) over [MapR](https://mapr.com/) to access storage volumes (browse, download, create, delete files).

Go to https://app.dsri.unimaas.nl:8443/console/catalog > click `Deploy image`.

- Add to Project: `argo`

- Image Name:

  ```
  filebrowser/filebrowser 
  ```

- Give a name to your image: `filebrowser`

- Click `Deploy`

- Go to `argo` project > Click on latest deployment of the `filebrowser`

- Delete the automatically mounted volume, and add the persistent volume (`my-storage`). Should be on `/srv`

- Add route

> Access on http://d2s-filebrowser-argo.app.dsri.unimaas.nl/files/

> Credentials: `admin` / `admin`