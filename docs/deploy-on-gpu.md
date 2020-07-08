---
id: deploy-on-gpu
title: Deploy on GPU
---

Feel free to propose new deployments using [pull requests](https://github.com/MaastrichtU-IDS/dsri-documentation/pulls) or request new ones by creating a [new issues](https://github.com/MaastrichtU-IDS/dsri-documentation/issues).



## PyTorch as Root user

To deploy Pytorch on GPU you need to have root access and persistent volume. Contact the [DSRI support team](mailto:dsri-support-l@maastrichtuniversity.nl) to request root and access to the template, if you don't have them.

Go to the [Catalog web UI](https://app.dsri.unimaas.nl:8443/console/catalog) run the Pytorch on GPU template.

The following parameters can be provided:

1. Provide a unique **Application name**
3. The **number of GPUs** used by the application.
4. **Storage name**: the storage Persistent Volume Claim (PVC)
5. **Storage subpath**: path to the Notebook folder in the Persistent Volume Claim storage

Now that your template is created and its accessible from the **overview** page of Open Shift web UI.

## Tensorflow on GPU

Contact the [DSRI support team](mailto:dsri-support-l@maastrichtuniversity.nl) if you want to run on GPU.

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
