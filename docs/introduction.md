---
id: introduction
title: Introduction
---

The Data Science Research Infrastructure is an [OpenShift](https://www.openshift.com/) cluster based on the [MapR](https://mapr.com/) Distributed File System, using [Kubernetes](https://kubernetes.io/) containers orchestration.

The DSRI provides a graphical user interface to easily run and manage services ([OKD](https://www.okd.io/), the Open Source version of [OpenShift](https://www.openshift.com/)). 

## What can be done on the DSRI?

Any service that: 

* runs in a Docker container 🐳 (Any code can be easily executed in a Docker container (apart from some proprietary software)
* does not need to be accessed from outside the UM network (or the UM VPN) 🔒

In more details:

**What can be done easily on the DSRI ✔️**

* [Start any Docker image](https://maastrichtu-ids.github.io/dsri-documentation/docs/deploy-from-docker) from the web UI
* [Start a simple Jupyter Notebook or RStudio](https://maastrichtu-ids.github.io/dsri-documentation/docs/deploy-jupyter) through the web UI
* Deploy TensorFlow or PyTorch [on GPUs](https://maastrichtu-ids.github.io/dsri-documentation/docs/deploy-on-gpu) (8 Nvidia DGX-1 GPU cores are available)
* Start a [Apache Spark cluster](/dsri-documentation/docs/deploy-spark) with multiples nodes, and a Jupyter Notebook from the web UI
* [Request a persistent storage 📬](mailto:dsri-support-l@maastrichtuniversity.nl) to store data for your computational project (from GB to a few TB).

**What can be done with extra configuration ⌨️**

* Use [workflow orchestration tools](/dsri-documentation/docs/workflows-introduction), such as [Argo workflows](/dsri-documentation/docs/workflows-argo), [Nextflow](/dsri-documentation/docs/workflows-nextflow) or [CWL Calrissian](/dsri-documentation/docs/cwl-calrissian).
* Run [OpenMPI](https://maastrichtu-ids.github.io/dsri-documentation/docs/deploy-services#openmpi) jobs

**What cannot be done ❌**

* Since DSRI can only be accessed when on the physical UM network or using the UM VPN, deployed services will not be available on the public Internet.
* All activities must be legal in basis. You must closely examine and abide by the terms and conditions of any data, software, or web service that you use as part of your work. 

**Getting started**
See [this page](https://maastrichtu-ids.github.io/dsri-documentation/docs/access-dsri) to request an account, and run your services on the DSRI from the UM network.

## The DSRI specifications

### Software

* **[OKD 3.11](https://www.okd.io/)** (Open Source version of [RedHat OpenShift](https://www.openshift.com/)) to run services and jobs.
  * Working on upgrading to [OKD 4.5](https://github.com/openshift/okd/releases)
* **[HP MapR](https://mapr.com/)** for distributed storage.
  * [RedHat Ceph storage](https://www.redhat.com/fr/technologies/storage/ceph) also considered

### Hardware

* 16 CPU nodes

|                | RAM (GB) | CPU (cores) | Storage (TB) |
| -------------- | -------- | ----------- | ------------ |
| Node capacity  | 512 GB   | 64 cores    | 120 TB       |
| Total capacity | 8 192 GB | 1 024 cores | 1 920 TB     |

* 1 GPU node
  * Nvidia DGX1: **8x** Tesla V100 - 32GB GPU

## History of the DSRI

See the following presentation about the Data Science Research Infrastructure origins and background:

* [DSRI Story presentation](/dsri-documentation/resource/dsri_story_201907.pdf) 
* [DSRI Workshop presentation](/dsri-documentation/resource/dsri_openshift_workshop.pdf)
