---
id: argo-run
title: Run Argo workflows
---

![Argo project](/dsri-documentation/img/argo-logo.png)

## Run hello world

```shell
argo submit --watch https://raw.githubusercontent.com/argoproj/argo/master/examples/hello-world.yaml
```

## Workflows to convert structured data to RDF

We will use examples from the [MaastrichtU-IDS/d2s-argo-workflows](https://github.com/MaastrichtU-IDS/d2s-argo-workflows) project.

### Clone the repository

```shell
git clone --recursive https://github.com/MaastrichtU-IDS/d2s-transform-template.git
cd d2s-transform-template
```

[Authenticate to the OpenShift cluster](/dsri-documentation/docs/openshift-login) using `oc login` .

### Workflow to convert XML files to RDF

* Steps-based workflow for XML files

```shell
argo submit d2s-argo-workflows/d2s-workflow-transform-xml.yaml \
  -f support/config/config-transform-xml-drugbank.yml
```

> Config files can be provided using the `-f` arguments, but are not necessary.

* DAG workflow  for XML files

```shell
argo submit d2s-argo-workflows/d2s-workflow-transform-xml-dag.yaml \
  -f support/config/config-transform-xml-drugbank.yml
```

### Workflow to convert CSV files to RDF

* Steps-based workflow for CSV files

```shell
argo submit d2s-argo-workflows/d2s-workflow-transform-csv.yaml \
  -f support/config/config-transform-csv-stitch.yml
```

* DAG workflow for CSV files

```shell
argo submit d2s-argo-workflows/d2s-workflow-transform-csv-dag.yaml \
  -f support/config/config-transform-csv-stitch.yml
```

> Try this to solve steps services IP: `{{steps.nginx-server.pod-ip}}`

