---
id: dask-cluster
title: Deploy Dask Cluster
---

## 🧊 Installation with Helm

1. Go to the **+Add** page, and select to add **Helm Chart**

<img src="/img/dask-init1.png" alt="dask init" style={{maxWidth: '100%', maxHeight: '100%'}} />

2. Search and Select the **Dask chart** then click on **Create**

<img src="/img/dask-init2.png" alt="dask init" style={{maxWidth: '100%', maxHeight: '100%'}} />

<img src="/img/dask-init3.png" alt="dask init" style={{maxWidth: '100%', maxHeight: '100%'}} />

3. Configure the Yaml file, while under the `Jupyter` section:
    - `Command: ["jupyter", "lab", "--allow-root", "--ip=0.0.0.0", "--port=8888", "--no-browser"]`
    - `servicePort: 8888`

<img src="/img/dask-init4.png" alt="dask init" style={{maxWidth: '100%', maxHeight: '100%'}} />

<img src="/img/dask-init5.png" alt="dask init" style={{maxWidth: '100%', maxHeight: '100%'}} />

4. **Add Storage** to the **dask-jupyter** pod as shown below

<img src="/img/dask-init6.png" alt="dask init" style={{maxWidth: '100%', maxHeight: '100%'}} />

5. Set up a new **Persistent Volume Claim** for the cluster as shown below

<img src="/img/dask-init7.png" alt="dask init" style={{maxWidth: '100%', maxHeight: '100%'}} />

### 🪐 Configure a Route for the Cluster

1. Switch to the **Administrator** view and navigate to **Route**

<img src="/img/dask-route1.png" alt="dask route" style={{maxWidth: '100%', maxHeight: '100%'}} />

<img src="/img/dask-route2.png" alt="dask route" style={{maxWidth: '100%', maxHeight: '100%'}} />

2. Create a new route by clicking the button **Create Route** with the setup as shown below

<img src="/img/dask-route3.png" alt="dask route" style={{maxWidth: '100%', maxHeight: '100%'}} />

<img src="/img/dask-route4.png" alt="dask route" style={{maxWidth: '100%', maxHeight: '100%'}} />

<img src="/img/dask-route5.png" alt="dask route" style={{maxWidth: '100%', maxHeight: '100%'}} />

3. Navigate the provided link to access your local cluster

<img src="/img/dask-route6.png" alt="dask route" style={{maxWidth: '100%', maxHeight: '100%'}} />

### 🪐 Access the Jupyter Password/Token

1. Start up the **terminal**
    - Run `oc get pods` to find the full podname of the **dask-jupyter**
    - Run `oc logs <podname>` and copy the token used to access the jupyter notebook

<img src="/img/dask-route7.png" alt="dask route" style={{maxWidth: '100%', maxHeight: '100%'}} />
