---
id: deploy-matlab
title: Matlab
---

Matlab is a numerical computing environment from MathWorks. On the DSRI it runs as a container with a desktop UI accessible directly in your web browser.

:::info

We are not experts in Matlab - if you have issues with the official Docker image, feel free to contact [MathWorks support](https://nl.mathworks.com/academia/tah-portal/maastricht-university-31574866.html#get) directly (login with your UM account first). Since Matlab is closed source, we cannot fix issues in the image itself.

:::

## Deploy

Find the **Matlab** template in the [DSRI Catalog](https://console.dsri.unimaas.nl/catalog/) (make sure the **Templates** checkbox is checked) and instantiate it with the following parameters:

- **Password** to access the Matlab UI. Make sure it is longer than 6 characters.
- **Matlab image version** - see the [official Matlab Docker image documentation](https://hub.docker.com/r/mathworks/matlab) for available versions.

Once the pod is running, you can access Matlab through two routes visible when clicking on the MATLAB node in the **Topology** view:

- The `matlab` route - access the Matlab desktop UI directly in your browser. This is the recommended option.
- The `matlab-vnc` route - access Matlab using a VNC client. Only use this if you know what you are doing.

## Persistent storage

Use the `/home/matlab/persistent` folder to store data that should be preserved across pod restarts.

To navigate to the persistent volume from the terminal:

```bash
cd /home/matlab/persistent
```

## Particularities

### Access the terminal

To open a terminal inside your Matlab pod, either go to the pod page in the DSRI web UI, or connect from your local terminal:

```bash
oc rsh <matlab-pod-name>
```

Type `bash` when first accessing the terminal for a better experience. Then type `matlab` to start MATLAB from the terminal.

### Use Matlab in Jupyter

To run Matlab in a Jupyter notebook you first need to install MATLAB inside your Jupyter pod. [Contact the DSRI team](/contact) if you need assistance with this.

### Deploy on GPU

The Matlab template in the DSRI Catalog can also be used to deploy a pre-built **Nvidia Matlab Deep Learning Container** on GPU nodes. See the [official MathWorks documentation](https://nl.mathworks.com/help/cloudcenter/ug/matlab-deep-learning-container-on-docker-hub.html) for more details about this image.

:::caution

GPU access is not enabled by default. You need to make a reservation first - see the [GPU documentation](/docs/deploy-on-gpu) for details.

:::