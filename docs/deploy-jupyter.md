---
id: deploy-jupyter
title: Start Jupyter Notebooks
---

Feel free to propose new deployments using [pull requests](https://github.com/MaastrichtU-IDS/dsri-documentation/pulls) or request new ones by creating a [new issues](https://github.com/MaastrichtU-IDS/dsri-documentation/issues).

[![Jupyterlab](/dsri-documentation/img/jupyter_logo.png)](https://jupyter.org/)

## Start JupyterLab with the root user

> 🔒 You need root containers enabled (aka. anyuid) in your project to start this application.

We will deploy the JupyterLab image with root user available at: [`ghcr.io/vemonet/jupyterlab`](https://github.com/users/vemonet/packages/container/package/jupyterlab)

This JupyterLab image comes with a Python 3.8 kernel with autocomplete and linting, a Java kernel and a SPARQL kernel.

Create the template in your project catalog if it is not present:

```bash
oc apply -f https://raw.githubusercontent.com/MaastrichtU-IDS/dsri-openshift-applications/main/templates-anyuid/template-jupyterlab-root-persistent.yml
```

You can deploy it using the **JupyterLab with root user (Persistent)** solutions in the [Catalog web UI](https://app.dsri.unimaas.nl:8443/console/catalog):

<img src="/dsri-documentation/img/screenshot-deploy-jupyter.png" alt="Deploy Jupyter" style="max-width: 100%; max-height: 100%;" />

> The application will use an existing Persistent Volume Claim (PVC) for a persistent storage of the data.

The following parameters can be provided:

1. Provide a unique **Application name**
2. The **Password** is safely stored in a Secret.
3. You can provide a **Git repository URL** with files to be downloaded and requirements to be installed at the start of the application. 
4. **Storage name** (only for persistent): the storage Persistent Volume Claim (PVC)
5. **Storage folder** (only for persistent): path to the Notebook data folder in the Persistent Volume Claim storage

> This deployment require to have  root user enabled on your project. Contact the [DSRI support team](mailto:dsri-support-l@maastrichtuniversity.nl) to request root access if you don't have them.

Pip requirements, apt packages and Jupyterlab extensions are installed from `requirements.txt`, `packages.txt` and `extensions.txt` requirement files. 

Try the following Notebooks to work on a RDF Knowledge Graph about COVID-19 related publications: https://github.com/vemonet/covid-kg-notebooks

> Built from [amalic/Jupyterlab](https://github.com/amalic/Jupyterlab).

## Start JupyterLab with restricted user

Start JupyterLab images from the [official Jupyter docker stack](https://github.com/jupyter/docker-stacks) with regular `jovyan` user, without `sudo` privileges.

You can use any image based on the official Jupyter docker stack: https://github.com/jupyter/docker-stacks

* `jupyter/scipy-notebook`
* `jupyter/datascience-notebook` (with Julia kernel)
* `jupyter/tensorflow-notebook`
* `jupyter/r-notebook`
* `jupyter/pyspark-notebook`
* `jupyter/all-spark-notebook`
* `ghcr.io/maastrichtu-ids/jupyterlab-on-openshift` (with SPARQL and Java kernels)

Or build your own using this repository as example: https://github.com/MaastrichtU-IDS/jupyterlab-on-openshift 📦

> **You will not be root user**⚠️ you will be able to install new `pip` packages, but you will not have `sudo` privileges (so no installation of `apt` or `yum` packages)

By default the working directory is `/home/jovyan`

> The application will automatically create a Persistent Volume Claim (PVC) for a persistent storage of the data.

## Use git in JupyterLab

You can use the [JupyterLab Git extension](https://github.com/jupyterlab/jupyterlab-git) to clone and manage your `git` repositories.

It will prompt you for a username and password if the repository is private.

<img src="https://raw.githubusercontent.com/jupyterlab/jupyterlab-git/master/docs/figs/preview.gif" alt="JupyterLab Git extension" style="max-width: 100%; max-height: 100%;" />

>  You can also use `git` from the terminal.

You can run this command to ask git to save your password for 15min:

```bash
git config credential.helper cache
```

Or store the password in a plain text file:

```bash
git config --global credential.helper 'store --file ~/.git-credentials'
```

Before pushing back to GitHub or GitLab, you will need to **configure you username and email** in VSCode terminal:

```bash
git config --global user.name "John Doe"
git config --global user.email johndoe@example.com
```

## Upload data to JupyterLab

See the [Guide to upload data on the DSRI](/dsri-documentation/docs/openshift-load-data).

## Stop or delete JupyterLab

See the [documentation to stop and delete services](/dsri-documentation/docs/openshift-delete-services).

## Start JupyterHub

> Useful if you want to provide JupyterLab to multiple users.

Use the **JupyterHub with GitHub authentication (Dynamic)** template to start a JupyterHub service, users will be able to login with their GitHub account, and start a notebook choosing from various images.

This solution enable you to use the DSRI to run Jupyter notebooks for multiple users without the need for a DSRI account, or knowledge of OpenShift. All they need is a GitHub account and access to the UM network (via the UM VPN).

Persistent volumes are automatically created for each instance started in JupyterHub to insure persistence of the data even if the instances or JupyterHub are stopped.

> ⚠️ The users will be able to install new `pip` packages in their JupyterLab instance, but they will not have `sudo` privileges (so they cannot install `apt` or `yum` packages)

A custom image can be built and provided when deploying JupyterHub, see this repository as example to build a JupyterLab Docker image supported by OpenShift: https://github.com/MaastrichtU-IDS/jupyterlab-on-openshift

You will need to register a new GitHub OAuth application for your JupyterHub instance to authenticate via GitHub:

1. Create a new OAuth app at https://github.com/settings/developers

2. Provide the following callback URL:
    * https://APPLICATION_NAME-OPENSHIFT_PROJECT.app.dsri.unimaas.nl/hub/oauth_callback
    * e.g. for the `ids-projects` project: https://jupyterhub-ids-projects.app.dsri.unimaas.nl/hub/oauth_callback

3. Add authorized GitHub users to the JupyterHub users when submitting the template to deploy JupyterHub in the OpenShift web UI. It can be changed from the **Admin** tab in the JupyterHub UI later.
