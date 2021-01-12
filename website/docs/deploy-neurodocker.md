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

