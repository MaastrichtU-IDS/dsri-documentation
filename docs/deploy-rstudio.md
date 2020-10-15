---
id: deploy-rstudio
title: Start RStudio
---

RStudio can be deployed from the [OpenShift Catalog](https://app.dsri.unimaas.nl:8443/console/catalog), 2 deployments are available:

## RStudio with Shiny server

Image optimized for OpenShift, does not require root containers enabled. It will automatically create a persistent sotrage for the data.

Use the **RStudio with Shiny (Dynamic)** template in the OpenShift web UI catalog.

## RStudio with root user

> 🔒 You need root containers enabled (aka. anyuid) in your project to start this application.

Run RStudio with `sudo` privileges, can be useful if need to install additional packages that requires `sudo`

Create the templates in your project catalog:

```bash
oc apply -f https://raw.githubusercontent.com/MaastrichtU-IDS/dsri-openshift-applications/main/templates-anyuid/template-rstudio-root-persistent.yml
oc apply -f https://raw.githubusercontent.com/MaastrichtU-IDS/dsri-openshift-applications/main/templates-anyuid/template-rstudio-root-ephemeral.yml
```

2 storage solutions are available:

🗄️ **Persistent**: use a Persistent Volume Claim (PVC) for a persistent storage of the data.

⚡ **Ephemeral**: volumes bind to the pod, data will be lost when the pod is deleted (but this deployment does not require to request the creation of a PVC)

> See the [official Docker image documentation](https://github.com/rocker-org/rocker/wiki/Using-the-RStudio-image) for more details about the container deployed.

<img src="/dsri-documentation/img/screenshot-deploy-rstudio.png" alt="Deploy RStudio" style="max-width: 100%; max-height: 100%;" />