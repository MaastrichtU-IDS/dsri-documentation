---
id: deploy-on-gpu
title: Deploy on GPU
---

Feel free to propose new deployments using [pull requests](https://github.com/MaastrichtU-IDS/dsri-documentation/pulls) or request new ones by creating a [new issues](https://github.com/MaastrichtU-IDS/dsri-documentation/issues).

To deploy applications on GPUs your project will need to be enabled for GPU. Contact the [DSRI support team](mailto:dsri-support-l@maastrichtuniversity.nl) to request GPU access.

## PyTorch on GPU

Once your project has been granted access to GPUs:

* Go to the [Catalog web UI](https://app.dsri.unimaas.nl:8443/console/catalog): **Add to Project** > **Browse Catalog**
* **Filter** the catalog on the publisher "**Institute of Data Science, UM**"
* Click on the template **Pytorch on GPU as Root (Persistent)**.

The following parameters can be provided:

1. Provide a unique **Application name**
3. The **number of GPUs** used by the application.
4. **Storage name**: the storage Persistent Volume Claim (PVC)
5. **Storage subpath**: path to the Notebook folder in the Persistent Volume Claim storage

Now that your template is created and its accessible from the **Overview** page of OpenShift web UI.

## Tensorflow on GPU

Run JupyterLab with Tensorflow on GPU:

* Go to the [Catalog web UI](https://app.dsri.unimaas.nl:8443/console/catalog): **Add to Project** > **Browse Catalog**
* **Filter** the catalog on the publisher "**Institute of Data Science, UM**"
* Click on the **Tensorflow on GPU (Persistent)** template.

The following parameters can be provided:

1. Provide a unique **Application name**
2. Provide a **Notebook token** (password to access the notebook)
3. The **number of GPUs** used by the application.
4. Provide the **Docker image to deploy**, by default we are using an image from nvidia: `nvcr.io/nvidia/tensorflow:19.11-tf2-py3`
5. **Storage name**: the storage Persistent Volume Claim (PVC)
6. **Storage subpath**: path to the Notebook folder in the Persistent Volume Claim storage

Now that your template is created and its accessible from the **Overview** page of OpenShift web UI.

## Connect with the Terminal

First get the `<pod_id>` using your application name:

```shell
oc get pod --selector app=nvidia-tensorflow-gpu-myapp
```

Connect to the pod:

```shell
oc rsh <pod_id>
```

Copy data to the pod:

```shell
oc cp local_folder/ <pod_id>:/workspace
```

> `/workspace` is the working directory in the pod.
