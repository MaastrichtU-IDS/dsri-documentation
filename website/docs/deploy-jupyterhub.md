---
id: deploy-jupyterhub
title: JupyterHub
---

JupyterHub is ideal to enable multiple users easily start predefined workspaces in the same project. 

:::info Experimental 🧪 

Deploying JupyterHub is still experimental, and it can be a bit tricky to configure. Feel free to [submit a ticket](https://servicedesk.icts.maastrichtuniversity.nl/tas/public/ssp/content/serviceflow?unid=1ffa93e9ecd94d938ad46e3cb24c2392) to ask for help.

:::

## Downloading and adjusting the config.yaml

:::warning Before you begin download the config.yaml

Download the preconfigured `config.yaml` from our [GitHub repository](https://raw.githubusercontent.com/MaastrichtU-IDS/dsri-documentation/refs/heads/master/applications/jupyterhub/config.yaml).
The default config that is provided by JupyterHub will not work. 

:::
#

### Setting user's default persistent volume size

#### Persistent volumes 

Persistent volumes are automatically created for each user and instance started in JupyterHub to ensure persistence of the data even if JupyterHub is stopped. You can find the persistent volumes in the DSRI web UI, go to the **Administrator** view > **Storage** > **Persistent Volume Claims**.

It is possible to change the default size of a persistent volume claim for a user in the `config.yaml`. In our `config.yaml` the default value is `2Gi`. However if you think that your users will need more storage space you can change this default size in the `config.yaml`. 

```bash
singleuser:
  # ...
  storage:
    capacity: 2Gi
```

### Configuring an authentication method

At the moment we support three different authentication methods. One for testing purposes (dummy authentication), one for people who are working alone in a JupyterHub instance or with one or two collaborators (allowed_users / admin_users authentication), and one for allowing groups of people to collaborate in the same JupyterHub instance (GitHub OAuth). By default the dummy authentication is set in the `config.yaml`. **Note that this is only for testing purposes!!!** However, with very few changes to the `config.yaml` you can set up the other authentication methods. For reference see [the zero2jupyterhub documentation about authentication methods](https://z2jh.jupyter.org/en/stable/administrator/authentication.html)

#### Dummy authentication

This authentication method is set by default and is only there so that you can easily test your JupyterHub instance without the need of setting up proper authentication. The catch with this method is that whatever username/password combination you fill in, you will get access! In other words this is **completely not safe to use in use cases other than testing!** 
In the `config.yaml` you see -besides the commented out other authentication methods- the following block of text:

```bash
hub:
  # ...
  config:
    JupyterHub:
      admin_access: true
      authenticator_class: dummy
```

Some parts are intentionally left out here, shown as dots `# ...` for better representation. If you are first setting up your JupyterHub instance you can leave this as is. Upon going to your instance via the URL you will get prompted with a login screen:

<img src="/img/jupyterhub-dummy-login.png" alt="" style={{maxWidth: '75%', maxHeight: '75%'}} />

#

Fill in any usernamer and password combination you would like and the user account will be made. Note that this user account literally is made and has its own pod in the project. It also has a persistent volume and all the other properties of any other user account created. However, you can use whatever password you want to access this account. In other words do not use this user actively and definitely do not store any (sensitive) data in this user account!

#### allow_users / admin_users authentication

If you will be working on your own in your JupyterHub instance it will be easiest to use the allow_users / admin_users authentication method. This method allows you to specify a user and admin account with a shared password. **It is important that you keep this password a secret and safe! If people will get their hands on this they can acces your JupyterHub instance and login as an admin, which can lead to hefty consequences.** 

If you want to make use of this config uncomment the following block of text and comment out the previous block of text seen at the `Dummy authentication` section above:

```bash
hub:
  # ...
  config:
    Authenticator:
      admin_users:
        - admin
      allowed_users:
        - user1
    DummyAuthenticator:
      password: a-shared-secret-password
    JupyterHub:
      authenticator_class: dummy
```

Note that this password is in plaintext in your `config.yaml`. **Do not use a password you use for other accounts, this is never a good idea and is surely not a good idea in this case!** Unfortunately it is not possible to set passwords in JupyterHub using secrets in the DSRI at the moment. If you need to share your JupyterHub instance with others we recommend you to use the GitHub OAuth authentication method described below. 

#### GitHub OAuth authentication

This authentication method is the most secure option we provide at the moment. The major caveat is that you and the people you want to collaborate with need a GitHub account. Moreover, you will need to create an organization and team within that organization, or have access to an organization and team. To set up an organization and team, please refer to GitHub's [documentation](https://docs.github.com/en/organizations). You grant the people authorization to log in into the JupyterHub instance with their GitHub account by adding them to a team in an organization in GitHub.

```bash
hub:
  # ...
  config:
    GitHubOAuthenticator:
      client_id: your-client-id
      client_secret: your-client-secret
      oauth_callback_url: https://<route name>-<project name>.apps.dsri2.unimaas.nl/hub/oauth_callback
    JupyterHub:
      authenticator_class: github
```

For creating an OAuth app in GitHub please refer to GitHub's [documentation](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app). The GitHub OAuth app will provide the client ID and client secret. Fill in the `<route name>` and `<project name>` at the `oauth_callback_url` section. To set up a route to get your `<route name>` see the following section: [Creating a secured route using the DSRI website](https://dsri.maastrichtuniversity.nl/docs/deploy-jupyterhub#creating-a-secured-route), or [Creating a secured route using the CLI](https://dsri.maastrichtuniversity.nl/docs/deploy-jupyterhub#creating-a-secured-route-1). Note that you can change the `<route name>` at a later moment by upgrading the `config.yaml`. 

#

## Deploying JupyterHub using the DSRI website 🪐

:::warning Before you begin download the config.yaml

Download the preconfigured `config.yaml` from our [GitHub repository](https://raw.githubusercontent.com/MaastrichtU-IDS/dsri-documentation/refs/heads/master/applications/jupyterhub/config.yaml).
The default config that is provided by JupyterHub will not work. 

:::

### Installing the JupyterHub Helm Chart repository

After you have created a project you can start with installing the JupyterHub Helm Chart. If you do not have access to DSRI or created a project yet, and you need to find out how, please refer to our [documentation.](https://dsri.maastrichtuniversity.nl/docs/)

:::info Helm Chart already available

The Helm Chart should be already made available for everyone to use on the DSRI platform. There will be no need to install the repository yourself.

:::

#

In `Developer` mode in your project, go to `Helm` in the sidepanel (1). Next, click on `Create` and choose `Repository` (2).

<img src="/img/jupyterhub-helm-chart-repo-add-one.png" alt="" style={{maxWidth: '100%', maxHeight: '100%'}} />

#

Then fill in the `Name`, `Display Name`, give it a `Description` and fill in the `URL`: https://hub.jupyter.org/helm-chart/. 

#

Next, click `Create`. 

<img src="/img/jupyterhub-helm-chart-repo-add-two.png" alt="" style={{maxWidth: '100%', maxHeight: '100%'}} />

#

### Installing the JupyterHub Helm Chart 

:::info 

At the moment the latest -and only- Helm Chart version which is supported by DSRI is version 3.3.8. Newer versions will not work, and older versions are not tested and/or configured!

:::

#

In `Developer` mode in your project, go to `Helm` in the sidepanel (1). Next, click on `Create` and choose `Helm Release` (2)

<img src="/img/jupyterhub-helm-chart-install-one.png" alt="" style={{maxWidth: '100%', maxHeight: '100%'}} />

#

Search for `jupyterhub` (or the name you gave the repository if you added the repository yourself), and choose the `JupyterHub` Helm Chart (1).

<img src="/img/jupyterhub-helm-chart-install-two.png" alt="" style={{maxWidth: '100%', maxHeight: '100%'}} />

#

Click `Create`.

<img src="/img/jupyterhub-helm-chart-install-three.png" alt="" style={{maxWidth: '100%', maxHeight: '100%'}} />

#

Click the `Chart version` drop down menu (1).

<img src="/img/jupyterhub-helm-chart-install-four.png" alt="" style={{maxWidth: '100%', maxHeight: '100%'}} />

#

And choose the right Chart version: `3.3.8` (1). Note that this is an important step, as we only support version 3.3.8 at the moment. Newer versions do not work yet and older versions we did not configure and/or test! 

<img src="/img/jupyterhub-helm-chart-install-five.png" alt="" style={{maxWidth: '100%', maxHeight: '100%'}} />

#

Now, change the config with the content of the `config.yaml` you have downloaded from our [GitHub repository](https://raw.githubusercontent.com/MaastrichtU-IDS/dsri-documentation/refs/heads/master/applications/jupyterhub/config.yaml).
Copy the content of the `config.yaml` and paste it in the highlighted box to replace the old with the new config. Click `Create` to install the JupyterHub Helm Chart.

<img src="/img/jupyterhub-helm-chart-install-six.png" alt="" style={{maxWidth: '100%', maxHeight: '100%'}} />

#

### Creating a secured route

Create a secured route, with TLS edge termination.

In `Developer` mode in your project, go to `Project` in the sidepanel (1). Next, click on `Route` (2).

<img src="/img/jupyterhub-helm-chart-route-one.png" alt="" style={{maxWidth: '100%', maxHeight: '100%'}} />

#

Next, click `Create`.

<img src="/img/jupyterhub-helm-chart-route-two.png" alt="" style={{maxWidth: '100%', maxHeight: '100%'}} />

#

Fill in the `Name` (1), choose the `Service`: `proxy-public` (2), choose the `Target Port`: `80 -> http (TCP)` (3), tick the box `Secure Route` (4), and finally choose `TLS Termination`: `Edge` (5). Next, click `Create`, to create the route.

<img src="/img/jupyterhub-helm-chart-route-three.png" alt="" style={{maxWidth: '100%', maxHeight: '100%'}} />

### Upgrading the config.yaml

You can upgrade your `config.yaml` easily in the DSRI web UI if you would like to change certain settings, such as user's default persistent volume claims, authentication methods, and many more things. Note that in some cases users who created an account with an old authentication method will still have access via that method, make sure you set up your preferred authentication method before allowing users to authenticate and use the JupyterHub instance.

#

In `Developer` mode in your project, go to `Helm` in the sidepanel (1). Next, click on your Helm Chart Release (2).

<img src="/img/jupyterhub-helm-chart-upgrade-chart-one.png" alt="" style={{maxWidth: '100%', maxHeight: '100%'}} />

#

Now, click the `Actions` drop down menu, and choose `Upgrade` (1).

<img src="/img/jupyterhub-helm-chart-upgrade-chart-two.png" alt="" style={{maxWidth: '100%', maxHeight: '100%'}} />

#

In the box -highlighted in the picutre below- you can make changes to the config.yaml. After you have made your changes, click `Upgrade` and your upgraded JupyterHub Helm Chart Release will automatically be deployed.

<img src="/img/jupyterhub-helm-chart-upgrade-chart-three.png" alt="" style={{maxWidth: '100%', maxHeight: '100%'}} />

#

:::success Configure JupyterHub

Feel free to [submit a ticket](https://servicedesk.icts.maastrichtuniversity.nl/tas/public/ssp/content/serviceflow?unid=1ffa93e9ecd94d938ad46e3cb24c2392) to ask for help configuring your JupyterHub.

:::

#

## Deploying JupyterHub using the Command Line Interface (CLI) 🪐

:::warning Before you begin download the config.yaml

Download the preconfigured `config.yaml` from our [GitHub repository](https://raw.githubusercontent.com/MaastrichtU-IDS/dsri-documentation/refs/heads/master/applications/jupyterhub/config.yaml).
The default config that is provided by JupyterHub will not work. 

:::

### Installing the JupyterHub Helm Chart repository

After you have created a project you can start with installing the JupyterHub Helm Chart. If you do not have access to DSRI or created a project yet, and you need to find out how, please refer to our [documentation.](https://dsri.maastrichtuniversity.nl/docs/)

:::info Helm Chart already available

The Helm Chart should be already made available for everyone to use on the DSRI platform. There will be no need to install the repository yourself.

:::

#

Add the JupyterHub Helm Chart repository:

```bash
helm repo add jupyterhub https://hub.jupyter.org/helm-chart/
helm repo update
```

### Installing the JupyterHub Helm Chart 

:::info 

At the moment the latest -and only- Helm Chart version which is supported by DSRI is version 3.3.8. Newer versions will not work, and older versions are not tested and/or configured!

:::

#

Make sure you use the right `config.yaml` downloaded from our [GitHub repository](https://raw.githubusercontent.com/MaastrichtU-IDS/dsri-documentation/refs/heads/master/applications/jupyterhub/config.yaml).

Install the Helm Chart using the following command:

```bash
helm upgrade --cleanup-on-fail \
  --install jupyterhub jupyterhub/jupyterhub \
  --version=3.3.8 \
  --namespace=<project name> \
  --values config.yaml
```
`<project name>` is the name of your project.

### Creating a secured route

Create a secured route, with TLS edge termination:

```bash
oc create route edge <NAME OF ROUTE> --namespace <project name> --service=proxy-public --port=http
```
`<project name>` is the name of your project.
`<NAME OF ROUTE>` is the name of the route. 

### Upgrading the config.yaml

Run the following command with your new config.yaml:

```bash
helm upgrade --cleanup-on-fail \
  --install jupyterhub jupyterhub/jupyterhub \
  --version=3.3.8 \
  --namespace=<project name> \
  --values config.yaml
```
`<project name>` is the name of your project.

#

:::success Configure JupyterHub

Feel free to [submit a ticket](https://servicedesk.icts.maastrichtuniversity.nl/tas/public/ssp/content/serviceflow?unid=1ffa93e9ecd94d938ad46e3cb24c2392) to ask for help configuring your JupyterHub.

:::


<!--

:::warning Restricted user

The users will be able to install new `pip` packages in their JupyterLab instance, but they will not have `sudo` privileges (so they cannot install `apt` or `yum` packages for example). This can be changed by editing the KubeSpawner python script in the ConfigMap to use `serviceAccountName: anyuid`

::: -->
