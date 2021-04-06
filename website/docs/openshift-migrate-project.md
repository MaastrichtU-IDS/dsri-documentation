---
id: openshift-migrate-project
title: Migrate to the new cluster
---

If you currently have a project on the [previous version of the DSRI](https://app.dsri.unimaas.nl:8443/console/catalog) (OKD 3.11), you will need to migrate your project to the [new version of the DSRI](https://console-openshift-console.apps.dsri2.unimaas.nl/) cluster (OKD 4.6)

Here are some advantages to migrate to [OKD](https://www.okd.io/) 4.6:

🗃️ **Automated persistent storage**: the DSRI can now automatically create persistent volumes for applications started from templates, and you can create more volumes yourself (on the previous version you could only use storage created by admins)

⚡ **Faster storage I/O**, such as reading and writing to files. 3 storage classes are now available for different uses (regular filesystem, bloc and object storage). The new storage (Ceph) is better documented, easier to use, and more adapted to Data Science workloads.

📊 **Better monitoring** tools: the monitoring view now shows the details of resources used for each application (CPU, memory, storage, network, etc)

🖥️ **Developer oriented interface**: the interface has been improved to focus more on developers who simply want to deploy applications. It hides some of the Kubernetes complexity, which is more for experienced sysadmins, in the Administrator view)

:::caution No GPU yet

We will migrate the GPU node to the new cluster soon. But it is currently still deployed on the old cluster, you will need to use the old cluster to deploy an application on GPU.

:::

## Migrate your applications

All templates you have been using on the previous version of the DSRI have been adapted to the new cluster (with improvements in some cases!), so you can easily restart the same application using a template on the new cluster (e.g. RStudio, JupyterLab, VSCode, databases, etc)

If you deployed a custom application you should be able to start it on the new cluster the same way you started it before.

## Migrate your data

The easiest way to migrate your data from the old to the new cluster is to use the `oc` command line tool to copy the data on your laptop, then copy it to the persistent volume of your application on the new cluster.

For this example, we will consider a RStudio application named `rstudio-root`, with the persistent volume in `/home/rstudio`, but the same process can be applied to any other application deployed on the DSRI

1. Login to the [old cluster](https://app.dsri.unimaas.nl:8443/console/catalog) with `oc login`
2. Get the pod ID of your RStudio application (it should look like `rstudio-root-1-bkpdf`, you can also get it through the DSRI web UI)

```bash
oc get pod --selector app=rstudio-root
```

3. Copy the data from the persistent storage of the old RStudio application to your laptop (in a `rstudio-data` folder)

```bash
oc cp rstudio-root-1-bkpdf:/home/rstudio ./rstudio-data
```

4. Once the data has been downloaded you can login to the new cluster with `oc login`
5. Start your new application on the new cluster, and get its pod ID (we will use `rstudio-1-gcfev` as pod ID for this example)
6. Copy the `rstudio-data` folder to the new application permanent volume (`/home/rstudio` for RStudio)

```bash
oc cp rstudio-1-gcfev:/home/rstudio ./rstudio-data
```

:::tip 

If you need to migrate large files it will be faster to do it on the UMnet, or Eduroam WiFi at UM. The ideal would be to use a ethernet (wired) connection. 

:::


