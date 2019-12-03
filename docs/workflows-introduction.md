---
id: workflows-introduction
title: Choose a workflow engine
---

![Argo project](/dsri-documentation/img/argo-logo.png)

## Introduction

Multiple technologies are available to run workflows on OpenShift/Kubernetes clusters. Each has its strengths and weaknesses.

The technology to use needs to be chosen depending on the use-case.

## Already implemented

### Argo

[Argo](https://argoproj.github.io/argo/) is a container native workflow engine for [Kubernetes](https://kubernetes.io/) supporting both [DAG](https://argoproj.github.io/docs/argo/examples/readme.html#dag) and [step based](https://argoproj.github.io/docs/argo/examples/readme.html#steps) workflows.

* Workflows easy to define using Kubernetes-like YAML files.

### Nextflow

* Don't need to create and use Docker container for Conda pipelines.

### CWL

* Verbose workflow definition
* But provide a GUI to define the workflows (Rabix)
* Good support for provenance description (export as RDF).
* Support on OpenShift still at its infancy (cwl-calrissian)

## To be implemented

### Apache Spark

Framework for Java, Python and Scala.

### Kubeflow

Optimized for Tensorflow workflows

* Write the pipelines using Python

### Vulcano

Run batch pipelines on Kubernetes.

## Requests and questions

Feel free to contact us if you have any questions about running workflows on DSRI or to request the support of a new technology.