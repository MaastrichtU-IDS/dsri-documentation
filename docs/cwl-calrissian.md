---
id: cwl-calrissian
title: Run CWL workflows
---

[![BioLink model](/dsri-documentation/img/biolink-logo.png)](https://github.com/MaastrichtU-IDS/d2s-transform-biolink)

## Install CWL Calrissian

```shell
oc create role pod-manager-role --verb=create,delete,list,watch --resource=pods
oc create role log-reader-role --verb=get,list --resource=pods/log
oc create rolebinding pod-manager-default-binding --role=pod-manager-role --serviceaccount=test-vincent:default
oc create rolebinding log-reader-default-binding --role=log-reader-role --serviceaccount=test-vincent:default
```

## Start pod

You might need to give permissions: `chmod -R 777 /calrissian`

```shell
oc create -f run-cwl-calrissian.yaml
```

## Delete created pod

```shell
oc delete -f run-cwl-calrissian.yaml
```

---

## Clone the repository

```shell
git clone --recursive https://github.com/MaastrichtU-IDS/d2s-transform-biolink.git
cd d2s-transform-biolink
```

---

## Workflow to convert XML to RDF

### Steps-based workflow

```shell
argo submit d2s-argo-workflows/d2s-workflow-transform-xml.yaml \
  -f support/config/config-transform-xml-drugbank.yml
```

> *Reminder:* you need first to authenticate to the [OpenShift cluster](https://app.dsri.unimaas.nl:8443/) using `oc login` .

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

![Argo project](/dsri-documentation/img/argo-logo.png)