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

## Changes made in config-basic.yaml and config-extensive.yaml

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

## Additions made to the config-basic.yaml and config-extensive.yaml

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

## Additional changes made to the config-extensive.yaml

```
cull:
  adminUsers: true
  concurrency: 10
  enabled: false # set to false to disbale culling
  every: 600
  maxAge: 0
  removeNamedServers: false
  timeout: 3600
  users: false
```

```
singleuser:
  #...
  # Remove the git clone part or fill in a valid URL, otherwise the user-pod will not start!
  cmd:
    - /bin/bash
    - '-c'
    - >-
      pip install papersize && [ "$(ls -A /home/jovyan/materials 2>/dev/null)" ]
      || git clone https://github.com/EbookFoundation/free-programming-books.git
      /home/jovyan/materials && exec jupyterhub-singleuser
```

```
singleuser:
  #...
  image:
    name: quay.io/jupyter/minimal-notebook
    pullPolicy: null
    pullSecrets: []
    tag: 87b37b4fd818
  profileList:
    - display_name: "Minimal environment"
      description: "To avoid too much bells and whistles: Python."
      default: true
    - display_name: "Datascience environment"
      description: "If you want the additional bells and whistles: Python, R, and Julia."
      kubespawner_override:
        image: quay.io/jupyter/datascience-notebook:87b37b4fd818
    - display_name: "Tensorflow environment"
      description: "Here you have Tensorflow installed!"
      kubespawner_override:
        image: quay.io/jupyter/tensorflow-notebook:87b37b4fd818
```