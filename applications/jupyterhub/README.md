Steps for deployment on OpenShift in 2017: https://github.com/jupyterhub/helm-chart/issues/26

Video (2017): https://www.youtube.com/watch?v=buOl6WGa8x4

Latest Helm chart for JupyterHub: https://zero-to-jupyterhub.readthedocs.io/en/latest/jupyterhub/installation.html

## Fix permissions

Fix permissions issues in the project where JupyterHub will be deployed. Make the `default`, `hub` and `user-scheduler` service accounts in this project to accept `anyuid`:

```bash
oc adm policy add-scc-to-user anyuid -z default -n workspace-vemonet
oc adm policy add-scc-to-user anyuid -z hub -n workspace-vemonet
oc adm policy add-scc-to-user anyuid -z user-scheduler -n workspace-vemonet
```

## Install the Helm chart

```bash
helm repo add jupyterhub https://jupyterhub.github.io/helm-chart/
helm repo update
```

## Deploy JupyterHub Helm chart

Start JupyterHub in the `workspace-vemonet` project:

```bash
helm upgrade --cleanup-on-fail \
  --install jupyterhub jupyterhub/jupyterhub \
  --version=1.1.3 \
  --namespace=workspace-vemonet \
  --values config.yaml
```

Delete it:

```bash
helm uninstall jupyterhub
```

## To try 

cf. https://github.com/jupyterhub/helm-chart/issues/26

Grant the `default` service account in the project `edit` access:

```bash
oc policy add-role-to-user edit -z default -n workspace-vemonet
```

