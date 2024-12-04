Reference documentation: https://z2jh.jupyter.org/en/stable/jupyterhub/installation.html

For extended documentation on how to install JupyterHub in OpenShift see: https://dsri.maastrichtuniversity.nl/docs/deploy-jupyterhub/

## Install the Helm Chart 

Add the JupyterHub Helm Chart repository:

```bash
helm repo add jupyterhub https://hub.jupyter.org/helm-chart/
helm repo update
```

## Deploy JupyterHub

At the moment the latest -and only- version that is supported by DSRI is version 3.3.8. Newer versions will not work, and older versions are not tested and/or configured!

```bash
helm upgrade --cleanup-on-fail \
  --install jupyterhub jupyterhub/jupyterhub \
  --version=3.3.8 \
  --namespace=<NAMESPACE> \
  --values config.yaml
```

Note that this config.yaml will use dummy authentication, in other words you can fill in whatever user/password combination you would like. **Use this for testing purposes only!!!** Other ways of authentication are in the config.yaml, whereas commented out. For documentation and how to set up other means of authentication please refer to: https://z2jh.jupyter.org/en/stable/administrator/authentication.html

Create a secrured route, with TLS edge termination:

```bash
oc create route edge <NAME OF ROUTE> --namespace <NAMESPACE> --service=proxy-public --port=http
```

## Remove deployed JupyterHub Helm Chart

Delete it:

```bash
helm uninstall jupyterhub
```

## Changes made in config.yaml

The config.yaml is based on the default config provided by JupyterHub themselves. Changes are necessary to deploy a working JupyterHub Helm Chart.

Network policies are disabled, but kept in for reference. Custom network policies are not necessary and conflict with internal OpenShift functionalities.

Changes made in the config.yaml

```
networkPolicy:
    # ...
    enabled: true > false
```

```
fsGroup: 1000 > 1000860000
```

```
runAsGroup: 1000 > 1000860000
runAsUser: 1000 > 1000860000
```

```
runAsGroup: 65534 > 1000860001
runAsUser: 65534 > 1000860001
```

```
singleuser:
  # ...
  storage:
    capacity: 10Gi > 2Gi
```

## Additions made to the config.yaml

```
hub:
  # ...
  config:
    Authenticator:
    JupyterHub:
      admin_access: true
      authenticator_class: dummy
#      admin_users:
#        - admin
#      allowed_users:
#        - user1
#    DummyAuthenticator:
#      password: a-shared-secret-password
#    JupyterHub:
#      authenticator_class: dummy
#    GitHubOAuthenticator:
#      client_id: your-client-id
#      client_secret: your-client-secret
#      oauth_callback_url: https://<route name>-<project name>.apps.dsri2.unimaas.nl/hub/oauth_callback
#    JupyterHub:
#      authenticator_class: github
```