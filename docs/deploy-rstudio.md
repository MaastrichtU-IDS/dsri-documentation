---
id: deploy-rstudio
title: Start RStudio
---

RStudio can be deployed from the [OpenShift Catalog](https://app.dsri.unimaas.nl:8443/console/catalog):

<img src="/dsri-documentation/img/screenshot-deploy-rstudio.png" alt="Deploy RStudio" style="max-width: 100%; max-height: 100%;" />

Two deployments are available:

🗄️ **Persistent**: use a Persistent Volume Claim (PVC) for a persistent storage of the data.

⚡ **Ephemeral**: volumes bind to the pod, data will be lost when the pod is deleted (but this deployment does not require to request the creation of a PVC)

> See the [official Docker image documentation](https://github.com/rocker-org/rocker/wiki/Using-the-RStudio-image) for more details about the container deployed.

> To develop: this deployment for OpenShift: https://github.com/CSCfi/rstudio-openshift
