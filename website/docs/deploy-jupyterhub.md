---
id: deploy-jupyterhub
title: JupyterHub
---

JupyterHub is ideal to enable multiple users easily start predefined workspaces in the same project. 

:::warning Experimental

🧪 Deploying JupyterHub is still experimental, and it can be a bit tricky to configure. Feel free to [submit a ticket](https://servicedesk.icts.maastrichtuniversity.nl/tas/public/ssp/content/serviceflow?unid=1ffa93e9ecd94d938ad46e3cb24c2392) to ask for help.

:::


## 🧊 Install kfctl

You will need to have the usual `oc` tool installed, and to install `kfctl` on your machine, a tool to deploy Kubeflow applications, download the [latest version for your OS 📥️](https://github.com/kubeflow/kfctl/releases) 

You can then install it by downloading the binary and putting it in your path, for example on Linux:

```bash
wget https://github.com/kubeflow/kfctl/releases/download/v1.2.0/kfctl_v1.2.0-0-gbc038f9_linux.tar.gz
tar -xzf kfctl_v1.2.0-0-gbc038f9_linux.tar.gz
sudo mv kfctl /usr/local/bin/
```

Clone the repository with the DSRI custom images and deployments for the OpenDataHub platform, and go to the `kfdef` folder:

```bash
git clone https://github.com/MaastrichtU-IDS/odh-manifests
cd odh-manifests/kfdef
```

## 🪐 Deploy JupyterHub

:::info Go the the kfdef folder

All scripts need to be run from the `kfdef` folder 📂

:::

You can deploy JupyterHub with 2 different authentications system, use the `KfDef` file corresponding to your need:

* For the default DSRI authentication based on UM login, use the `kfctl_openshift_dsri.yaml` file

* For GitHub authentication, use `kfctl_openshift_github.yaml`

  * You will need to create a new GitHub OAuth app: https://github.com/settings/developers

  * And provide the GitHub client ID and secret through environment variable before running the start script:

    ```bash
    export GITHUB_CLIENT_ID=YOUR_CLIENT_ID
    export GITHUB_CLIENT_SECRET=YOUR_CLIENT_SECRET
    ```

We recommend you to copy the `KfDef` file of your choice and use this copy to define your JupyterHub deployment.

In the `KfDef` file, you will need to change the `namespace:` to the DSRI project where you want to deploy JupyterHub.

Then you can deploy the JupyterHub described in your `KfDef` file using our script (which uses `kfctl` under the hood):

```bash
./start_odh.sh kfctl_openshift_dsri.yaml
```

🗄️ Persistent volumes are automatically created for each instance started in JupyterHub to insure persistence of the data even JupyterHub is stopped. You can find the persistent volumes in the DSRI web UI, go to the **Administrator** view > **Storage** > **Persistent Volume Claims**.

:::success Configure JupyterHub

You can further configure your JupyterHub deployment by editing the overlays defined in your `KfDef` file. Overlays can be found in the `odh-manifests` repository in the `jupyterhub/jupyterhub/overlays` folder. Feel free to [submit a ticket](https://servicedesk.icts.maastrichtuniversity.nl/tas/public/ssp/content/serviceflow?unid=1ffa93e9ecd94d938ad46e3cb24c2392) to ask for help configuring your JupyterHub.

:::

<!--

:::warning Restricted user

The users will be able to install new `pip` packages in their JupyterLab instance, but they will not have `sudo` privileges (so they cannot install `apt` or `yum` packages for example). This can be changed by editing the KubeSpawner python script in the ConfigMap to use `serviceAccountName: anyuid`

::: -->