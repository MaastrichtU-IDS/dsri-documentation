---
id: deploy-jupyter
title: Deploy Jupyter Notebooks
---

Feel free to propose new deployments using [pull requests](https://github.com/MaastrichtU-IDS/dsri-documentation/pulls) or request new ones by creating a [new issues](https://github.com/MaastrichtU-IDS/dsri-documentation/issues).

[![Jupyterlab](/dsri-documentation/img/jupyter_logo.png)](https://jupyter.org/)

## Recommended deployment

We recommend to use a [Source-to-Image (S2I)](https://docs.openshift.com/container-platform/3.11/creating_images/s2i.html) OpenShift deployments. Provide the URL to a git repository containing your code and `requirements.txt` or `requirements.yml` to install all your dependencies at build time.

> **You will not be root user** once the container is started, so make sure to define all tools to install before build in the requirements.

The Jupyter S2I deployments, and the Root deployment described [below](/dsri-documentation/docs/deploy-jupyter#jupyter-as-root-user), can be deployed from the OpenShift web UI:

<img src="/dsri-documentation/img/screenshot-deploy-jupyter.png" alt="Deploy Jupyter" style="max-width: 100%; max-height: 100%;" />

Two deployments are available:

🦋 **Ephemeral**: volumes bind to the pod, data will be lost when the pod is deleted.

🗄️ **Persistent**: use a Persistent Volume Claim (PVC) for a persistent storage of the data.

The following parameters can to be provided:

* Provide a unique `Application name`
* The `Password` is safely stored in a Secret.
  * `classic`: Jupyter notebook web UI.
  * `lab`: Jupyterlab web UI.
* Provide the base image used by S2I to build your image with the provided requirements installed.
  * `s2i-minimal-notebook:3.6` : minimal jupyter notebook
  * `s2i-scipy-notebook:3.6` : notebook with popular scientific libraries pre-installed
  * `s2i-tensorflow-notebook:3.6` : notebook with tensorflow libraries for machine learning.
* URL to the Git repository with the requirements and the code to run. The repository typically have a `requirements.txt` file at the root to install the libraries that will be used. See as examples:
  * [marcelbrouwers/sample-notebooks](https://github.com/marcelbrouwers/sample-notebooks)
  * [vemonet/translator-sparql-notebook](https://github.com/vemonet/translator-sparql-notebook)
  * [jakevdp/PythonDataScienceHandbook](https://github.com/jakevdp/PythonDataScienceHandbook)

By default the working directory is `/opt/app-root/src`

> Built from [jupyter-on-openshift](https://github.com/jupyter-on-openshift/jupyter-notebooks).

> See [jupyter-on-openshift JupyterHub readme](https://github.com/jupyter-on-openshift/jupyterhub-quickstart#allocating-persistent-storage-to-users) and [OpenShift official documentation](https://blog.openshift.com/jupyter-on-openshift-part-4-adding-a-persistent-workspace/) for more details about persistent volumes.

## Jupyter as Root user

If you need to have root access in your Jupyter Notebook container you can deploy it using the `Jupyter Notebook as Root` solution in the [Catalog web UI](https://app.dsri.unimaas.nl:8443/console/catalog) 🔓

2 deployments are available:

🦋 **Ephemeral**: volumes bind to the pod, data will be lost when the pod is deleted.

🗄️ **Persistent**: use a Persistent Volume Claim (PVC) for a persistent storage of the data.

The following parameters can be provided:

* Provide a unique `Application name`
* The `Password` is safely stored in a Secret.
* You can provide a `Git repository URL` with files to be downloaded and requirements to be installed at the start of the application. 
* `Storage name`: the storage Persistent Volume Claim (PVC)
* `Storage subpath`: path to the Notebook folder in the Persistent Volume Claim storage

This deployment require to have  root user enabled on your project. Contact the [DSRI support team](mailto:dsri-support-l@maastrichtuniversity.nl) to request root access if you don't have them.

> Built from [amalic/Jupyterlab](https://github.com/amalic/Jupyterlab).

## Anaconda and Tensorflow with Jupyter

Another option to run Jupyter notebooks with Anaconda and Tensorflow installed.

This deployment needs to be done through the UI > `Deploy Image`

Use [jupyter/tensorflow-notebook](https://hub.docker.com/r/jupyter/tensorflow-notebook) official Docker image.

* Image name:

  ```shell
  jupyter/tensorflow-notebook
  ```
  
* Environment variables:

  * `JUPYTER_ENABLE_LAB` : `yes` (optional)

* Mount storage:

  * Go to the deployments page > Click `Actions` > Select `Add Storage`
  * Mount the storage in `/home/jovyan`.


> Go to the `pod logs` to get the `login token`.

## Tensorflow on GPU

> Running on GPU is still experimental. Please [contact us](mailto:dsri-support-l@maastrichtuniversity.nl) if you want to run jobs on GPU.

## Deploy Jupyter Hub

To deploy multiple notebooks for multiples users we recommend to use Jupyter Hub.

> To be developed.
