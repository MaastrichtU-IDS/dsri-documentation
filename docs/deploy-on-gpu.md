---
id: deploy-on-gpu
title: Deploy on GPU
---

Feel free to propose new deployments using [pull requests](https://github.com/MaastrichtU-IDS/dsri-documentation/pulls) or request new ones by creating a [new issues](https://github.com/MaastrichtU-IDS/dsri-documentation/issues).

To deploy applications on GPUs your project will need to be enabled for GPU. Contact the [DSRI support team](mailto:dsri-support-l@maastrichtuniversity.nl) to request GPU access.

## JupyterLab on GPU

Once your project has been granted access to GPUs:

* Go to the [Catalog web UI](https://app.dsri.unimaas.nl:8443/console/catalog): **Add to Project** > **Browse Catalog**
* **Filter** the catalog on the publisher "**Institute of Data Science, UM**"
* Choose on the template:
  * **Pytorch on GPU as Root (Persistent)**.
  * **Tensorflow on GPU (Persistent)**

The following parameters can be provided:

1. Provide a unique **Application name**
2. Provide a **Notebook token** (password to access the notebook)
3. The **number of GPUs** used by the application.
4. **Storage name**: the storage Persistent Volume Claim (PVC)
5. **Storage subpath**: path to the Notebook folder in the Persistent Volume Claim storage

Now that your template is created and its accessible from the **Overview** page of OpenShift web UI.

## VSCode on GPU

2 templates are available to deploy VisualStudio Code on GPU:

* Go to the [Catalog web UI](https://app.dsri.unimaas.nl:8443/console/catalog): **Add to Project** > **Browse Catalog**
* **Filter** the catalog on the publisher "**Institute of Data Science, UM**"
* Choose on the template:
  * **Tensorflow on GPU with VisualStudio (Persistent)**
  * **PyTorch on GPU with VisualStudio (Persistent)**

For those pods VSCode cannot be accessed directly on a DSRI URL, you will need to forward the port to your localhost:

1. [Login to the DSRI](/docs/openshift-login) using `oc login`
2. Get the pod ID

```bash
oc get pods
```

3. Forward VSCode to http://localhost:8080

```bash
oc port-forward <pod_id> 8080:8080
```

> Access VisualStudio Code on http://localhost:8080