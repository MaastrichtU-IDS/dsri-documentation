---
id: deploy-on-gpu
title: GPU applications
---


:::warning Request GPU access

**By default you do not have the permission to run pods on GPU** 

If you want to run on GPU, **contact the [DSRI support team](mailto:dsri-support-l@maastrichtuniversity.nl)**, they will create the templates you need to start applications on GPU.

:::

We are using images provided by Nvidia, and optimized for GPU. We currently deployed Tensorflow and PyTorch with JupyterLab and VSCode, but any image available in the Nvidia catalog should be easy to deploy: https://ngc.nvidia.com/catalog/containers

Checkout [this documentation](https://github.com/MaastrichtU-IDS/jupyterlab#jupyterlab-on-gpu) for more details on how we build the optimized docker images for the DSRI GPUs. Feel free to extend the `gpu.dockerfile` to your needs.

## JupyterLab on GPU

Once your project has been granted access to GPUs, you can deploy applications on GPU from the catalog:

* Go to the [Catalog web UI](https://console-openshift-console.apps.dsri2.unimaas.nl/console/catalog): **Add to Project** > **Browse Catalog**
* **Filter** the catalog for  "**GPU**"
* Choose one of the available templates: **JupyterLab on GPU**.

The following parameters can be provided:

1. Provide a unique **Application name**
2. Provide a **Notebook token** (password to access the notebook)
3. The **number of GPUs** used by the application.
4. **Storage name**: the storage Persistent Volume Claim (PVC)
5. **Storage subpath**: path to the Notebook folder in the Persistent Volume Claim storage

Now that your template is created and its accessible from the **Topology** page of OpenShift web UI.

You can now access the JupyterLab UI, install your dependencies and run your experiments.

Use the **`/workspace` folder**, which is the JupyterLab workspace, to store your code and data persistently, you can also take a look into the examples provided by Nvidia.

Use the following command to see your current GPU usage:

```bash
nvidia-smi
```

### TensorBoard logs visualization

You can easily use [**TensorBoard 📈**](https://www.tensorflow.org/tensorboard) to explore your machine learning runs. It is already pre-installed and ready-to-use in ouyr JupyterLab for GPU templates.

All you need is to follow the usual process to run tensorboard: https://www.tensorflow.org/tensorboard/get_started

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

3. Restart the pod for your application (the same way you stopped it)

## Install GPU driver in any image

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

Then, build the FSL on GPU in your DSRI project using `oc` from the folder where your put the `Dockerfile`:

```bash
oc new-build --name fsl-gpu --binary
oc start-build fsl-gpu --from-dir=. --follow --wait
oc new-app fsl-gpu
```

You will then need to edit the deployment to add the GPU NodeSelector, the `serviceAccountName: anyuid` and add a persistent storage

```bash
oc edit fsl-gpu
```

See also: official [Nvidia docs for CUDA]( https://docs.nvidia.com/cuda/cuda-installation-guide-linux/index.html#debian-installation)

## Reserve GPU for your experiments

Still experimental, you can check the availability of the 8 GPUs of the DSRI through the Maastricht University Outlook Calendar:

1. Go to the your UM Outlook Calendar (through the desktop or web application)
2. Create a new Calendar group named "DSRI GPUs"
3. Add the 8 `EQUIP-PHS1-DSRIGPU` numbered from 1 to 8, e.g. `EQUIP-PHS1-DSRIGPU1-1P` to this Calendar Group. This way you will be able to quickly see when a GPU is free or reserved