---
id: deploy-on-gpu
title: GPU applications
---


:::warning Request GPU access

**By default you do not have the permission to run pods on GPU** 

If you want to run on GPU, **contact the [DSRI support team](mailto:dsri-support-l@maastrichtuniversity.nl)**, they will create the templates you need to start applications on GPU.

:::

We are using images provided by Nvidia, and optimized for GPU. We currently deployed Tensorflow and PyTorch with JupyterLab and VSCode, but any image available in the Nvidia catalog should be easy to deploy: https://ngc.nvidia.com/catalog/containers

## JupyterLab on GPU

Once your project has been granted access to GPUs, you can deploy applications on GPU from the catalog:

* Go to the [Catalog web UI](https://console-openshift-console.apps.dsri2.unimaas.nl/console/catalog): **Add to Project** > **Browse Catalog**
* **Filter** the catalog for  "**JupyterLab on GPU**"
* Choose one of the available templates:
  * **Pytorch on GPU with JupyterLab**.
  * **Tensorflow on GPU with JupyterLab**

The following parameters can be provided:

1. Provide a unique **Application name**
2. Provide a **Notebook token** (password to access the notebook)
3. The **number of GPUs** used by the application.
4. **Storage name**: the storage Persistent Volume Claim (PVC)
5. **Storage subpath**: path to the Notebook folder in the Persistent Volume Claim storage

Now that your template is created and its accessible from the **Topology** page of OpenShift web UI.

You can now access the JupyterLab UI, install your dependencies and run your experiments.

Use the **`notebooks` folder** in the JupyterLab workspace to store your code and data persistently, you can also take a look into the examples provided by Nvidia.

Use the following command to see your current GPU usage:

```bash
nvidia-smi
```

## VSCode on GPU

2 templates are available to deploy VisualStudio Code on GPU:

* Go to the [Catalog web UI](https://console-openshift-console.apps.dsri2.unimaas.nl/console/catalog): **Add to Project** > **Browse Catalog**
* **Filter** the catalog for "**VSCode on GPU**"
* Choose one of the available templates:
  * **Tensorflow on GPU with VisualStudio**
  * **PyTorch on GPU with VisualStudio**

For those pods VSCode cannot be accessed directly on a DSRI URL, you will need to forward the port to your localhost:

1. [Login to the DSRI](/docs/openshift-install) using `oc login`
2. Get the pod ID

```bash
oc get pods
```

3. Forward VSCode to http://localhost:8080

```bash
oc port-forward <pod_id> 8080:8080
```

4. Access VisualStudio Code on http://localhost:8080

Use the **`/root` folder** to store your code and data persistently.

Use the following command to see your current GPU usage:

```bash
nvidia-smi
```

:::caution Use Chrome

We recommend to **use Google Chrome** web browser as pasting in the terminal (`ctrl + shift + v`) won't work on Firefox

:::