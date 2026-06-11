---
id: deploy-jupyterhub
title: JupyterHub
---

JupyterHub allows multiple users to launch their own JupyterLab workspaces within the same project. It is ideal for courses, workshops, or collaborative research where everyone needs a consistent, pre-configured environment.

:::info

Configuring and deploying JupyterHub can be complex. Feel free to [submit a ticket](https://servicedesk.icts.maastrichtuniversity.nl/tas/public/ssp/content/serviceflow?unid=1ffa93e9ecd94d938ad46e3cb24c2392) to ask for help.

:::

## Before you begin

Download the preconfigured `config-basic.yaml` from our [GitHub repository](https://raw.githubusercontent.com/MaastrichtU-IDS/dsri-documentation/refs/heads/master/applications/jupyterhub/config-basic.yaml). The default config provided by JupyterHub will not work on the DSRI.

## Deploy

JupyterHub is deployed using a Helm chart. You can do this either via the DSRI web UI or the CLI.

### Via the DSRI web UI

1. In **Developer** mode, go to **Helm** in the side panel, click **Create** and choose **Helm Release**.
2. Search for `jupyterhub` and select the **JupyterHub** Helm Chart.
3. Click **Create**, then open the **Chart version** dropdown and select version `3.3.8`. This is the only version currently supported on the DSRI.
4. Replace the default config with the content of the `config-basic.yaml` you downloaded, and click **Create**.

Once deployed, create a secured route with TLS edge termination:

- In **Developer** mode, go to **Project** in the side panel, then click **Route** > **Create**.
- Fill in a **Name**, choose **Service**: `proxy-public`, **Target Port**: `80 -> http (TCP)`, tick **Secure Route**, and set **TLS Termination** to **Edge**. Click **Create**.

### Via the CLI

Add the JupyterHub Helm Chart repository:

```bash
helm repo add jupyterhub https://hub.jupyter.org/helm-chart/
helm repo update
```

Install the Helm Chart using your downloaded `config-basic.yaml`:

```bash
helm upgrade --cleanup-on-fail \
  --install jupyterhub jupyterhub/jupyterhub \
  --version=3.3.8 \
  --namespace=<project-name> \
  --values config-basic.yaml
```

Create a secured route:

```bash
oc create route edge <route-name> --namespace <project-name> --service=proxy-public --port=http
```

### Upgrading the config

To apply changes to your config, run the same `helm upgrade` command with the updated `config-basic.yaml`. In the web UI, go to **Helm** > click your Helm Release > **Actions** > **Upgrade**, edit the config, and click **Upgrade**.

:::caution

In some cases, users who authenticated with an old method will retain access after you change the authentication config. Set your preferred authentication method before allowing users in.

:::

## Persistent storage

A persistent volume is automatically created for each user when they log in for the first time. Data is preserved even if JupyterHub is stopped. You can find persistent volumes in the DSRI web UI under **Administrator view** > **Storage** > **Persistent Volume Claims**.

The default size is `2Gi`. You can change it in `config-basic.yaml`:

```yaml
singleuser:
  storage:
    capacity: 2Gi
```

## Particularities

### Authentication

Three authentication methods are supported:

**Dummy authentication** (default, testing only) — any username and password combination will work. Do not use this for real workloads or store any data in accounts created this way.

```yaml
hub:
  config:
    JupyterHub:
      admin_access: true
      authenticator_class: dummy
```

**Allowed users / admin users** — specify a fixed list of users and a shared password. Keep this password private and do not reuse it from other accounts.

```yaml
hub:
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

**GitHub OAuth** (recommended for groups) — users log in with their GitHub account. Requires creating a [GitHub OAuth app](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app). Replace `<route-name>` and `<project-name>` with your values:

```yaml
hub:
  config:
    GitHubOAuthenticator:
      client_id: your-client-id
      client_secret: your-client-secret
      oauth_callback_url: https://<route-name>-<project-name>.apps.dsri2.unimaas.nl/hub/oauth_callback
      admin_users:
        - your-github-username
      allowed_users:
        - username1
        - username2
      scope:
        - read:org
    JupyterHub:
      authenticator_class: github
```

You can also grant access based on GitHub organization membership or specific teams:

```yaml
allowed_organizations:
  - my-github-organization        # whole org
  # or:
  - my-github-organization:my-team  # specific team
```

:::info UM SSO login

It is possible to enable UM SSO login for your JupyterHub instance. Contact [rcs-ub@maastrichtuniversity.nl](mailto:rcs-ub@maastrichtuniversity.nl) to set this up.

:::

### Notebook image

The default image is `quay.io/jupyterhub/k8s-singleuser-sample:3.3.8`. You can change it in `config-basic.yaml` to any Jupyter docker stack image. For example, to use the TensorFlow image:

```yaml
singleuser:
  image:
    name: quay.io/jupyter/tensorflow-notebook
    tag: 87b37b4fd818
```

Find available images and tags at [quay.io/organization/jupyter](https://quay.io/organization/jupyter). See the [Jupyter documentation](https://jupyter-docker-stacks.readthedocs.io/en/latest/using/selecting.html) for more details.

To offer users a choice of images at login, use the `profileList` option — see the [config-extensive.yaml](https://raw.githubusercontent.com/MaastrichtU-IDS/dsri-documentation/refs/heads/master/applications/jupyterhub/config-extensive.yaml) for a working example.

### Spawner timeouts

If sessions fail to start with a timeout error, increase the timeouts in your config:

```yaml
hub:
  config:
    KubeSpawner:
      start_timeout: 300
      http_timeout: 300
```

### API access

You can interact with your JupyterHub instance via the [JupyterHub REST API](https://jupyterhub.readthedocs.io/en/stable/reference/rest-api.html). To get your API token, log in to your JupyterHub instance, go to **File** > **Hub Control Panel** > **Token**, and click **Request new API token**.

Example — list all users:

```python
import requests, json

api_token = '<TOKEN>'
api_url = '<URL>/hub/api'

r = requests.get(f'{api_url}/users',
    headers={'Authorization': f'token {api_token}'})

print(json.dumps(r.json(), indent=3))
```