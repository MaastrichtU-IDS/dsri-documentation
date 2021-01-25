---
id: openshift-storage
title: Data storage
---

Different storages can be used when running services on the DSRI:

🦋 **Ephemeral storage**: storage is bound to the pod, data will be lost when the pod is deleted (but this deployment does not require to request the creation of a persistent storage, and is faster to test code).

⚡ **Dynamic storage**:  automatically create a persistent storage when starting an application. Can also be created in the OpenShift web UI, using the `dynamic-maprfs` Storage Class.

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

Dynamic **persistent** volumes can be created automatically by an application template.

Dynamic storage can also be created manually, go to **Storage** on the left sidebar in a project:

1. Click **Create Storage** top right of the Storage page.
2. Storage class: **ceph-fs**
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