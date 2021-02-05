---
id: okd3-openshift-storage
title: Storage and restrictions
---

## OpenShift images restrictions

OpenShift prevent running regular Docker images by default, and enforce to run images as a restricted user.

### OpenShift optimized images

Some Docker images has been optimized to run in OpenShift, those images can use the **Dynamic storage** feature, and automatically store persistent data.

:::caution For most images

To run a regular Docker image, see below.

:::

### Regular Docker images

Most Docker images run with a specific user (e.g. the `root` user) and have not been optimized to comply with OpenShift requirements. In this case your project will need to be enable to run root containers (aka. anyuid) by the DSRI support team.

:::warning Require persistent storage created

**Dynamic storage** does not work with regular Docker images, you will need to request a **Persistent storage** to securely store your data.

:::

## Storage solutions

Different storages can be used when running services on the DSRI:

🦋 **Ephemeral storage**: storage is bound to the pod, data will be lost when the pod is deleted (but this deployment does not require to request the creation of a persistent storage, and is faster to test code).

⚡ **Dynamic storage**:  automatically create a persistent storage when starting an application. Can also be created in the OpenShift web UI, using the `dynamic-maprfs` Storage Class (not working with container running as root, use Jupyter S2I deployments with this storage)

🗄️ **Persistent storage**:  a persistent storage can be created by the DSRI team for a persistent storage of the data. [Contact the DSRI team](/dsri-documentation/help) to request a persistent storage. 

:::caution Storage per project

A storage (aka. Persistent Volume Claim) is only accessible in the project where it has been created.

:::

### Request a static persistent volumes

Static persistent volumes provides a sustainable persistent storage over time for applications that need to run regular Docker images (which usually use the `root` user).

:::info Contact us

[Contact the DSRI support team 📬](/dsri-documentation/help) to request a static persistent volume

:::

### Use the dynamic storage

:::warning Not for root containers

This storage solution is not compatible with applications using the `root` user, [contact the DSRI support team 📬](/dsri-documentation/help) to request a persistent storage.

:::

Dynamic **persistent** volumes can be created automatically by an application template, and used for application with an image optimized for OpenShift.

Dynamic storage can also be created dynamically, go to **Storage** on the left sidebar in a project:

1. Click **Create Storage** top right of the Storage page.
2. Storage class: **dynamic-maprfs**
3. Access Mode:
   * **Single User (RWO)**: only the user who created this volume can read/write to this volume.
   * **Shared Access (RWX)**: all users with access to the projects can read/write this volume.
   * **Read Only (ROX)**: all users with access to the projects can read this volume.

### Use the ephemeral storage

:::warning Disabled

We currently disabled this solution by default, as it was confusing for users and would lead to data loss.

:::

When creating a pod, OpenShift will by default use ephemeral storage. It creates a volumes bind to the pod. So the volume will be deleted.

It is recommended to use dynamic provisioning for a more sustainable storage solution. But ephemeral storage can be sufficient for testing.