---
id: deploy-matlab
title: MATLAB
---

Note that we are not expert in Matlab: feel free to contact Mathworks support directly if you are having any issues with their official Docker image. Because since it's closed source we cannot fix it ourselves.

You can request official support from Matlab at this address after login and connecting your account to the UM license: https://nl.mathworks.com/academia/tah-portal/maastricht-university-31574866.html#get

## Use the official Matlab image

Start Matlab with a desktop UI accessible directly using your web browser at a URL automatically generated. 

Go to the **Catalog**, make sure **Templates** are displayed (box checked), and search for **Matlab**, and provide the right parameters:

* You will need to provide the password you will use to access the Matlab UI when filling the template. **Ensure to use a password length greater than 6.**
* You can also change the Matlab image version, see the latest version released in the [official Matlab Docker image documentation](https://hub.docker.com/r/mathworks/matlab)

Once Matlab start you can access it through 2 routes (URL), which can be accessed when clicking on the Matlab node in the **Topology**:

* The main `matlab` route to access Matlab desktop UI directly in your web browser. It is recommended to use this route.
* The `matlab-vnc` route can be used to access Matlab using a VNC client (you will need to use the full URL to your Matlab VNC route). Only use it if you know what you're doing.

## Use a stable Matlab image

The official Matlab image is infamous for showing a black screening after a few hours of use, making it a bit cumbersome to be used trustfully.

We have a solution if you need to have a more stable Matlab image, that will require a bit more manual operations:

* Use the **Ubuntu with GUI** template to setup a Ubuntu pod on the DSRI with the image [`ghcr.io/vemonet/docker-ubuntu-vnc-desktop:latest`](https://github.com/vemonet/docker-ubuntu-vnc-desktop)
* Start firefox and browse to https://nl.mathworks.com
* Login with your personal Matlab account, create one if you don’t have it
* Choose **get matlab** and download, the linux matlab version
* Open a terminal window and run the following commands:

```bash
sudo apt-get update
sudo apt-get install unzip
# Unzip the previous downloaded matlab installation file
# start the matlab installation with:
sudo ./install
```

You will then be prompted the Matlab installation process:

*  Fill in your personal matlab account credentials
*  ⚠️ Fill in the username as used in the Ubuntu environment, in your case it will most probably be **root**  (Matlab gives a license error if this is not correct, check with `whoami` in the terminal when in doubt)
*  Select every Matlab modules you want to be installed
*  Check "symbolic link" and "Improve……"

## Use Matlab in Jupyter
**For running Matlab in Jupyter, you need to first install the matlab on your Jupyter pod. if you need assistance [ask the DSRI admins](/help)** 
<!--
If you need to run matlab in Jupyter 

You can also use [mathworks/jupyter-matlab-proxy](https://github.com/mathworks/jupyter-matlab-proxy). You can easily install it in a JupyterLab image with `pip`:

```bash
pip install jupyter-matlab-proxy
```

Follow the instructions on the [mathworks/jupyter-matlab-proxy repository](https://github.com/mathworks/jupyter-matlab-proxy) to access it.
-->
## Deploy Matlab on GPU

We use the Matlab template in the DSRI catalog to deploy a pre-built **Nvidia Matlab Deep Learning Container** on CPU or GPU nodes. See the [official documentation from MathWorks](https://nl.mathworks.com/help/cloudcenter/ug/matlab-deep-learning-container-on-docker-hub.html) for more details about this image.

:::caution Request GPU access to Matlab

By default you do not have the permission to run applications on GPU, you need to make a reservation.
you can look into [GPU applications documentation](https://dsri.maastrichtuniversity.nl/docs/deploy-on-gpu) for more details.
:::

2 options are available to connect to your running Matlab pod terminal:

- Go to the matlab pod page on the DSRI web UI 
- Or connect from your terminal with `oc rsh MATLAB_POD_ID`

Type `bash` when first accessing to the terminal to have a better experience.

Type `cd /home/matlab/persistent` to go in the persistent volume, and use this volume to store all data that should be preserved.

Type `matlab` to access Matlab from the terminal

<!--
It is possible to access the Matlab desktop UI through VNC and a web UI, but the script to start it in `/bin/run.sh` seems to face some errors, let us know if you have any luck with this.

By default the image run with the `matlab` user which does not have `sudo` privilege, you can run the container as root if you need to install packages which require admin privileges. 
-->


<!--
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
-->

<!--

By default the image run with the `matlab` user which does not have `sudo` privilege, you can run the container as root if you need to install packages which require admin privileges. 

To run as root, go to **Topology**, click on the Matlab node, click on the **Actions** button of the matlab details, and **Edit deployment**. In the deployment YAML search for `spec:` which has a `containers:` as child, and add the following under `spec:`

```yaml
spec:
  securityContext:
    runAsUser: 0
```
-->
