---
id: deploy-matlab
title: Matlab
---

Note that we are not expert in Matlab: we don't use proprietary software to do open science! And Matlab is so poorly written for a paid software that is outrageous to pay for locking your science behind their license (remember that anyone who wants to reproduce your results will need to pay for matlab, and your whole analysis will be worthless if Mathworks goes bankrupt).  

It's the same story as for researchers who have accepted to pay outrageous fees to publishers for years, while doing the reviewing themselves for free (how ridiculous is that?). Today the whole field realized that is a literal ponzi scheme, and is moving to Open Access publishing. It will be the same for programming. Do you want to push Science towards an open future? Or keep it locked behind licenses in a backward society? 

Feel free to contact Mathworks support directly if you are having any issues with their official Docker image. Because since it's closed source we cannot fix it ourselves.

You can request official support from Matlab at this address after login and connecting your account to the UM license: https://nl.mathworks.com/academia/tah-portal/maastricht-university-31574866.html#get

## Use the official Matlab image

Start Matlab with a desktop UI accessible directly using your web browser at a URL automatically generated. 

Go to the **Catalog**, make sure **Templates** are displayed (box checked), and search for **Matlab**, and provide the right parameters:

* You will need to provide the password you will use to access the Matlab UI when filling the template.
* You can also change the Matlab image version, see the latest version released in the [official Matlab Docker image documentation](https://hub.docker.com/r/mathworks/matlab)

Once Matlab start you can access it through 2 routes (URL), which can be accessed when clicking on the Matlab node in the **Topology**:

* The main `matlab` route to access Matlab desktop UI directly in your web browser. It is recommended to use this route.
* The `matlab-vnc` route can be used to access Matlab using a VNC client (you will need to use the full URL to your Matlab VNC route). Only use it if you know what you're doing.

## Use Matlab in Jupyter

You can also use [mathworks/jupyter-matlab-proxy](https://github.com/mathworks/jupyter-matlab-proxy). You can easily install it in a JupyterLab image with `pip`:

```bash
pip install jupyter-matlab-proxy
```

Follow the instructions on the [mathworks/jupyter-matlab-proxy repository](https://github.com/mathworks/jupyter-matlab-proxy) to access it.

## Deploy Matlab on GPU

We use the Matlab template in the DSRI catalog to deploy a pre-built **Nvidia Matlab Deep Learning Container** on CPU or GPU nodes. See the [official documentation from MathWorks](https://nl.mathworks.com/help/cloudcenter/ug/matlab-deep-learning-container-on-dgx.html) for more details about this image.

:::caution Request access to Matlab

To be able to access the Matlab on GPU template you will need to [ask the DSRI admins](/dsri-documentation/help) to enable it in your project.

:::

2 options are available to connect to your running Matlab pod terminal:

- Go to the matlab pod page on the DSRI web UI 
- Or connect from your terminal with `oc rsh MATLAB_POD_ID`

Type `bash` when first accessing to the terminal to have a better experience.

Type `cd /ContainerDeepLearningData` to go in the persistent volume, and use this volume to store all data that should be preserved.

Type `matlab` to access Matlab from the terminal

It is possible to access the Matlab desktop UI through VNC and a web UI, but the script to start it in `/bin/run.sh` seems to face some errors, let us know if you have any luck with this.

By default the image run with the `matlab` user which does not have `sudo` privilege, you can run the container as root if you need to install packages which require admin privileges. 

## Build your own Matlab image

Follow the instructions at: https://github.com/mathworks-ref-arch/matlab-dockerfile

This will require you to retrieve Matlab installation files to build your own container

Once all the files have been properly placed in the folder and the license server URL has been set, you can start the build on DSRI by following the [documentation to deploy from a `Dockerfile`](https://maastrichtu-ids.github.io/dsri-documentation/docs/guide-dockerfile-to-openshift#create-new-build-configuration)

:::caution License server not available on your laptop

If you try to build Matlab directly on your laptop it will most probably fail as your machine might not have access to the license server. You will need to build the Matlab container directly on DSRI with `oc start-build`

:::

Once Matlab deployed, you will need to edit the matlab deployment YAML before it works.

Go to **Topology**, click on the Matlab node, click on the **Actions** button of the matlab details, and **Edit deployment**. In the deployment YAML search for `spec:` which has a `containers:` as child, and add the following under `spec:`

```yaml
spec:
  serviceAccountName: anyuid
  containers: ...
```

Your Matlab container should now be running!

2 options are available to connect to your running Matlab pod terminal:

* Go to the matlab pod page on the DSRI web UI 
* Or connect from your terminal with `oc rsh MATLAB_POD_ID`

You can access Matlab from the terminal by running `matlab`

Unfortunately Matlab did not expected their users to need the graphical UI when using Matlab in containers. So only the command line is available by default. You can find more information to [enable the Matlab UI in this issue](https://github.com/mathworks-ref-arch/matlab-dockerfile/issues/18).

<!--

By default the image run with the `matlab` user which does not have `sudo` privilege, you can run the container as root if you need to install packages which require admin privileges. 

To run as root, go to **Topology**, click on the Matlab node, click on the **Actions** button of the matlab details, and **Edit deployment**. In the deployment YAML search for `spec:` which has a `containers:` as child, and add the following under `spec:`

```yaml
spec:
  securityContext:
    runAsUser: 0
```
-->
