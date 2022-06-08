---
id: deploy-on-gpu
title: GPU applications
---


:::warning Book a GPU

**By default you do not have the permission to run applications on GPU**, they need to be booked.

You can check the availability of our GPUs, and reserve GPU slots in our [GPU booking calendar 📅](/gpu-booking)

:::

We are using images provided by Nvidia, and optimized for GPU. We currently deployed Tensorflow and PyTorch with JupyterLab and VSCode, but any image available in the Nvidia catalog should be easy to deploy: https://ngc.nvidia.com/catalog/containers

Checkout [this documentation](https://github.com/MaastrichtU-IDS/jupyterlab#jupyterlab-on-gpu) for more details on how we build the optimized docker images for the DSRI GPUs. Feel free to [extend the images](https://github.com/MaastrichtU-IDS/jupyterlab#extend-an-image) to your needs.

## Prepare your GPU workspace

Start a workspace in your DSRI project with all drivers and dependencies for accessing the GPUs already installed. The workspace is based on Ubuntu, and you will be able to access it using the JupyterLab web UI and VisualStudio Code in the browser.

You can deploy your GPU workspace from the catalog:

1. Go to the [Catalog web UI](https://console-openshift-console.apps.dsri2.unimaas.nl/catalog): **Add to Project** > **Browse Catalog**
2. Filter the catalog for  "GPU"
3. Choose one of the available templates: **JupyterLab on GPU**.
4. **Follow the instructions** to create the template in the DSRI web UI, all informations about the images you can use are provided there. The most notable is the base image you want to use for your workspace (`cuda`, `tensorflow` or `pytorch`)

Access the workspace from the route created (the small arrow at the top right of your application bubble in the Topology page).

You can now add your code and data in the persistent folder to be fully prepared when you will get access to the GPUs.

You can find more details on the images we use and how to extend them in this repository: https://github.com/MaastrichtU-IDS/jupyterlab#jupyterlab-on-gpu

:::info Storage

Use the **`/workspace/persistent` folder**, which is the JupyterLab workspace, to store your code and data persistently. Note that loading data from the persistent storage will be slowly that what you might expected, this is due to the nature of the distributed storage. So try to optimize this part and avoid reloading multiple time your data, and let us know if it is too much of a problem, we have some solution to improve this

:::

## Enable GPU in your workspace

Once the GPU quotas has been granted to your project, you will receive a message on Slack, or email when it is done. You can then update your deployment to use the GPUs using this command (our deployment name is `jupyterlab-gpu` in those 2 examples, change it to yours)

```bash
oc patch dc/jupyterlab-gpu --type=json -p='[{"op": "replace", "path": "/spec/template/spec/containers/0/resources", "value": {"requests": {"nvidia.com/gpu": 1}, "limits": {"nvidia.com/gpu": 1}}}]'
```

You can use the following command in the terminal of your container on the DSRI to see the current GPU usage:

```bash
nvidia-smi
```

## Disable GPU in your workspace

Later you can remove the GPU from your app, the pod will be restarted automatically on a CPU node:

```bash
oc patch dc/jupyterlab-gpu --type=json -p='[{"op": "replace", "path": "/spec/template/spec/containers/0/resources", "value": {}}]'
```

### TensorBoard logs visualization

When using Tensorflow, you can try to use [**TensorBoard 📈**](https://www.tensorflow.org/tensorboard) to explore your machine learning runs. It should be already pre-installed in our JupyterLab for GPU templates.

Follow the usual process to run tensorboard: https://www.tensorflow.org/tensorboard/get_started

1. Add the tensorboard callback to your `model.fit()` function
2. Then start Tensorboard in the terminal with `tensorboard --logdir logs` (change the directory depending on where the logs of your runs are stored), it should tell you that tensorboard as been started on port 6006
3. At this point you should be able to open the Tensorboard view from the JupyterLab welcome page

:::warn 

We do not guarantee

:::


### Increase the number of GPUs in your workspace

If you already have a application running using 1 GPU, and you have been granted a 2nd GPU to speed up your experiment you can easily upgrade the number of GPU used by your application:

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

See the latest official [Nvidia docs](https://nvidia.github.io/nvidia-container-runtime) to install the `nvidia-container-runtime` (all packages and drivers required to access the GPU from your application)

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

You will then need to edit the deployment to add the GPU NodeSelector, the `serviceAccountName: anyuid` and add a persistent storage

```bash
oc edit custom-app-gpu
```

See also: official [Nvidia docs for CUDA]( https://docs.nvidia.com/cuda/cuda-installation-guide-linux/index.html#debian-installation)
