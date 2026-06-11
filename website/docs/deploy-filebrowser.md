---
id: deploy-filebrowser
title: Filebrowser
---

Filebrowser provides a web UI to upload and download files to and from a persistent volume on the DSRI. It is useful when your application does not have a built-in file manager. Note that JupyterLab, RStudio, and Visual Studio Code already include a file browser, so you only need this for other deployments.

:::caution

Filebrowser can only be deployed on an **existing** Persistent Volume Claim. Make sure you have one before deploying. Contact the DSRI team at [rcs-ub@maastrichtuniversity.nl](mailto:rcs-ub@maastrichtuniversity.nl) if you need one created.

:::

## Deploy

Find the **File Browser for existing storage** template in the [DSRI Catalog](https://console-openshift-console.apps.dsri2.unimaas.nl/catalog) (make sure the **Templates** checkbox is checked) and instantiate it with the following parameters:

1. **Application name** — must be unique within your project. It will be used to generate the application URL.
2. **Password** — hash the password first for security using:
```bash
   docker run filebrowser/filebrowser hash mypassword
```
3. **Storage name** — the name of the Persistent Volume Claim (PVC) to expose. Find it under **Deployments** > **Storage** panel, or in the DSRI web UI under **Administrator view** > **Storage** > **Persistent Volume Claims**.
4. **Storage subpath** — the subfolder within the PVC to expose. Leave empty to expose the root of the volume.

:::info Default credentials

The default username is `admin` and the default password is `admin`. **Change the password immediately** after first login via the Filebrowser web UI.

:::

## Persistent storage

Filebrowser mounts directly onto an existing PVC — it does not create new storage. To connect multiple applications to the same storage, add the existing PVC to each application via **Deployments** > **Storage** panel.

For more details on creating and connecting persistent storage, see the [Storage documentation](https://maastrichtu-ids.github.io/dsri-documentation/docs/openshift-storage/#create-the-persistent-storage).

## Particularities

### Storage access modes

The DSRI storage supports two access modes:

- **ReadWriteMany (RWX)** — the volume can be mounted on multiple nodes simultaneously. Use this when possible.
- **ReadWriteOnce (RWO)** — the volume can only be mounted on one node at a time. If that node fails, the volume cannot be remounted on another node until the pod is force-deleted.