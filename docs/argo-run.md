---
id: argo-run
title: Run Argo workflows
---

[![Argo project](/dsri-documentation/img/argo-logo.png)](https://argoproj.github.io/argo/)

We will use examples from the [MaastrichtU-IDS/d2s-argo-workflows](https://github.com/MaastrichtU-IDS/d2s-argo-workflows) project.

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

> Config files can be provided using the `-f` arguments.

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
