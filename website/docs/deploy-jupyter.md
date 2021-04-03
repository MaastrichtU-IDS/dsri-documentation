---
id: deploy-jupyter
title: Jupyter Notebooks
---

Feel free to propose new deployments using [pull requests](https://github.com/MaastrichtU-IDS/dsri-documentation/pulls) or request new ones by creating a [new issues](https://github.com/MaastrichtU-IDS/dsri-documentation/issues).


## Start JupyterLab

Start a JupyterLab container based on the [official Jupyter docker stacks](https://github.com/jupyter/docker-stacks) (debian), with `sudo` privileges to install anything you need (e.g. pip or apt packages)

You can start a container using the **JupyterLab with root privileges (persistent)** template in the [Catalog web UI](https://console-openshift-console.apps.dsri2.unimaas.nl/console/catalog) (make sure the **Templates** checkbox is checked)

Provide a few parameters, and Instantiate the template. The DSRI will automatically create a persistent volume to store data you will put in the `/home/jovyan` folder. 

:::info Find a persistent volume storage

You can find the persistent volumes in the DSRI web UI, go to the **Administrator** view > **Storage** > **Persistent Volume Claims**.

:::

<img src="/dsri-documentation/img/screenshot-deploy-jupyter.png" alt="Deploy Jupyter" style={{maxWidth: '100%', maxHeight: '100%'}} />

You can use any image based on the official Jupyter docker stack: https://github.com/jupyter/docker-stacks

* `jupyter/scipy-notebook`
* `jupyter/datascience-notebook` (with Julia kernel)
* `jupyter/tensorflow-notebook`
* `jupyter/r-notebook`
* `jupyter/pyspark-notebook`
* `jupyter/all-spark-notebook`
* `ghcr.io/maastrichtu-ids/jupyterlab` (with Java and SPARQL kernels, and autocomplete for Python)

You can also build your own image, feel free to use this repository as example to extend a JupyterLab image: https://github.com/MaastrichtU-IDS/jupyterlab

## Use git in JupyterLab

You can use the [JupyterLab Git extension](https://github.com/jupyterlab/jupyterlab-git) to clone and manage your `git` repositories.

It will prompt you for a username and password if the repository is private.

<img src="https://raw.githubusercontent.com/jupyterlab/jupyterlab-git/master/docs/figs/preview.gif" alt="JupyterLab Git extension" style={{maxWidth: '100%', maxHeight: '100%'}} />

You can also use `git` from the terminal.

:::caution Configure username

Before pushing back to GitHub or GitLab, you will need to **configure you username and email** in VSCode terminal:

```bash
git config --global user.name "Jean Dupont"
git config --global user.email jeandupont@gmail.com
```

:::

:::info Save your password

You can run this command to ask git to save your password for 15min:

```bash
git config credential.helper cache
```

Or store the password in a plain text file:

```bash
git config --global credential.helper 'store --file ~/.git-credentials'
```

:::

:::tip Git tip

We recommend to use SSH instead of HTTPS connection when possible, checkout [here](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) how to generate SSH keys and use them with your GitHub account.

:::


## Advanced: JupyterHub

:::info For multiple users

This application is useful if you want to provide JupyterLab to multiple users.

:::

Use the **JupyterHub with GitHub authentication (Dynamic)** template to start a JupyterHub service, users will be able to login with their GitHub account, and start a notebook choosing from various images.

This solution enable you to use the DSRI to run Jupyter notebooks for multiple users without the need for a DSRI account, or knowledge of OpenShift. All they need is a GitHub account and access to the UM network (via the UM VPN).

:::tip Use different authentication systems

Checkout the [different authenticators implemented by JupyterHub](https://jupyterhub.readthedocs.io/en/stable/reference/authenticators.html), and let us know if you would like to work together on implementing a new authentication system.

:::

Create the template in your project catalog:

```bash
oc apply -f https://raw.githubusercontent.com/MaastrichtU-IDS/dsri-documentation/master/applications/templates/restricted/template-jupyterhub-github-auth.yml
```

A custom image can be built and provided when deploying JupyterHub, see this repository as example to build a JupyterLab Docker image supported by OpenShift: https://github.com/MaastrichtU-IDS/jupyterlab-on-openshift

You will need to register a new GitHub OAuth application for your JupyterHub instance to authenticate via GitHub:

1. Create a new OAuth app at https://github.com/settings/developers

2. Provide the following callback URL:
    * https://APPLICATION_NAME-OPENSHIFT_PROJECT.app.dsri.unimaas.nl/hub/oauth_callback
    * e.g. for the `ids-projects` project: https://jupyterhub-ids-projects.app.dsri.unimaas.nl/hub/oauth_callback

3. Add authorized GitHub users to the JupyterHub users when submitting the template to deploy JupyterHub in the OpenShift web UI. It can be changed from the **Admin** tab in the JupyterHub UI later.

Persistent volumes are automatically created for each instance started in JupyterHub to insure persistence of the data even if the instances or JupyterHub are stopped. You can find the persistent volumes in the DSRI web UI, go to the **Administrator** view > **Storage** > **Persistent Volume Claims**.

:::warning Restricted user

The users will be able to install new `pip` packages in their JupyterLab instance, but they will not have `sudo` privileges (so they cannot install `apt` or `yum` packages for example). This can be changed by editing the KubeSpawner python script in the ConfigMap to use `serviceAccountName: anyuid`

:::