---
id: argo-run
title: Run Argo workflows
---

[![BioLink model](/dsri-documentation/img/biolink-logo.png)](https://github.com/MaastrichtU-IDS/d2s-transform-biolink)

We will use [examples](https://github.com/MaastrichtU-IDS/d2s-transform-biolink/tree/master/support/config) from the [**d2s-transform-biolink**](https://github.com/MaastrichtU-IDS/d2s-transform-biolink) project.

## Install Argo

```shell
brew install argoproj/tap/argo

oc apply -n test-vincent -f https://raw.githubusercontent.com/MaastrichtU-IDS/argo/master/manifests/namespace-install.yaml

# Get cluster roles
oc describe clusterrole.rbac | less

# Config service account, see link below
oc create rolebinding default-admin --clusterrole=admin --serviceaccount=default:default

argo submit --watch https://raw.githubusercontent.com/argoproj/argo/master/examples/hello-world.yaml
```

> [Configure service account](https://github.com/argoproj/argo/blob/master/demo.md#3-configure-the-service-account-to-run-workflows).

---

## Clone the repository

```shell
git clone --recursive https://github.com/MaastrichtU-IDS/d2s-transform-template.git
cd d2s-transform-template
```

---

## Workflow to convert XML to RDF

Authenticate to the [OpenShift cluster](https://app.dsri.unimaas.nl:8443/) using `oc login` .

### Steps-based workflow

```shell
argo submit d2s-argo-workflows/d2s-workflow-transform-xml.yaml \
  -f support/config/config-transform-xml-drugbank.yml
```

### DAG workflow

```shell
argo submit d2s-argo-workflows/d2s-workflow-transform-xml-dag.yaml \
  -f support/config/config-transform-xml-drugbank.yml
```

---

## Workflow to convert CSV to RDF

### Steps-based workflow

```shell
argo submit d2s-argo-workflows/d2s-workflow-transform-csv.yaml \
  -f support/config/config-transform-csv-stitch.yml
```

### DAG workflow

```shell
argo submit d2s-argo-workflows/d2s-workflow-transform-csv-dag.yaml \
  -f support/config/config-transform-csv-stitch.yml
```

> Try this to solve steps services IP: `{{steps.nginx-server.pod-ip}}`

![Argo project](/dsri-documentation/img/argo-logo.png)