---
id: openshift-storage
title: Data storage
---

Different storages can be used when running services on the DSRI:

🦋 **Ephemeral storage**: storage is bound to the pod, data will be lost when the pod is deleted (but this deployment does not require to request the creation of a persistent storage, and is faster to test code).

⚡ **Dynamic storage**:  automatically create a persistent storage when starting an application. Can also be created in the OpenShift web UI, using the `dynamic-maprfs` Storage Class.

🗄️ **Persistent storage**:  You can use a persistent storage volume to store data. Please see the Create the Persistent Storage section. You can do this yourself. Please keep in mind that there are no backups made of data on DSRI. 

:::caution Storage per project

A storage (aka. Persistent Volume Claim) is only accessible in the project where it has been created.

:::

### Create the Persistent Storage

1. Switch to the **Administrator** view

2. Go to the **Project** panel 

3. Select your project

4. Expand the **Storage** panel then go to the **Persistent Volume Claim** panel

5. Click the button call **Create Persistent Volume Claim**

   then you will redirect the wizard of Create Persistent Volume Claim 

6. Provide the unique **Persistent Volume Claim Name** start with ` pvc-` 

   example: ` pvc-filebrowser`

7. Select the **Access Mode** **` RWX`**and **Storage Size**

   | Access Mode   | CLI abbreviation | Description                                               |
   | :------------ | :--------------- | :-------------------------------------------------------- |
   | ReadWriteOnce | `RWO`            | The volume can be mounted as read-write by a single node. |
   | ReadOnlyMany  | `ROX`            | The volume can be mounted as read-only by many nodes.     |
   | ReadWriteMany | `RWX`            | The volume can be mounted as read-write by many nodes.    |

8. Click **Create**

<img src="/img/screenshot_pvc_storage.png" alt="Create Persistent Storage" style={{maxWidth: '100%', maxHeight: '100%'}} />



<img src="/img/screenshot_pvc_storage_create.png" alt="Create Persistent Storage" style={{maxWidth: '100%', maxHeight: '100%'}} />

:::info 

The DSRI using the [**Openshift Container Stroage**](https://www.openshift.com/products/container-storage/) (` OCS`)  which is based on [**CEPH**](https://ceph.io/ceph-storage/) offers `ReadWriteOnce` access mode. 

* `ReadWriteOnce` ([**RWO**](https://docs.openshift.com/container-platform/4.6/storage/understanding-persistent-storage.html)) volumes cannot be mounted on multiple nodes. Use the `ReadWriteMany` ([**RWX**](https://docs.openshift.com/container-platform/4.6/storage/understanding-persistent-storage.html)) access mode when possible. If a node fails, the system does not allow the attached RWO volume to be mounted on a new node because it is already assigned to the failed node. If you encounter a multi-attach error message as a result, force delete the pod on a shut down or crashed node. 

:::

Static persistent volumes provides a sustainable persistent storage over time for applications that need to run regular Docker images (which usually use the `root` user).

:::info 

Some Applications such as **Jupyter** template automatically creates a persistent storage

:::

### Connect the Existing Persistent Storage

On the **Topology** page select your application,

1. Click **Action** on your application

2. Select the **Add Storage** option from the dropdown list.

3. Select the **Use Existing Claim** option from the Add Storage wizard and Select the Claim

4. Add the **Mount Path**

5. Save

<img src="/img/screenshot_existing_storage.png" alt="Add Existing Persistent Storage" style={{maxWidth: '100%', maxHeight: '100%'}} />

<img src="/img/screenshot_add_storage.png" alt="Add Existing Persistent Storage" style={{maxWidth: '100%', maxHeight: '100%'}} />

:::info

You can try above method if you want to connect **more applications to the same storage**

:::

### Expand existing Persistent Storage

1. Switch to the **Administrator** view

2. Go to the **Project** panel 

3. Select your project

4. Expand the **Storage** panel then go to the **Persistent Volume Claim** panel

5. Click on the three dots (⋮) next to the **Persistent Volume Claim** you want to expand.
 
6. Click on **Expand PVC** in the menu.

7. Enter the size you want to expand your PVC with.

8. Hit **Expand**. It can take upto 2 minutes before your PVC is expanded.

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
