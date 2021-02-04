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

This deployment require to have  root user enabled on your project. Contact the [DSRI support team](mailto:dsri-support-l@maastrichtuniversity.nl)  or create a [new issues](https://github.com/MaastrichtU-IDS/dsri-documentation/issues) to request root access or to create persistent volume for your project if you don't have them .

:::info Credentials

Default credentials will be username `admin` and password `admin`

:::

:::caution Change password

Please **change the password in the Filebrowser Web UI** once it has been created.

:::

<img src="/dsri-documentation/img/screenshot-filebrowser-login.png" alt="File browser Web UI" style={{maxWidth: '50%', maxHeight: '50%'}} />