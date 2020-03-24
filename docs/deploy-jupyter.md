---
id: deploy-jupyter
title: Deploy Jupyter Notebooks
---

[![Jupyterlab](/dsri-documentation/img/jupyter_logo.png)](https://jupyter.org/)

Feel free to propose new services using [pull requests](https://github.com/MaastrichtU-IDS/dsri-documentation/pulls) or request new ones by creating a [new issues](https://github.com/MaastrichtU-IDS/dsri-documentation/issues).

## Recommended deployment

We recommend to use a [Source-to-Image (S2I)](https://docs.openshift.com/container-platform/3.11/creating_images/s2i.html) OpenShift deployments. Provide the URL to a git repository containing your code and `requirements.txt` or `requirements.yml` to install all your dependencies at build time.

> **You will not be root user** once the container is started, so make sure to define all tools to install before build in the requirements.

⚡ If you want to start a Notebook fast and do not mind of the persistence of your data choose the `Jupyter Notebook Quickstart` from the [DSRI services catalog](https://app.dsri.unimaas.nl:8443/console/catalog) web UI.

🗄️ If you need a to use a PVC storage then use `Jupyter Notebook PVC Quickstart` from the Catalog.

Those S2I deployments, and the Root deployment described below, can be deployed from the OpenShift web UI:

<img src="/dsri-documentation/img/screenshot-deploy-jupyter.png" alt="Deploy Jupyter" style="max-width: 100%; max-height: 100%;" />

The following parameters need to be provided:

* *Application_name*: the unique name of your application
  * e.g. `nb-tensorflow-word2vec`
* *Notebook_interface*
  * `classic`: Jupyter notebook web UI.
  * `lab`: Jupyterlab web UI.
* *Builder_image*
  * `s2i-minimal-notebook:3.6` : minimal jupyter notebook
  * `s2i-scipy-notebook:3.6` : notebook with popular scientific libraries pre-installed
  * `s2i-tensorflow-notebook:3.6` : notebook with tensorflow libraries for machine learning.
* *Git_repository_url*: the notebook git repository. Place a `requirements.txt` file at the root to install additional libraries.
  * See [jakevdp/PythonDataScienceHandbook](https://github.com/jakevdp/PythonDataScienceHandbook) as example.
* *Context_dir*: should enable to select working directory. But at the moment fails if directory doesn't exist.
  * By default the working directory is `/opt/app-root/src` (TODO: try `/srv`)
  * See [jupyter-on-openshift JupyterHub readme](https://github.com/jupyter-on-openshift/jupyterhub-quickstart#allocating-persistent-storage-to-users) and [OpenShift official documentation](https://blog.openshift.com/jupyter-on-openshift-part-4-adding-a-persistent-workspace/) to enable using persistent volumes.

> Built from [jupyter-on-openshift](https://github.com/jupyter-on-openshift/jupyter-notebooks).

## Jupyter as Root user

If you need to have root access in your Jupyter Notebook container you can deploy it using the `JupyterLab as Root` solution in the [Catalog web UI](https://app.dsri.unimaas.nl:8443/console/catalog).

* Provide a unique `Application name`
* You can provide a `Git repository URL` with files to be downloaded and requirements to be installed at the start of the application. 
* `Storage name`: the storage Persistent Volume Claim (PVC)
* `Storage subpath`: path to the Notebook folder in the Persistent Volume Claim storage

This deployment require to have a PVC storage and root user enabled on your project. Contact the [DSRI support team](mailto:dsri-support-l@maastrichtuniversity.nl) to request root access.

> In development: [OpenShift secrets](/dsri-documentation/docs/openshift-secret) can be used to provide password in a more secure manner.

> Built from [amalic/Jupyterlab](https://github.com/amalic/Jupyterlab).

## Anaconda and Tensorflow with Jupyter

Another option to run Jupyter notebooks with Anaconda and Tensorflow installed.

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

> TODO: develop.
