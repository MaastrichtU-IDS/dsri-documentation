---
id: deploy-jupyterhub
title: JupyterHub
---

JupyterHub allows multiple users to launch their own JupyterLab workspaces within the same project. It is ideal for courses, workshops, or collaborative research where everyone needs a consistent, pre-configured environment.

:::info

Configuring and deploying JupyterHub can be complex. Feel free to [submit a ticket](https://servicedesk.icts.maastrichtuniversity.nl/tas/public/ssp/content/serviceflow?unid=1ffa93e9ecd94d938ad46e3cb24c2392) to ask for help.

:::

## Deploy

Download the preconfigured `config-basic.yaml` from our [GitHub repository](https://raw.githubusercontent.com/MaastrichtU-IDS/dsri-documentation/refs/heads/master/applications/jupyterhub/config-basic.yaml). The default config provided by JupyterHub will not work on the DSRI.

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

status_code = r.status_code
print('Status code:', status_code)

status = r.raise_for_status()
print('Status:', status)

users = r.json()
print(json.dumps(users, indent=3))
```