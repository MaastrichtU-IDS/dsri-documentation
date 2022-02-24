---
id: workflows-introduction
title: Introduction to workflows
---

:::warning Work in progress

Running workflows on the DSRI is a work in progress. It usually requires some knowledge about how to orchestrate containers.

:::

## Introduction

Multiple technologies are available to run workflows on OpenShift/Kubernetes clusters. Each has its strengths and weaknesses in different areas.

:::caution Use-case dependant

The technology to use needs to be **chosen depending on your use-case**.

:::

## Current solutions on the DSRI

Those solutions can easily be deployed on the DSRI. Let

### GitHub Actions workflows

GitHub Actions allows you to define automatically containerized workflows through a simple YAML file hosted in your GitHub repository.

See the [page about GitHub Actions runners](/docs/workflows-github-actions) for more details, and to deploy runners on the DSRI.

### Apache Airflow

Airflow is a platform to programmatically author, schedule and monitor workflows, aka. DAGs (directed acyclic graphs).

See the [page about Airflow](/docs/workflows-airflow) for more details, and to deploy Airflow on the DSRI.

### Argo

[Argo](https://argoproj.github.io/argo/) is a container native workflow engine for [Kubernetes](https://kubernetes.io/) supporting both [DAG](https://argoproj.github.io/docs/argo/examples/readme.html#dag) and [step based](https://argoproj.github.io/docs/argo/examples/readme.html#steps) workflows.

* Workflows easy to define using Kubernetes-like YAML files.
* Easy to define if your workflow is composed of Docker containers to run with arguments.

:::info Contact us

[Contact us](/help) if you want to run Argo workflow on the DSRI

:::

## More options

Let us know if you are interested in deploying, and using, any of those workflows on the DSRI.

### Kubeflow

Optimized for Tensorflow workflows on Kubernetes.

Pipelines written in Python.

### Apache Airflow

Define, schedule and run workflows. 

Can be deployed with OpenDataHub, see also [this deployment for OpenShift](https://github.com/majordomusio/openshift-airflow).

See also: Airflow on [Kubernetes blog](https://kubernetes.io/blog/2018/06/28/airflow-on-kubernetes-part-1-a-different-kind-of-operator/), and Kubernetes in [Airflow documentation](https://airflow.apache.org/docs/stable/kubernetes.html).

### Volcano

Run batch pipelines on Kubernetes with [Volcano](https://volcano.sh/). 

* More a scheduler than a workflow engine. 

* Volcano can be used to run Spark, Kubeflow or KubeGene workflows.

### Nextflow

[Nextflow](https://www.nextflow.io/) has been developed by the genomic research scientific community and is built to run bioinformatics pipeline.

Define your workflow in a Bash script fashion, providing input, output and the command to run. Without the need to create and use Docker container for Conda pipelines.

### CWL

* Developed by the genomic research scientific community.
* Good support for provenance description (export as RDF).
* Support on OpenShift still in development
  * [Apache Airflow](https://airflow.apache.org/docs/stable/kubernetes.html)
  * [workflows-cwl](https://github.com/Duke-GCB/calrissian/)
* Propose a GUI to build the workflows: [Rabix Composer](https://rabix.io/)

### KubeGene

[KubeGene](https://kubegene.io/) is a turn-key genome sequencing workflow management framework.

See the [Workflow example](https://github.com/kubegene/kubegene/blob/master/example/simple-sample/simple-sample.yaml), and how to [define a tool](https://kubegene.io/docs/guides/tool/).

### Seldon

[Open-source platform](https://www.seldon.io/tech/) for rapidly deploying machine learning models on Kubernetes. Manage, serve and scale models built in any framework on Kubernetes.

:::info Contact us

Feel free to [contact us](/help) if you have any questions about running workflows on DSRI or to request the support of a new technology.

:::