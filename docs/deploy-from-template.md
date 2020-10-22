---
id: deploy-from-template
title: Quickstart with templates
---

The easiest to get started with the DSRI is to use the predefined templates to deploy an application.

## Start applications using templates

To see all templates defined and quickly start Data Science applications on the DSRI, go to your project catalog in the OpenShift web UI:
* At the top right of the page: **Add to Project** > **Browse Catalog**
* Click on **Filter** to choose the **Institute of Data Science, UM** publisher

<img src="/dsri-documentation/img/screenshot-dsri-filter-publishers.png" alt="Filter template by publisher" style="max-width: 100%; max-height: 100%;" />

You will need root containers enabled to be able to run some of those templates

> You can find additional documentation about starting those applications in the next step of this docs.

If the templates are not available, you can create the Data Science templates in your project (JupyterLab, VisualStudio Code, RStudio, and JupyterHub) using the following `oc` commands:

```bash
oc apply -f https://raw.githubusercontent.com/MaastrichtU-IDS/dsri-openshift-applications/main/templates-datascience/template-jupyterhub-github-auth.yml
oc apply -f https://raw.githubusercontent.com/MaastrichtU-IDS/dsri-openshift-applications/main/templates-datascience/template-jupyterlab-dynamic.yml
oc apply -f https://raw.githubusercontent.com/MaastrichtU-IDS/dsri-openshift-applications/main/templates-datascience/template-jupyterlab-persistent.yml
oc apply -f https://raw.githubusercontent.com/MaastrichtU-IDS/dsri-openshift-applications/main/templates-datascience/template-rstudio-shiny-dynamic.yml
oc apply -f https://raw.githubusercontent.com/MaastrichtU-IDS/dsri-openshift-applications/main/templates-datascience/template-vscode-dynamic.yml
```

> Contact us if you are interested in using Apache Spark or Apache Flink.

## Stop your application

When you are not using your application anymore you can stop the pod. If you are using a Dynamic or Persistent storage you can restart the pod and continue working with all your data in the same state as you left it.

> ⚠️ Please think of stopping applications you are not using to avoid consuming unnecessary resources.

On the **Overview** page click on the down arrow ⬇️ next to the number of pods deployed.

<img src="/dsri-documentation/img/screenshot_scaledown_pod.png" alt="Scale down pod" style="max-width: 100%; max-height: 100%;" />

You can then restart the pod by clicking the up arrow ⬆️

## Delete your application

The best way to make sure all objects related to your application have been deleted is to use the command line:

```shell
oc delete all,secret,configmaps,serviceaccount,rolebinding --selector app=my-application
```

> Delete storage if necessary from the OpenShift web UI.

