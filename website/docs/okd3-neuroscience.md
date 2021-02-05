---
id: okd3-neuroscience
title: Neuroscience research
---

:::tip Feedbacks welcome

We are not expert in Neuroscience ourselves, please contact us if you see any improvements that could be made to this page, or if you need any help to get it working.

:::

The Neurodocker project helps you to create a Docker image with the Neuroscience softwares you need, such as FSL, FreeSurfer or ANTs. 

Checkout the Neurodocker documentation for more details: https://github.com/ReproNim/neurodocker

:::info Freesurfer and FSL

In this page we will show you how to generate a Docker image with FreeSurfer and FSL installed. Feel free to change it to adapt it to your needs.

::: 

1. Generate a `Dockerfile` with FreeSurfer and FSL installation:

```bash
docker run --rm repronim/neurodocker:0.7.0 generate docker \
    --base debian:stretch --pkg-manager apt \
    --freesurfer version=6.0.1 --fsl version=6.0.3 > Dockerfile
```

2. Checkout the documentation to [deploy the `Dockerfile` on DSRI](https://maastrichtu-ids.github.io/dsri-documentation/docs/guide-dockerfile-to-openshift). 

:::note UI with VNC

Running a UI with VNC (e.g. FSLeyes) is still a work in progress. See [this issue for more details](https://github.com/ReproNim/neurodocker/issues/343).

:::

