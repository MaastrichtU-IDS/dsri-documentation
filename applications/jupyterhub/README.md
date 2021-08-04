Steps for deployment on OpenShift in 2017: https://github.com/jupyterhub/helm-chart/issues/26

Video (2017): https://www.youtube.com/watch?v=buOl6WGa8x4

Latest Helm chart for JupyterHub: https://zero-to-jupyterhub.readthedocs.io/en/latest/jupyterhub/installation.html

## Install JupyterHub in a project

Grant the `default` service account in the project `edit` access:

```bash
oc policy add-role-to-user edit -z default -n github
```

Make the `default` service account in this project (e.g. `github` for the jupyterhub with github login) to accept `anyuid`:

```bash
oc adm policy add-scc-to-user anyuid -z default -n github
```

 

## Install the Helm chart

```bash
helm repo add jupyterhub https://jupyterhub.github.io/helm-chart/
helm repo update
```

Start JupyterHub in the `github` project:

```bash
helm upgrade --cleanup-on-fail \
  --install jupyterhub jupyterhub/jupyterhub \
  --namespace github \
  --version=1.1.0 \
  --values config.yaml
```

Delete it:

```bash
helm uninstall jupyterhub
```

