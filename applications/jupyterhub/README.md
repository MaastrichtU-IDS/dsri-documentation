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

## Fix Network Policy

The network policy can be defined directly in the values.yaml of the helm chart. But of course, it won't work because people writing Kubernetes app are still trying to figure out how basic templating works. So here's a fix:

```bash
oc apply -f network-policy.yml
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

Forward the service on your http://localhost:8081

```bash
oc port-forward svc/proxy-public 8081:80
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

