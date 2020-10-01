---
id: deploy-from-template
title: Quickstart with templates
---

The easiest to get started with the DSRI is to use the predefined templates to deploy an application.

Multiple templates are available for Data Science:

* VisualStudio Code server
* JupyterHub
* JupyterLab with restricted or root user
* RStudio with Shiny server
* Tensorflow or PyTorch on GPU
* Apache Spark cluster

To see all templates defined and quickly start Data Science applications on the DSRI, go to your project catalog in the OpenShift web UI:
* At the top right of the page: **Add to Project** > **Browse Catalog**
* Click on **Filter** to choose the **Institute of Data Science, UM** publisher

<img src="/dsri-documentation/img/screenshot-dsri-filter-publishers.png" alt="Filter template by publisher" style="max-width: 100%; max-height: 100%;" />

You will need root containers enabled to be able to run some of those templates

> You can find additional documentation about starting those applications in the next step of this docs.

If the templates are not available, you can create the JupyterHub, RStudio and JupyterLab templates in your project:

```bash
oc apply -f https://raw.githubusercontent.com/MaastrichtU-IDS/jupyterlab-on-openshift/master/template-jupyterhub-github-auth.yml
oc apply -f https://raw.githubusercontent.com/MaastrichtU-IDS/jupyterlab-on-openshift/master/template-rstudio-shiny-dynamic.yml
oc apply -f https://raw.githubusercontent.com/MaastrichtU-IDS/jupyterlab-on-openshift/master/template-jupyterlab-restricted-ephemeral.yml
oc apply -f https://raw.githubusercontent.com/MaastrichtU-IDS/jupyterlab-on-openshift/master/template-jupyterlab-restricted-dynamic.yml
```