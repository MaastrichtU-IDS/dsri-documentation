---
id: workflows-introduction
title: Choose a workflow engine
---

![Argo project](/dsri-documentation/img/argo-logo.png)

## Introduction

Multiple technologies are available to run workflows on OpenShift/Kubernetes clusters. Each has its strengths and weaknesses in different areas.

> The technology to use needs to be **chosen depending on your use-case**.

## Already implemented

### Argo

[Argo](https://argoproj.github.io/argo/) is a container native workflow engine for [Kubernetes](https://kubernetes.io/) supporting both [DAG](https://argoproj.github.io/docs/argo/examples/readme.html#dag) and [step based](https://argoproj.github.io/docs/argo/examples/readme.html#steps) workflows.

* Workflows easy to define using Kubernetes-like YAML files.
* Easy to define if your workflow is composed of Docker containers to run with arguments.

### Nextflow

* Developed by the genomic research scientific community.
* Don't need to create and use Docker container for Conda pipelines.

### CWL

* Developed by the genomic research scientific community.
* Good support for provenance description (export as RDF).
* Support on OpenShift still at its infancy (cwl-calrissian).
* Verbose workflow definition
* But provide a GUI to define the workflows (Rabix)

## To be implemented

### Apache Spark

Framework for Java, Python and Scala.

### Kubeflow

Optimized for Tensorflow workflows on Kubernetes.

* Write the pipelines using Python

### KubeGene

A turn-key genome sequencing workflow management framework.

https://kubegene.io/

[Workflow example](https://github.com/kubegene/kubegene/blob/master/example/simple-sample/simple-sample.yaml)

How to [define a tool](https://kubegene.io/docs/guides/tool/).

### Volcano

https://volcano.sh/

Run batch pipelines on Kubernetes. More a scheduler than a workflow engine. 

> Can be used to run Spark, Kubeflow or KubeGene workflows.

## Requests and questions

Feel free to contact us if you have any questions about running workflows on DSRI or to request the support of a new technology.