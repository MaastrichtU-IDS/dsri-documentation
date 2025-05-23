---
id: specs
title: Software & Hardware
---

## The DSRI specifications

### Software

We use [**OKD 4.14**](https://www.okd.io/), the Origin Community Distribution of Kubernetes that powers [RedHat OpenShift](https://www.openshift.com/), a distribution of the Kubernetes container orchestration tool. Kubernetes takes care of deploying the Docker containers on the cluster of servers, the OKD distribution extends it to improve security, and provide a user-friendly web UI to manage your applications.

DSRI provides a graphical user interface on top of the [Kubernetes](https://kubernetes.io/) containers orchestration to easily deploy and manage workspaces and services. 

We use [**RedHat Ceph storage**](https://www.redhat.com/fr/technologies/storage/ceph) for the distributed storage.

DSRI works best when you work with code, scripts to run, and web applications. Especially if they require an important amount of computing resources. If you work on desktop softwares with graphical user interface, such as Matlab or Spyder, the installation will be much more complex, and usually using your laptop will be more comfortable, stable and reactive than accessing a desktop interface on a remote server through the UM VPN.

Here is a non-exhaustive list of some of the applications that can easily be deployed on the DSRI:

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

### Hardware

* 14 CPU nodes

|                | CPU                             | Cores                     | RAM                 | Storage      | Type                     |
| -------------- | ------------------------------- | ------------------------- | ------------------- | ------------ | ------------------------ |    
| 11x CPU node   | 2x AMD EPYC 7551 32-Core 3.0GHz | 64 cores (128 threads)    | 512 GB DDR4 2666MHz | 120 TB       | Dell EMC PowerEdge R7425 |
| 3x CPU Node    | 2x AMD EPYC 7551 32-Core 3.0GHz | 64 cores (128 threads)    | 512 GB DDR4 2666MHz | -            | Dell EMC PowerEdge R7425 |      
| Total capacity | 28 CPUs                         | 896 cores (1 792 threads) | 7 168 GB            | 1 320 TB     | -                        |

#

* 5 GPU nodes

|                      | GPU                | CPU                              | Cores                     | RAM                  | Type                     |
| -------------------- | ------------------ | -------------------------------- | ------------------------- | -------------------- | ------------------------ |
| 2x GPU node capacity | 2 NVIDIA H100 80GB | 2x AMD EPYC 7763 64-Core 3.5GHz  | 128 cores (256 threads)   | 512 GB DDR4 3200MHz  | Dell EMC PowerEdge R7525 |
| 1x GPU node capacity | 2 NVIDIA A100 80GB | 2x AMD EPYC 7763 64-Core 3.5GHz  | 128 cores (256 threads)   | 512 GB DDR4 3200MHz  | Dell EMC PowerEdge R7525 |
| 1x GPU node capacity | 1 NVIDIA A100 80GB | 2x AMD EPYC 7763 64-Core 3.5GHz  | 128 cores (256 threads)   | 512 GB DDR4 3200MHz  | Dell EMC PowerEdge R7525 |
| 1x GPU node capacity | 4 NVIDIA L40S 48GB | 2x AMD EPYC 9554 64-Core 3.75GHz | 128 cores (256 threads)   | 1512 GB DDR5 4800MHz | HPE ProLiant DL385 Gen11 |
| Total capacity       | 11 GPUs            | 10 CPUs                          | 640 cores (1 280 threads) | 8 192 GB             | -                        |


<img src="/img/DSRI_infrastructure_architecture_overview.png" alt="DSRI infrastructure" style={{maxWidth: '100%', maxHeight: '100%'}} />

<!-- Old presentation, commented out until we have a new presentation 2025-05-23
## Learn more about DSRI

See the following presentation about the Data Science Research Infrastructure 

<a href="/resource/2021-04-DSRI-Community-Event.pdf" target="_blank" rel="noopener noreferrer">
 <img src="/resource/DSRI-community-event.png" style={{maxWidth: '100%', maxHeight: '100%'}} alt="DSRI April 2021 Community Event Presentation" />
</a>
-->