---
id: catalog-utilities
title: Utilities
---

Feel free to propose new services using [pull requests](https://github.com/MaastrichtU-IDS/dsri-documentation/pulls) or request new ones by creating a [new issues](https://github.com/MaastrichtU-IDS/dsri-documentation/issues).

## Ubuntu

Start Ubuntu with the `root` user which has `sudo` permissions to install anything.

Add the [template](https://github.com/MaastrichtU-IDS/dsri-openshift-applications/blob/main/templates-anyuid/template-ubuntu-root-persistent.yml) to your project:

```bash
oc apply -f https://raw.githubusercontent.com/MaastrichtU-IDS/dsri-openshift-applications/main/templates-anyuid/template-ubuntu-root-persistent.yml
```

This template uses the Ubuntu image hosted on DockerHub, see its documentation at https://hub.docker.com/r/ubuntu

:::caution Root permission required

🔒 You need root containers enabled (aka. anyuid) in your project to start this application.

:::

:::info Persistent data folder

📂 Use the `/root` folder (home of the root user) to store your data in the existing persistent storage

We enabled the port `8080` in the Ubuntu container if you need to deploy applications.

:::

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

<img src="/dsri-documentation/img/screenshot-deploy-ubuntu.png" alt="Deploy Ubuntu" style={{maxWidth: '100%', maxHeight: '100%'}} />



## Trinity RNA Seq

Trinity assembles transcript sequences from Illumina RNA-Seq data. It represents a novel method for the efficient and robust the new reconstruction of transcriptomes from RNA-seq data. [GitHub](https://github.com/trinityrnaseq/trinityrnaseq)

<img src="/dsri-documentation/img/screenshot_trinityrnaseq.png" alt="Deploy Trinity RNA Seq" style={{maxWidth: '100%', maxHeight: '100%'}} />



Add the [template](https://github.com/MaastrichtU-IDS/dsri-openshift-applications/blob/main/okd4-templates-anyuid/template-trinityrnaseq.yml) to your project:

```bash
oc apply -f https://raw.githubusercontent.com/MaastrichtU-IDS/dsri-openshift-applications/main/okd4-templates-anyuid/template-trinityrnaseq.yml
```

This template uses the Trinity image hosted as a UM github package https://github.com/orgs/maastrichtu-ids/packages/container/package/trinityrnaseq

:::caution Root permission required

🔒 You need root containers enabled (aka. anyuid) in your project to start this application.

:::

:::info Persistent data folder

📂 Use the `/usr/local/src/work` folder (home of the root user) to store your data in the existing persistent storage

We enabled the port `8787` in the Ubuntu container if you need to deploy applications.

:::

## File browser

Deploy a file browser on your persistent volume. This will provide a web UI to upload and download data to your DSRI persistent volume in case you need it (JupyterLab, RStudio and VisualStudio Code server already include a file browser)

:::caution Root permission required

🔒 You need root containers enabled (aka. anyuid) in your project to start this application.

:::

Add the file browser template:

```bash
oc apply -f https://raw.githubusercontent.com/MaastrichtU-IDS/dsri-openshift-applications/main/templates-anyuid/template-filebrowser.yml
```

Then the file browser can be deployed from the [OpenShift Catalog](https://console-openshift-console.apps.dsri2.unimaas.nl/console/catalog):

<img src="/dsri-documentation/img/screenshot-deploy-filebrowser.png" alt="Deploy File browser" style={{maxWidth: '100%', maxHeight: '100%'}} />

We can only deploy file browser as a Persistent deployment.

🗄️ **Persistent**: use an existing Persistent Volume Claim (PVC) for a persistent storage of the data.

The following parameters can be provided:

1. Provide a unique **Application name**. It will be used to generate the application URL.
2. The **Storage name** of the Persistent Volume Claim  (PVC) that will be exposed by the filebrowser.
3. **Storage subpath** in the the Persistent Volume Claim that will be exposed by the filebrowser. Let it empty to use the Root folder of the persistent volume.

You can find the Storage name if you Go to the deployments page > Storage panel.

### Creating or Connecting an Existing Persistent Storage

Find more details about the how to [create persistent storage](https://maastrichtu-ids.github.io/dsri-documentation/docs/openshift-storage/#create-the-persistent-storage)

<img src="/dsri-documentation/img/screenshot_pvc_storage.png" alt="Create Persistent Storage" style={{maxWidth: '100%', maxHeight: '100%'}} />



<img src="/dsri-documentation/img/screenshot_pvc_storage_create.png" alt="Create Persistent Storage" style={{maxWidth: '100%', maxHeight: '100%'}} />

:::info 

The DSRI using the [**Openshift Container Stroage**](https://www.openshift.com/products/container-storage/) (` OCS`)  which is based on [**CEPH**](https://ceph.io/ceph-storage/) offers `ReadWriteOnce` access mode. 

* `ReadWriteOnce` ([**RWO**](https://docs.openshift.com/container-platform/4.6/storage/understanding-persistent-storage.html)) volumes cannot be mounted on multiple nodes. If a node fails, the system does not allow the attached RWO volume to be mounted on a new node because it is already assigned to the failed node. If you encounter a multi-attach error message as a result, force delete the pod on a shut down or crashed node.

:::

Find more details about the how to [Connect the Existing persistent storage](https://maastrichtu-ids.github.io/dsri-documentation/docs/openshift-storage/#connect-the-existing-persistent-storage)

<img src="/dsri-documentation/img/screenshot_existing_storage.png" alt="Add Existing Persistent Storage" style={{maxWidth: '100%', maxHeight: '100%'}} />

<img src="/dsri-documentation/img/screenshot_add_storage.png" alt="Add Existing Persistent Storage" style={{maxWidth: '100%', maxHeight: '100%'}} />

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

<img src="/dsri-documentation/img/screenshot-filebrowser-login.png" alt="File browser Web UI" style={{maxWidth: '50%', maxHeight: '50%'}} />