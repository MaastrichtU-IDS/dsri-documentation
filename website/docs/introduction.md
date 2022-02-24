---
id: introduction
title: Introduction
slug: /
---

The Data Science Research Infrastructure is an [OKD 4.6](https://www.okd.io/) cluster, the open source version of [OpenShift](https://www.openshift.com/), using [RedHat Ceph Storage](https://www.redhat.com/en/technologies/storage/ceph).

The DSRI provides a graphical user interface on top of the [Kubernetes](https://kubernetes.io/) containers orchestration to easily deploy and manage workspaces and services. 

## Getting started

### What can be done on the DSRI ✔️

The DSRI works best when you work with code, scripts to run, and web applications. Especially if they require an important amount of computing resources. If you work on desktop softwares with graphical user interface, such as Matlab or Spyder, the installation will be much more complex, and usually using your laptop will be more comfortable, stable and reactive than accessing a desktop interface on a remote server through the UM VPN.

Here is a non-exhaustive list of some of the services that can easily be deployed on the DSRI:

* Multiple flavors of [JupyterLab](https://github.com/jupyter/docker-stacks) (scipy, tensorflow, all-spark, and more)
* JupyterHub with GitHub authentication
* RStudio, with a complementary Shiny server
* VisualStudio [Code server](https://github.com/cdr/code-server)
* Tensorflow or PyTorch on Nvidia GPU (with JupyterLab or VisualStudio Code)

* SQL databases (MariaDB, MySQL, PostgreSQL)
* NoSQL databases (MongoDB, Redis)
* Graph databases (GraphDB, Blazegraph, Virtuoso)
* Apache Flink cluster for streaming applications
* Apache Spark cluster for distributed computing
* Or any program installed in a Docker image!

:::caution Data storage

**DSRI is a computing infrastructure**, built and used to run data science workloads. DSRI stores data in a persistent manner, but all data stored on the DSRI is susceptible to be altered by the workloads you are running, and we cannot guarantee its immutability.

**Always keep a safe copy of your data outside the DSRI**. And don't rely on the DSRI for long term storage.

:::

<!--

:::note Workflows

For user already familiar with those concepts [workflow orchestration tools](/docs/workflows-introduction) can be installed, such as [Argo workflows](/docs/workflows-argo), [Nextflow](/docs/workflows-nextflow) or [CWL Calrissian](/docs/workflows-cwl).

:::

-->

### What cannot be done ❌

* Since DSRI can only be accessed when on the physical UM network or using the [UM VPN](https://vpn.maastrichtuniversity.nl/), deployed services will not be available on the public Internet 🔒
* All activities must be legal in basis. You must closely examine and abide by the terms and conditions of any data, software, or web service that you use as part of your work 📜

:::info Request an account

If you are working at Maastricht University, **see [this page](https://maastrichtu-ids.github.io/dsri-documentation/docs/access-dsri) to request an account**, and run your services on the DSRI.

:::

## The DSRI architecture

Here is a diagram providing a simplified explanation of how the DSRI works, using popular data science applications as examples (JupyterLab, RStudio, VSCode server)

<img src="/dsri-documentation/img/dsri_simplified_overview.png" alt="DSRI in a nutshell " style={{maxWidth: '100%', maxHeight: '100%'}} />

## The DSRI specifications

### Software

* [**OKD 4.6**](https://www.okd.io/) (Open Source version of [RedHat OpenShift](https://www.openshift.com/)) to run services and jobs.
* [**RedHat Ceph storage**](https://www.redhat.com/fr/technologies/storage/ceph) for distributed storage.

### Hardware

* 16 CPU nodes

|                | RAM (GB) | CPU (cores)            | Storage (TB) |
| -------------- | -------- | ---------------------- | ------------ |
| Node capacity  | 512 GB   | 64 cores (128 threads) | 120 TB       |
| Total capacity | 8 192 GB | 1 024 cores            | 1 920 TB     |

* 1 GPU node: **Nvidia DGX1** 8x Tesla V100 - 32GB GPU

|                   | GPUs | RAM (GB) | CPU (cores) |
| ----------------- | ---- | -------- | ----------- |
| GPU node capacity | 8    | 528 GB   | 40 cores    |

<img src="/dsri-documentation/img/DSRI_infrastructure_architecture_overview.png" alt="DSRI infrastructure " style={{maxWidth: '100%', maxHeight: '100%'}} />

## Learn more about DSRI

See the following presentation about the Data Science Research Infrastructure 

<a href="/dsri-documentation/resource/2021-04-DSRI-Community-Event.pdf" target="_blank" rel="noopener noreferrer">
 <img src="/dsri-documentation/resource/DSRI-community-event.png" style={{maxWidth: '100%', maxHeight: '100%'}} alt="DSRI April 2021 Community Event Presentation" />
</a>

