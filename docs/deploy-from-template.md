---
id: deploy-from-template
title: Quickstart with templates
---

The easiest to get started with the DSRI is to use the predefined templates to deploy an application.

## Start applications using templates

Multiple templates are available for Data Science:

* VisualStudio Code server
* JupyterHub with GitHub authentication
* Multiple flavors of [JupyterLab](https://github.com/jupyter/docker-stacks) (scipy, tensorflow, all-spark, and more)
* RStudio with a Shiny server
* Tensorflow or PyTorch on GPU (with JupyterLab or VisualStudio Code)
* Apache Spark cluster with JupyterLab
* Apache Flink cluster for Streaming applications (require `anyuid` privileges)

To see all templates defined and quickly start Data Science applications on the DSRI, go to your project catalog in the OpenShift web UI:
* At the top right of the page: **Add to Project** > **Browse Catalog**
* Click on **Filter** to choose the **Institute of Data Science, UM** publisher

<img src="/dsri-documentation/img/screenshot-dsri-filter-publishers.png" alt="Filter template by publisher" style="max-width: 100%; max-height: 100%;" />

You will need root containers enabled to be able to run some of those templates

> You can find additional documentation about starting those applications in the next step of this docs.

If the templates are not available, you can create the JupyterHub, VisualStudio Code, RStudio, JupyterLab, Spark and Flink templates in your project:

```bash
oc apply -f https://raw.githubusercontent.com/MaastrichtU-IDS/jupyterlab-on-openshift/master/template-jupyterhub-github-auth.yml
oc apply -f https://raw.githubusercontent.com/MaastrichtU-IDS/jupyterlab-on-openshift/master/template-vscode-dynamic.yml
oc apply -f https://raw.githubusercontent.com/MaastrichtU-IDS/jupyterlab-on-openshift/master/template-rstudio-shiny-dynamic.yml
oc apply -f https://raw.githubusercontent.com/MaastrichtU-IDS/jupyterlab-on-openshift/master/template-jupyterlab-dynamic.yml
oc apply -f https://raw.githubusercontent.com/MaastrichtU-IDS/jupyterlab-on-openshift/master/template-jupyterlab-persistent.yml
oc apply -f https://raw.githubusercontent.com/vemonet/spark-openshift/master/spark-template-dsri.yml
oc apply -f https://raw.githubusercontent.com/vemonet/flink-on-openshift/master/template-flink-dsri.yml
```

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

