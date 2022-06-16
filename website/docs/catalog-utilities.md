---
id: catalog-utilities
title: Utilities
---

Feel free to propose new services using [pull requests](https://github.com/MaastrichtU-IDS/dsri-documentation/pulls), or to request them by creating [new issues](https://github.com/MaastrichtU-IDS/dsri-documentation/issues).

## Ubuntu

### With the terminal

Start Ubuntu with the `root` user which has `sudo` permissions to install anything.

You can start the application using the **Ubuntu** template in the [Catalog web UI](https://console-openshift-console.apps.dsri2.unimaas.nl/catalog) (make sure the **Templates** checkbox is checked)

This template uses the Ubuntu image hosted on DockerHub, see its documentation at https://hub.docker.com/r/ubuntu

:::info Persistent data folder

📂 Use the `/root` folder (home of the root user) to store your data in the existing persistent storage. You can find the persistent volumes in the DSRI web UI, go to the **Administrator** view > **Storage** > **Persistent Volume Claims**.

:::

We enabled the port `8080` in the Ubuntu container if you need to deploy applications.

To quickly access it from the terminal you can use the **Terminal** tab in the pod page, or via your local terminal:

1. Get the Ubuntu pod ID:

   ```bash
   oc get pods
   ```

2. Connect to it:

   ```bash
   oc rsh POD_ID
   ```

3. Enable Bash in the Ubuntu container (if it starts with the Shell)

   ```bash
   bash
   ```

<img src="/img/screenshot-deploy-ubuntu.png" alt="Deploy Ubuntu" style={{maxWidth: '100%', maxHeight: '100%'}} />

### With a web UI

Start Ubuntu with a web UI accessible via a URL (using VNC). You will be the `root` user which has elevated permissions to install anything via `apt install <package-name>`. Before you install a package run `apt update`. This also solves `E: unable to locate package` and `E: no installation candidate` errors.

You can start the application using the **Ubuntu with web UI** template in the [Catalog web UI](https://console-openshift-console.apps.dsri2.unimaas.nl/catalog) (make sure the **Templates** checkbox is checked)

This template uses the Docker image defined at https://github.com/fcwu/docker-ubuntu-vnc-desktop

:::caution Less stable than the official image

This image might be less stable than the original Ubuntu image. Let us know on Slack if you have any problem!

:::


## File browser

Deploy a file browser on your persistent volume. This will provide a web UI to upload and download data to your DSRI persistent volume in case you need it (JupyterLab, RStudio and VisualStudio Code server already include a file browser)

You can start a container using the **File Browser for existing storage** template in the [Catalog web UI](https://console-openshift-console.apps.dsri2.unimaas.nl/catalog) (make sure the **Templates** checkbox is checked)

<img src="/img/screenshot-deploy-filebrowser.png" alt="Deploy File browser" style={{maxWidth: '100%', maxHeight: '100%'}} />

You can only deploy file browser on an existing Persistent Volume Claim, this enables you to add a web UI to access this storage.

The following parameters can be provided:

1. Provide a unique **Application name**. It will be used to generate the application URL.
2. Provide a **Password**, you will need to hash the password first for extra security, use this quick docker command to do it: `docker run filebrowser/filebrowser hash mypassword`
3. The **Storage name** of the Persistent Volume Claim  (PVC) that will be exposed by the filebrowser.
4. **Storage subpath** in the the Persistent Volume Claim that will be exposed by the filebrowser. Let it empty to use the Root folder of the persistent volume.

You can find the Storage name if you Go to the deployments page > Storage panel.

### Creating or Connecting an Existing Persistent Storage

Find more details about the how to [create persistent storage](https://maastrichtu-ids.github.io/dsri-documentation/docs/openshift-storage/#create-the-persistent-storage)

<img src="/img/screenshot_pvc_storage.png" alt="Create Persistent Storage" style={{maxWidth: '100%', maxHeight: '100%'}} />



<img src="/img/screenshot_pvc_storage_create.png" alt="Create Persistent Storage" style={{maxWidth: '100%', maxHeight: '100%'}} />

:::info 

The DSRI using the [**Openshift Container Stroage**](https://www.openshift.com/products/container-storage/) (` OCS`)  which is based on [**CEPH**](https://ceph.io/ceph-storage/) offers `ReadWriteOnce` and `ReadWriteMany` access mode. 

* `ReadWriteOnce` ([**RWO**](https://docs.openshift.com/container-platform/4.6/storage/understanding-persistent-storage.html)) volumes cannot be mounted on multiple nodes. Use the `ReadWriteMany` ([**RWX**](https://docs.openshift.com/container-platform/4.6/storage/understanding-persistent-storage.html)) access mode when possible. If a node fails, the system does not allow the attached RWO volume to be mounted on a new node because it is already assigned to the failed node. If you encounter a multi-attach error message as a result, force delete the pod on a shut down or crashed node. 

:::

Find more details about the how to [Connect the Existing persistent storage](https://maastrichtu-ids.github.io/dsri-documentation/docs/openshift-storage/#connect-the-existing-persistent-storage)

<img src="/img/screenshot_existing_storage.png" alt="Add Existing Persistent Storage" style={{maxWidth: '100%', maxHeight: '100%'}} />

<img src="/img/screenshot_add_storage.png" alt="Add Existing Persistent Storage" style={{maxWidth: '100%', maxHeight: '100%'}} />

:::info

You can try above method if you want to connect **more applications to the same storage**

:::

This deployment require to have  root user enabled on your project. Contact the [DSRI support team](mailto:dsri-support-l@maastrichtuniversity.nl)  or create a [new issues](https://github.com/MaastrichtU-IDS/dsri-documentation/issues) to request root access or to create persistent volume for your project if you don't have them .

:::info Credentials

Default credentials will be username `admin` and password `admin`

:::

:::caution Change password

Please **change the password in the Filebrowser Web UI** once it has been created.

:::