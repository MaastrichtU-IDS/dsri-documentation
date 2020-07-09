---
id: introduction
title: Introduction
---

The Data Science Research Infrastructure is an [OpenShift](https://www.openshift.com/) cluster based on the [MapR](https://mapr.com/) Distributed FileSystem, using [Kubernetes](https://kubernetes.io/) containers orchestration.

The DSRI provides a graphical user interface to easily run and manage services ([OKD](https://www.okd.io/), the Open Source version of [OpenShift](https://www.openshift.com/)). 

## What can be done on the DSRI?

Short answer is anything running in a Docker container 🐳 that does not need to be accessed from outside the UM network (or UM VPN) 🔒

Here a longer answer:

**What can be done easily on the DSRI ✔️**

* [Start any Docker image](/dsri-documentation/docs/deploy-from-dockerhub) from the web UI
* [Start a simple Jupyter Notebook or RStudio](https://maastrichtu-ids.github.io/dsri-documentation/docs/deploy-jupyter) through the web UI
* Deploy TensorFlow or PyTorch [on GPUs](https://maastrichtu-ids.github.io/dsri-documentation/docs/deploy-on-gpu) (8 Nvidia DGX-1 GPU cores are available)
* Start a [Apache Spark cluster](/dsri-documentation/docs/deploy-spark) with multiples nodes, and a Jupyter Notebook from the web UI
* [Request a persistent storage 📬](mailto:dsri-support-l@maastrichtuniversity.nl) to store data for your computational project (from GB to a few TB).

**What can be done with extra configuration ⌨️**

* Use [workflow orchestration tools](/dsri-documentation/docs/workflows-introduction), such as [Argo workflows](/dsri-documentation/docs/workflows-argo), [Nextflow](/dsri-documentation/docs/workflows-nextflow) or [CWL Calrissian](/dsri-documentation/docs/cwl-calrissian).
* Run [OpenMPI](https://maastrichtu-ids.github.io/dsri-documentation/docs/deploy-services#openmpi) jobs

**What cannot be done ❌**

* You cannot deploy services on the public Internet, the DSRI and services deployed on the **DSRI can only be accessed when on the UM network or using the UM VPN**.

[Contact us 📬](mailto:dsri-support-l@maastrichtuniversity.nl) to request an account, and run your services on the DSRI from the UM network.

## The DSRI specifications

### Software

* **[OKD 3.11](https://www.okd.io/)** (Open Source version of RedHat OpenShift) to run services and jobs.
* **[MapR](https://mapr.com/)** for distributed storage.

### Hardware

* 15 CPU nodes

|                | RAM (GB) | CPU (cores) | Storage (TB) |
| -------------- | -------- | ----------- | ------------ |
| Node capacity  | 512 GB   | 64 cores    | 120 TB       |
| Total capacity | 7 680 GB | 960 cores   | 1800 TB      |

* 1 GPU node
  * Nvidia DGX1: **8x** Tesla V100 - 32GB GPU

## History of the DSRI

See the following presentation about the Data Science Research Infrastructure origins and background:

* [DSRI Story presentation](/dsri-documentation/resource/dsri_story_201907.pdf) 
* [DSRI Workshop presentation](/dsri-documentation/resource/dsri_openshift_workshop.pdf)