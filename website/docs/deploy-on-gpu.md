---
id: deploy-on-gpu
title: GPU applications
---

GPUs on the DSRI can only be used by one workspace at a time, and there is a limited number of GPUs (8).

⚠️ We currently provide a free access to those GPUs, but with the growing demands for GPUs it might get more restricted. As consideration for others, and to help keep this system open, it is important to make a maximum use of your GPUs when you get access to them. 

Unfortunately job scheduling is currently not mature enough on Kubernetes, you can look into [volcano.sh](https://volcano.sh/en/) if you are interested, but it is still quite experimental.

To use the GPU on the DSRI you will go through this process:

1. Deploy, prepare and debug your GPU workspace
2. [Book a GPU](/gpu-booking)
3. Once the booking is done you will receive an email about your reservation, and more emails when it starts and before it ends
4. Enable the GPU in workspace when your booking starts, and make the best use of it!

:::warning Book a GPU

**By default you do not have the permission to run applications on GPU**, you need to make a reservation.

You can check the availability of our GPUs, and reserve GPU slots in the [GPU booking calendar 📅](/gpu-booking)

:::

## Prepare your GPU workspace

You will first need to start your workspace without the GPU enabled, you can then prepare your experiments: clone the code, download the data, prepare scripts to install all requirements (the workspace will be restarted when you enable the GPU). 

### About the docker images

We are mainly using images provided by Nvidia, with all required drivers and optimizations for GPU pre-installed. You can access the workspace with JupyterLab and VisualStudio Code in your browser, and install dependencies with `apt-get`, `conda` or `pip` in the workspace.

We currently mainly use Tensorflow, PyTorch and CUDA, but any image available in the [Nvidia catalog](https://ngc.nvidia.com/catalog/containers) should be easy to deploy. Checkout [this documentation](https://github.com/MaastrichtU-IDS/jupyterlab#jupyterlab-on-gpu) for more details on how we build the optimized docker images for the DSRI GPUs. And feel free to [extend the images](https://github.com/MaastrichtU-IDS/jupyterlab#extend-an-image) to install any software you need.

### Deploy the workspace

You can easily deploy your GPU workspace from the DSRI catalog:

1. Go to the [DSRI Catalog web UI](https://console-openshift-console.apps.dsri2.unimaas.nl/catalog): Click on **Add to Project**, then **Browse Catalog**
2. Search the catalog for  "GPU", and make sure the Template checkbox is enabled
3. Choose the template: **JupyterLab on GPU**
4. Follow the instructions to create the template in the DSRI web UI, all informations about the images you can use are provided there. The most notable is the base image you want to use for your workspace (`cuda`, `tensorflow` or `pytorch`)

Access the workspace from the route created (the small arrow at the top right of your application bubble in the Topology page).

### Prepare the workspace

You can now add your code and data in the persistent folder to be fully prepared when you will get access to the GPUs.

You can install dependencies with `apt-get`, `conda` or `pip`. We recommend your to use scripts stored in the persistent folder to easily install all your requirements, so you can reinstall them when we enable the GPU, as it restarts the workspace.

For more informations on how to use `conda`/`mamba` to install new dependencies or complete environment (useful if you need to use a different version of python than the one installed by default) checkout [this page](/docs/deploy-jupyter#%EF%B8%8F-manage-dependencies-with-conda). 

⚠️ We recommend you to also try and debug your code on small sample using the CPU before getting the GPU, this way you will be able to directly start long running task when you get the GPU, instead of losing time debugging your code (it's probably not going to work on the first try, you know it).

You can find more details on the images we use and how to extend them [in this repository](https://github.com/MaastrichtU-IDS/jupyterlab#jupyterlab-on-gpu).

:::info Storage

Use the **`/workspace/persistent` folder**, which is the JupyterLab workspace, to store your code and data persistently. Note that loading data from the persistent storage will be slowly that what you might expected, this is due to the nature of the distributed storage. So try to optimize this part and avoid reloading multiple time your data, and let us know if it is too much of a problem, we have some solution to improve this

:::

## Enable the GPU

You will receive an email when the GPU has been enabled in your project. You can then update your deployment to use the GPUs using this command (our deployment name is `jupyterlab-gpu` in those 2 examples, change it to yours if it is different)

```bash
oc patch dc/jupyterlab-gpu --type=json -p='[{"op": "replace", "path": "/spec/template/spec/containers/0/resources", "value": {"requests": {"nvidia.com/gpu": 1}, "limits": {"nvidia.com/gpu": 1}}}]'
```

Then wait for the pod to restart, or start it if it was stopped.

You can use the following command in the terminal of your container on the DSRI to see the current GPU usage:

```bash
nvidia-smi
```

## Disable the GPU

The GPU allocated to your workspace will be automatically disabled the after your booking ends at 9:00.

You can also manually disable the GPU from your app, the pod will be restarted automatically on a CPU node:

```bash
oc patch dc/jupyterlab-gpu --type=json -p='[{"op": "replace", "path": "/spec/template/spec/containers/0/resources", "value": {}}]'
```

<!--
### TensorBoard logs visualization

When using Tensorflow, you can try to use [**TensorBoard 📈**](https://www.tensorflow.org/tensorboard) to explore your machine learning runs. It should be already pre-installed in our JupyterLab for GPU templates.

Follow the usual process to run tensorboard: https://www.tensorflow.org/tensorboard/get_started

1. Add the tensorboard callback to your `model.fit()` function
2. Then start Tensorboard in the terminal with `tensorboard --logdir logs` (change the directory depending on where the logs of your runs are stored), it should tell you that tensorboard as been started on port 6006
3. At this point you should be able to open the Tensorboard view from the JupyterLab welcome page
-->

## Increase the number of GPUs

If you have been granted a 2nd GPU to speed up your experiment you can easily upgrade the number of GPU used by your workspace:

From the **Topology** view click on your application:

1. Stop the application, by decreasing the number of pod to 0 (in the **Details** tab)
2. Click on **Options** > **Edit Deployment** > in the YAML of the deployment search for `limits` and change the number of GPU assigned to your deployment to 2:

```yaml
          resources:
            limits:
              nvidia.com/gpu: '2'
            requests:
              nvidia.com/gpu: '2'
```

You can also do it using the command line, make sure to stop the pod first, and replace `jupyterlab-gpu` by your app name in this command:

```bash
oc patch dc/jupyterlab-gpu --type=json -p='[{"op": "replace", "path": "/spec/template/spec/containers/0/resources", "value": {"requests": {"nvidia.com/gpu": 2}, "limits": {"nvidia.com/gpu": 2}}}]'
```

3. Restart the pod for your application (the same way you stopped it)

## Install GPU drivers in any image

You can also install the GPU drivers in any image and use this image directly.

See the latest official [Nvidia docs](https://nvidia.github.io/nvidia-container-runtime) to install the `nvidia-container-runtime`, which should contain all packages and drivers required to access the GPU from your application.

Here is an example of commands to add to a debian based `Dockerfile` to install the GPU drivers (note that this is not complete, you will need to check the latest instructions and do some research & development to get it to work):

```dockerfile
RUN curl -s -L https://nvidia.github.io/nvidia-container-runtime/gpgkey | \
    apt-key add - \ &&
    distribution=$(. /etc/os-release;echo $ID$VERSION_ID) \ &&
    curl -s -L https://nvidia.github.io/nvidia-container-runtime/$distribution/nvidia-container-runtime.list | 
RUN apt-get update \ &&
    apt-get install -y nvidia-container-runtime
```

Then, build your image in your DSRI project using `oc` from the folder where your put the `Dockerfile` (replace `custom-app-gpu` by your app name):

```bash
oc new-build --name custom-app-gpu --binary
oc start-build custom-app-gpu --from-dir=. --follow --wait
oc new-app custom-app-gpu
```

You will then need to edit the deployment to the `serviceAccountName: anyuid` and add a persistent storage

```bash
oc edit custom-app-gpu
```

Finally for when your reservation start, checkout the section above about how to enable the GPU in workspace 

See also: official [Nvidia docs for CUDA]( https://docs.nvidia.com/cuda/cuda-installation-guide-linux/index.html#debian-installation)
