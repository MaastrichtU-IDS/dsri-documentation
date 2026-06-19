---
id: introduction
title: Introduction
slug: /
---

The **DSRI** (*Data Science Research Infrastructure*) is a cluster of servers for deploying workspaces and applications for data science. Workspaces run in Docker containers orchestrated by Kubernetes and are accessible via an auto-generated URL.

:::info Research data management

Not sure where to store your data or whether it can be processed on the DSRI? Check these resources first:
- **[Storage Finder](https://library.maastrichtuniversity.nl/research/rdm/services-tools-training/storage-finder-tool/)** - find the right storage solution for your research data.
- **[Research Data Compliance Self Assessment](https://maastrichtu-library.github.io/rdm-compliance-decision-tool/)** - understand what compliance steps apply to your research data.

:::

## Using the DSRI

### ✅ What can be done

* Gain access to more computing resources (memory and CPUs), which enables you to load larger amount of data, or use more threads for parallelized tasks
* Run jobs that take a long time to complete
* Deploy any database or service you need, and connect to it from your workspace easily
* Book and start a workspace that uses one of our GPUs
* The DSRI proposes a number of popular workspaces to work with data:
    * Multiple flavors of **JupyterLab** (scipy, tensorflow, all-spark, and more)
    * **VisualStudio Code** server (also available within the JupyterLab workspaces)
    * **RStudio**, with a complementary Shiny server
    * **Matlab**
    * **Ubuntu** Desktop (available on demand)
* You can then install anything you want in your workspace using `conda`, `pip`, or `apt`.

<!--

an [OKD 4.11](https://www.okd.io/) cluster, the open source version of [OpenShift](https://www.openshift.com/), using [RedHat Ceph Storage](https://www.redhat.com/en/technologies/storage/ceph).

The DSRI provides a graphical user interface on top of the [Kubernetes](https://kubernetes.io/) containers orchestration to easily deploy and manage workspaces and services. 

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

-->

<!--

:::note Workflows

For user already familiar with those concepts [workflow orchestration tools](/docs/workflows-introduction) can be installed, such as [Argo workflows](/docs/workflows-argo), [Nextflow](/docs/workflows-nextflow) or [CWL Calrissian](/docs/workflows-cwl).

:::

-->

### ❌ What cannot be done

* Since DSRI can only be accessed when using the [UM VPN](https://vpn.maastrichtuniversity.nl/), deployed services will not be available on the public Internet 
* All activities must be legal in nature. You must closely examine and abide by the terms and conditions of any data, software, or web service that you use as part of your work 
* You cannot reach data or servers hosted at Maastricht University from the DSRI by default. You will need to request access in advance [here ](/docs/prepare-project-for-dsri#request-access-to-internal-um-servers)
* Right now it is not possible to reach the central UM fileservices (MFS)


:::info Request an account

If you are working at Maastricht University, you can **[request an account](https://servicedesk.icts.maastrichtuniversity.nl/tas/public/ssp/content/serviceflow?unid=09acae9cdf454968bc94ad125b1f8e76&from=436967a9-738c-4112-b3f6-240a9847118e&openedFromService=true)**, and run your services on the DSRI.

:::

:::caution Data storage

**DSRI is a computing infrastructure**, built and used to run data science workloads. DSRI stores data in a persistent manner, but all data stored on the DSRI is susceptible to be altered by the workloads you are running, and we cannot guarantee its immutability.

**Always keep a safe copy of your data outside the DSRI**. And don't rely on the DSRI for long term storage.

:::

## Overview of the DSRI architecture

<img src="/img/dsri_simplified_overview.png" alt="DSRI in a nutshell " style={{maxWidth: '100%', maxHeight: '100%'}} />



