---
id: introduction
title: Introduction
slug: /
---

The Data Science Research Infrastructure is an [OpenShift](https://www.openshift.com/) cluster based on the [MapR](https://mapr.com/) Distributed File System, using [Kubernetes](https://kubernetes.io/) containers orchestration.

The DSRI provides a graphical user interface to easily run and manage services ([OKD](https://www.okd.io/), the Open Source version of [OpenShift](https://www.openshift.com/)). 

## Getting started

### What can be done on the DSRI ✔️

Run Data Science applications in [Docker container 🐳](https://www.docker.com/) on the [UM network](https://vpn.maastrichtuniversity.nl/), such as:

* Multiple flavors of [JupyterLab](https://github.com/jupyter/docker-stacks) (scipy, tensorflow, all-spark, and more)
* JupyterHub with GitHub authentication
* RStudio, with a complementary Shiny server
* VisualStudio [Code server](https://github.com/cdr/code-server)
* Tensorflow or PyTorch on Nvidia GPU (with JupyterLab or VisualStudio Code)
* SQL databases (MariaDB, MySQL, PostgreSQL)
* NoSQL databases (MongoDB, Redis)
* Graph databases (GraphDB, Blazegraph, Virtuoso)
* Apache Flink cluster for Streaming applications
* Or any program installed in a Docker image!

The data will be safely stored in persistent volumes.

For user already familiar with those concepts [workflow orchestration tools](/dsri-documentation/docs/workflows-introduction) can be used, such as [Argo workflows](/dsri-documentation/docs/workflows-argo), [Nextflow](/dsri-documentation/docs/workflows-nextflow) or [CWL Calrissian](/dsri-documentation/docs/workflows-cwl).

### What cannot be done ❌

* Since DSRI can only be accessed when on the physical UM network or using the [UM VPN](https://vpn.maastrichtuniversity.nl/), deployed services will not be available on the public Internet 🔒
* All activities must be legal in basis. You must closely examine and abide by the terms and conditions of any data, software, or web service that you use as part of your work 📜

:::info

If you are working at Maastricht University, **see [this page](https://maastrichtu-ids.github.io/dsri-documentation/docs/access-dsri) to request an account**, and run your services on the DSRI.

:::

## The DSRI specifications

### Software

* **[OKD 3.11](https://www.okd.io/)** (Open Source version of [RedHat OpenShift](https://www.openshift.com/)) to run services and jobs.
  * We are working on upgrading to [OKD 4.5](https://github.com/openshift/okd/releases)
* **[HP MapR](https://mapr.com/)** for distributed storage.
  * [RedHat Ceph storage](https://www.redhat.com/fr/technologies/storage/ceph) is also considered

### Hardware

* 16 CPU nodes

|                | RAM (GB) | CPU (cores) | Storage (TB) |
| -------------- | -------- | ----------- | ------------ |
| Node capacity  | 512 GB   | 128 cores   | 120 TB       |
| Total capacity | 8 192 GB | 2 048 cores | 1 920 TB     |

* 1 GPU node: **Nvidia DGX1** 8x Tesla V100 - 32GB GPU

|                   | GPUs | RAM (GB) | CPU (cores) |
| ----------------- | ---- | -------- | ----------- |
| GPU node capacity | 8    | 528 GB   | 80 cores    |

<img src="/dsri-documentation/img/DSRI_infrastructure_architecture_overview.png" alt="DSRI infrastructure " style={{maxWidth: '100%', maxHeight: '100%'}} />

## Learn more about DSRI

See the following presentation about the Data Science Research Infrastructure 

<a href="/website/static/resource/2020-11-DSRI-Community-Event.pdf" target="_blank"><img src="/website/static/resource/DSRI-community-event.png" 
alt="DSRI Nov 2020 Community Event Presentation" /></a>





