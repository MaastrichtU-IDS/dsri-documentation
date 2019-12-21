---
id: deploy-jupyter
title: Deploy Jupyter Notebooks
---

[![Jupyterlab](/dsri-documentation/img/jupyter_logo.png)](https://jupyter.org/)

Feel free to propose new services using [pull requests](https://github.com/MaastrichtU-IDS/dsri-documentation/pulls) or request new ones by creating a [new issues](https://github.com/MaastrichtU-IDS/dsri-documentation/issues).

## Jupyter as root user

This method require to have enabled root user on your project. Contact the [DSRI support team](mailto:dsri-support-l@maastrichtuniversity.nl) to request root access.

Use [amalic/jupyterlab](https://hub.docker.com/r/amalic/jupyterlab/) Docker image.

* Image name:
  
  ```
  amalic/jupyterlab
  ```
  
* Environment variables:
  
  * `PASSWORD` : `my_password`
  
* Mounted volume: `/notebooks`

> Network port: `8888`

> In development: [OpenShift secrets](/dsri-documentation/docs/openshift-secret) can be used to provide password in a secure manner.

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

## Future recommended deployment

> Still need some work to be able to install additional libraries at build time.

Select `Jupyter Notebook Quickstart` from the [DSRI services catalog](https://app.dsri.unimaas.nl:8443/console/catalog) web UI while on the right project.

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


### Use a persistent volume

With `notebook-quickstart` deployment:

* [Find your Pod](https://app.dsri.unimaas.nl:8443/console/project/test-vincent/browse/pods).
* Click on `Actions` on the top right of your pod Details page.
* Select `Add Storage`.
* Select the Persistent Volume Claim (PVC) you want to use

You will need to make sure the directory you point to in the PVC has been created and is accessible (`chmod -R 777`)

> Add documentation for `notebook-workspace`.

### Deploy Jupyter Hub

To deploy multiple notebooks for multiples users we recommend to use Jupyter Hub.

> TODO: develop.
