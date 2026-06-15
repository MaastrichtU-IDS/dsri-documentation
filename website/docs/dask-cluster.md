---
id: dask-cluster
title: Dask Cluster
---

[Dask](https://www.dask.org/) is a parallel computing library for Python that scales analytics workflows. On the DSRI, a Dask cluster can be deployed using Helm and includes a Dask scheduler, workers, and a JupyterLab interface to interact with the cluster.

## Deploy

Dask is deployed via Helm chart from the DSRI web UI.

1. In **Developer** mode, go to **+Add** and select **Helm Chart**.
2. Search for **Dask**, select the Dask chart, and click **Create**.
3. In the YAML configuration, find the `jupyter` section and set the following:
```yaml
   jupyter:
     command: ["jupyter", "lab", "--allow-root", "--ip=0.0.0.0", "--port=8888", "--no-browser"]
     servicePort: 8888
```
4. Click **Create** to deploy the cluster.

## Persistent storage

After the cluster is running, add persistent storage to the `dask-jupyter` pod:

1. In the **Topology** view, click on the `dask-jupyter` pod.
2. Go to **Actions** > **Add Storage** and create a new Persistent Volume Claim for the cluster.

Data stored on this volume will survive pod restarts.

## Access the cluster

### Create a route

1. Switch to the **Administrator** view and go to **Networking** > **Routes**.
2. Click **Create Route**, fill in a name, select the `dask-jupyter` service, set the target port, and click **Create**.
3. Use the generated URL to open the JupyterLab interface.

### Get the JupyterLab token

The JupyterLab interface is protected by a token. To find it:

1. Run `oc get pods` to find the full pod name of `dask-jupyter`.
2. Run `oc logs <pod-name>` and copy the token from the output.

Use this token to log in to JupyterLab.