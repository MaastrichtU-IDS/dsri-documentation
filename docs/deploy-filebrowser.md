---
id: deploy-filebrowser
title: Deploy File Browser
---

Services available for the **Data Science Research Infrastructure**.

Feel free to propose new services using [pull requests](https://github.com/MaastrichtU-IDS/dsri-documentation/pulls) or request new ones by creating a [new issues](https://github.com/MaastrichtU-IDS/dsri-documentation/issues).

---

## File Browser

Deploy a filebrowser on your persistent volume. This will provide a web UI to upload and download data to your DSRI persistent volume.

File browser can be deployed from the [OpenShift Catalog](https://app.dsri.unimaas.nl:8443/console/catalog):

<img src="/dsri-documentation/img/screenshot-deploy-filebrowser.png" alt="Deploy File browser" style="max-width: 100%; max-height: 100%;" />

We can only deploy file browser as a Persistent deployment.

🗄️ **Persistent**: use a Persistent Volume Claim (PVC) for a persistent storage of the data.

The following parameters can be provided:

1. Provide a unique **Application name**. It will be used to generate the application URL.
2. The **Storage name** of the Persistent Volume Claim  (PVC) that will be exposed by the filebrowser.
3. **Storage subpath** in the the Persistent Volume Claim that will be exposed by the filebrowser. Let it empty to use the Root folder of the persistent volume.

You can find the Storage name if you Go to the deployments page > Storage panel.

This deployment require to have  root user enabled on your project. Contact the [DSRI support team](mailto:dsri-support-l@maastrichtuniversity.nl)  or create a [new issues](https://github.com/MaastrichtU-IDS/dsri-documentation/issues) to request root access or to create persistent volume for your project if you don't have them .

Default credentials will be

* login: "admin" 

* password: "admin" 

  *Please change the password in the Filebrowser Web UI once it has been created.*

<img src="/dsri-documentation/img/screenshot-filebrowser-login.png" alt="File browser Web UI" style="max-width: 50%; max-height: 50%;" />