---
id: neuroscience
title: Neuroscience research
---

:::tip Feedbacks welcome

We are not expert in Neuroscience ourselves, please contact us if you see any improvements that could be made to this page, or if you need any help to get it working.

:::

The Neurodocker project helps you to create a Docker image with the Neuroscience softwares you need, such as FSL, FreeSurfer, AFNI or ANTs. 

Checkout the Neurodocker documentation for more details: https://github.com/ReproNim/neurodocker

:::info Examples

In this page we will show you how to generate a Docker image with popular Neuroscience research softwares installed such as FreeSurfer and FSL. Feel free to check the [Neurodocker documentation](https://github.com/ReproNim/neurodocker), and adapt the installation process to your needs.

::: 

## JupyterLab with FreeSurfer

Start a JupyterLab container with Freesurfer pre-installed providing admin (`sudo`) privileges to install anything you need from the terminal (e.g. pip or apt packages)

When instantiating the template you can provide a few parameters similar to the standard JupyterLab, such as:

* **Password** to access the notebook
* Optionally you can provide a **git repository** to be automatically cloned in the JupyterLab (if there is a `requirements.txt` packages will be automatically installed with `pip`)
* **Docker image** to use for the notebook (see below for more details on customizing the docker image) 
* Your **git username and email** to automatically configure git

The DSRI will automatically create a persistent volume to store data you will put in the `/home/jovyan/work` folder (the folder used by the notebook interface). You can find the persistent volumes in the DSRI web UI, go to the **Administrator** view > **Storage** > **Persistent Volume Claims**

<img src="/img/screenshot-freesurfer.png" alt="Deploy Freesurfer" style={{maxWidth: '100%', maxHeight: '100%'}} />

You can also link your git repository to the project for automatic deployment see [using git in JupyterLab](https://dsri.maastrichtuniversity.nl/docs/deploy-jupyter#-use-git-in-jupyterlab)

This can also be deployed using Helm from the terminal, the steps are:

```bash
helm repo add dsri https://maastrichtu-ids.github.io/dsri-helm-charts/
helm repo update
helm install freesurfer dsri/jupyterlab \
  --set serviceAccount.name=anyuid \
  --set openshiftRoute.enabled=true \
  --set image.repository=ghcr.io/maastrichtu-ids/jupyterlab \
  --set image.tag=freesurfer \
  --set storage.mountPath=/root \
  --set password=changeme
oc get route --selector app.kubernetes.io/instance=freesurfer --no-headers -o=custom-columns=HOST:.spec.host
```
Log in to the corresponding jupyter notebook and start the terminal, then enter `freesurfer` as a command

## FreeSurfer and FSL

Generate a `Dockerfile` with:

* FreeSurfer 6.0.1
* FSL 6.0.3

```bash
docker run --rm repronim/neurodocker:0.7.0 generate docker \
    --base debian:stretch --pkg-manager apt \
    --freesurfer version=6.0.1 --fsl version=6.0.3 > Dockerfile
```

## FreeSurfer and AFNI

Generate a `Dockerfile` with:

* FreeSurfer 6.0.1
* AFNI, R and Python3

```bash
docker run --rm repronim/neurodocker:0.7.0 generate docker \
    --base debian:stretch --pkg-manager apt \
    --afni version=latest install_r=true install_r_pkgs=true install_python3=true \
    --freesurfer version=6.0.1 > Dockerfile
```

## Deploy the generated Dockerfile

Before deploying the `Dockerfile` to the DSRI you can open it, and add commands to install additional package you are interested in, such as nighres or nipype.

Checkout the documentation to [deploy the `Dockerfile` on DSRI](https://maastrichtu-ids.github.io/dsri-documentation/docs/guide-dockerfile-to-openshift). 

:::note UI with VNC

Running a UI with VNC (e.g. FSLeyes) is still a work in progress. See [this issue for more details](https://github.com/ReproNim/neurodocker/issues/343).

:::

## Use the GPUs

More details about using GPU with FSL: https://fsl.fmrib.ox.ac.uk/fsl/fslwiki/GPU