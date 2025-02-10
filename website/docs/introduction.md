---
id: introduction
title: Introduction
slug: /
---

The Data Science Research Infrastructure is a cluster of servers to deploy workspaces and applications for Data Science. 

It works by starting workspaces and applications in Docker containers that are automatically deployed to a powerful server on the cluster using Kubernetes, a container orchestration system. You can then access your workspace or application through an URL automatically generated.

## Getting started

### ✅ What can be done on the DSRI

The DSRI is particularly useful if you need to:

* Gain access to more computing resources (memory and CPUs), which enables you to load larger amount of data, or use more threads for parallelized tasks
* Run jobs that takes a long time to complete
* Deploy any database or service you need, and connect to it from your workspace easily
* Book and start a workspace that uses one of our GPUs

The DSRI proposes a number of popular workspaces to work with data:

* Multiple flavors of **JupyterLab** (scipy, tensorflow, all-spark, and more)
* **VisualStudio Code** server (also available within the JupyterLab workspaces)
* **RStudio**, with a complementary Shiny server
* **Matlab**
* **Ubuntu** Desktop 

You can then install anything you want in your workspace using `conda`, `pip`, or `apt`.

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

:::caution Data storage

**DSRI is a computing infrastructure**, built and used to run data science workloads. DSRI stores data in a persistent manner, but all data stored on the DSRI is susceptible to be altered by the workloads you are running, and we cannot guarantee its immutability.

**Always keep a safe copy of your data outside the DSRI**. And don't rely on the DSRI for long term storage.

:::

<!--

:::note Workflows

For user already familiar with those concepts [workflow orchestration tools](/docs/workflows-introduction) can be installed, such as [Argo workflows](/docs/workflows-argo), [Nextflow](/docs/workflows-nextflow) or [CWL Calrissian](/docs/workflows-cwl).

:::

-->

### ❌ What cannot be done

* Since DSRI can only be accessed when using the [UM VPN](https://vpn.maastrichtuniversity.nl/), deployed services will not be available on the public Internet 🔒
* All activities must be legal in basis. You must closely examine and abide by the terms and conditions of any data, software, or web service that you use as part of your work 📜
* You cannot reach data or servers hosted at Maastricht University from the DSRI by default. You will need to request access in advance [here 📬️](/docs/prepare-project-for-dsri#request-access-to-internal-um-servers)
* Right now it is not possible to reach the central UM fileservices (MFS)


:::info Request an account

If you are working at Maastricht University, **see [this page](https://maastrichtu-ids.github.io/dsri-documentation/docs/access-dsri) to request an account**, and run your services on the DSRI.

:::

## The DSRI architecture

Here is a diagram providing a simplified explanation of how the DSRI works, using popular data science applications as examples (JupyterLab, RStudio, VSCode server)

<img src="/img/dsri_simplified_overview.png" alt="DSRI in a nutshell " style={{maxWidth: '100%', maxHeight: '100%'}} />



