---
id: workflows-introduction
title: Introduction to Workflows
---

Multiple technologies are available to run workflows on OpenShift/Kubernetes clusters. The right choice depends on your use-case, team setup, and the type of pipeline you need to run.

:::caution Use-case dependent

The technology to use needs to be **chosen depending on your use-case**. Use the table below to get an overview, then follow the links for deployment instructions.

:::

## Overview

| Tool | Best for | Docs |
|---|---|---|---|
| **GitHub Actions** | CI/CD, automated testing, code pipelines | [Guide](/docs/workflows-github-actions) |
| **Apache Airflow** | Scheduling, DAG-based data pipelines | [Guide](/docs/workflows-airflow) |
| **Nextflow** | Bioinformatics, HPC-style pipelines | [Guide](/docs/workflows-nextflow) |
| **CWL** | Portable scientific workflows, provenance | [Guide](/docs/workflows-cwl) |
| **Kubeflow** | ML workflows, Tensorflow pipelines | [Contact us](mailto:rcs-ub@maastrichtuniversity.nl) |
| **Volcano** | Batch jobs, Spark, HPC scheduling | [Contact us](mailto:rcs-ub@maastrichtuniversity.nl)  |
| **Seldon** | Serving and scaling ML models | [Contact us](mailto:rcs-ub@maastrichtuniversity.nl)  |


## Supported solutions

These tools are available and documented for use on the DSRI.

### GitHub Actions

GitHub Actions allows you to define containerized workflows through a simple YAML file hosted in your GitHub repository. Runners can be deployed directly on the DSRI, enabling you to run your CI/CD pipelines on the cluster.

See the [GitHub Actions runners page](/docs/workflows-github-actions) for deployment instructions.

### Apache Airflow

Airflow is a platform to programmatically author, schedule, and monitor workflows as DAGs (directed acyclic graphs). It is well suited for data engineering pipelines that need to run on a schedule.

See the [Airflow page](/docs/workflows-airflow) for deployment instructions.

### Nextflow

[Nextflow](https://www.nextflow.io/) was developed by the genomics research community and is designed to run bioinformatics pipelines. Workflows are defined in a Bash-like scripting language, with built-in support for Conda and Docker containers.

See the [Nextflow page](/docs/workflows-nextflow) for deployment instructions.

### CWL (Common Workflow Language)

[CWL](https://www.commonwl.org/) is a standard for describing analysis workflows, with strong support for provenance and reproducibility. Support on OpenShift is still experimental.

See the [CWL page](/docs/workflows-cwl) for more details.

## Other options

The following tools are not yet deployed on DSRI but can be made available on request.

### Kubeflow

Optimized for machine learning workflows on Kubernetes, with native support for Tensorflow pipelines. Pipelines are written in Python.

### Volcano

[Volcano](https://volcano.sh/) is a batch scheduling system for Kubernetes. It is more of a scheduler than a workflow engine, and can be used to run Spark, Kubeflow, or KubeGene workloads.

### Seldon

[Seldon](https://www.seldon.io/) is an open-source platform for deploying, managing, and scaling machine learning models on Kubernetes. It supports models built in any framework.

### KubeGene

[KubeGene](https://kubegene.io/) is a workflow management framework designed specifically for genome sequencing pipelines.

:::info Contact us

Feel free to [contact us](mailto:rcs-ub@maastrichtuniversity.nl), if you have any questions about running workflows on DSRI or to request support for a new tool.

:::
