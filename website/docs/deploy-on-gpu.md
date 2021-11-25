---
id: deploy-on-gpu
title: GPU applications
---


:::warning Request GPU access

**By default you do not have the permission to run pods on GPU** 

If you want to run on GPU, **contact the [DSRI support team](mailto:dsri-support-l@maastrichtuniversity.nl)**, they will create the templates you need to start applications on GPU.

:::

We are using images provided by Nvidia, and optimized for GPU. We currently deployed Tensorflow and PyTorch with JupyterLab and VSCode, but any image available in the Nvidia catalog should be easy to deploy: https://ngc.nvidia.com/catalog/containers

Checkout [this documentation](https://github.com/MaastrichtU-IDS/jupyterlab#jupyterlab-on-gpu) for more details on how we build the optimized docker images for the DSRI GPUs. Feel free to [extend the images](https://github.com/MaastrichtU-IDS/jupyterlab#extend-an-image) to your needs.

## Start a workspace on GPU

Start a workspace based on Ubuntu, with all drivers and dependencies for accessing already installed. You will be able to access it using the JupyterLab web UI and VisualStudio Code in the browser.

Once your project has been granted access to GPUs, you can deploy applications on GPU from the catalog:

1. Go to the [Catalog web UI](https://console-openshift-console.apps.dsri2.unimaas.nl/console/catalog): **Add to Project** > **Browse Catalog**

2. Filter the catalog for  "GPU"

3. Choose one of the available templates: **JupyterLab on GPU**.

4. **Follow the instructions** to create the template in the DSRI web UI, all informations about the images you can use are provided there.

Now that your template is created and its accessible from the **Topology** page of OpenShift web UI.

You can now access the JupyterLab web UI, install your dependencies and run your experiments.

Use the **`/workspace` folder**, which is the JupyterLab workspace, to store your code and data persistently.

Use the following command to see your current GPU usage:

```bash
nvidia-smi
```

### TensorBoard logs visualization

When using Tensorflow, you can use [**TensorBoard 📈**](https://www.tensorflow.org/tensorboard) to explore your machine learning runs. It should be already pre-installed in our JupyterLab for GPU templates.

Follow the usual process to run tensorboard: https://www.tensorflow.org/tensorboard/get_started

1. Add the tensorboard callback to your `model.fit()` function

2. Then start Tensorboard in the terminal with `tensorboard --logdir logs` (change the directory depending on where the logs of your runs are stored), it should tell you that tensorboard as been started on port 6006
3. Open the Tensorboard view from the JupyterLab welcome page


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

Here is an example of commands to add to a debian based `Dockerfile` to install the GPU drivers:

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

## Prepare your GPU workspace

:::warning Experimental

Experimental: this workflow is still experimental, let us know on Slack #helpdesk if you are interested in using it and helping us improve it.

:::

Start a GPU application from the template with `0` GPU set.

Access the workspace like you would normally, add your code and data.

Once the GPU quotas has been granted to your project, you can update your deployment to use the GPUs using this command (our deployment name is `jupyterlab-gpu` in this example, change it to yours)

```bash
oc patch dc/jupyterlab-gpu --type=json -p='[{"op": "replace", "path": "/spec/template/spec/containers/0/resources", "value": {"requests": {"nvidia.com/gpu": 1}, "limits": {"nvidia.com/gpu": 1}}}]'
```

Later you can remove the GPU from your app without stopping it:

```bash
oc patch dc/jupyterlab-gpu --type=json -p='[{"op": "replace", "path": "/spec/template/spec/containers/0/resources", "value": {"requests": {"nvidia.com/gpu": 0}, "limits": {"nvidia.com/gpu": 0}}}]'
```


## Reserve GPU for your experiments

:::warning Experimental

Still experimental.

:::

You can check the availability of the 8 GPUs of the DSRI through the Maastricht University Outlook Calendar:

1. Go to the your UM Outlook Calendar (through the desktop or web application)
2. Create a new Calendar group named "DSRI GPUs"
3. Add the 8 `EQUIP-PHS1-DSRIGPU` numbered from 1 to 8, e.g. `EQUIP-PHS1-DSRIGPU1-1P` to this Calendar Group. This way you will be able to quickly see when a GPU is free or reserved