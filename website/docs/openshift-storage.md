---
id: openshift-storage
title: Data storage
---

The DSRI uses [OpenShift Container Storage](https://www.openshift.com/products/container-storage/) (`OCS`) based on [Ceph](https://ceph.io/ceph-storage/). Three types of storage are available:

- **Ephemeral storage** - storage bound to the pod. Data is lost when the pod is restarted or deleted. Useful for quick testing as it does not require creating a persistent volume.
- **Dynamic storage** - persistent storage created automatically when starting an application from a template. Can also be created manually via the DSRI web UI.
- **Persistent storage** - a persistent volume you create and manage yourself. Data survives pod restarts. There are no backups on the DSRI, so always keep a copy of your data elsewhere.

:::caution

A Persistent Volume Claim (PVC) is only accessible within the project where it was created.

:::

:::caution Storage limit per PVC

PVC storage requests are limited to a maximum of **10Ti** per PVC. If you need more, [contact us](mailto:rcs-ub@maastrichtuniversity.nl).

:::

## Create a persistent volume

1. Switch to the **Administrator** view.
2. Go to **Storage** > **Persistent Volume Claims**.
3. Click **Create Persistent Volume Claim**.
4. Choose the storage class. The default is `ocs-storagecluster-ceph-rbd` (block storage). Change this to `ocs-storagecluster-cephfs` if you want to bind multiple pods to the same PVC.
5. Provide a unique name for the PVC, starting with `pvc-` (e.g. `pvc-filebrowser`).
6. Select the access mode and storage size:

| Access Mode | Abbreviation | Description |
| :--- | :--- | :--- |
| ReadWriteOnce | `RWO` | Mounted as read-write by a single node. |
| ReadOnlyMany | `ROX` | Mounted as read-only by many nodes. |
| ReadWriteMany | `RWX` | Mounted as read-write by many nodes. Use this when possible. |

7. Click **Create**.

:::info

Use **ReadWriteMany (RWX)** when possible. If a node fails, RWO volumes cannot be remounted on another node until the pod is force-deleted.

:::

:::info

Some templates such as **JupyterLab** automatically create a persistent volume when instantiated.

:::

## Connect an existing persistent volume

To attach an existing PVC to an application:

1. On the **Topology** page, click on your application.
2. Click **Actions** > **Add Storage**.
3. Select **Use Existing Claim** and choose the PVC.
4. Set the **Mount Path**.
5. Click **Save**.

This is also how you connect multiple applications to the same storage.

## Expand an existing persistent volume

1. Switch to the **Administrator** view.
2. Go to **Storage** > **Persistent Volume Claims**.
3. Click the three dots (⋮) next to the PVC you want to expand.
4. Click **Expand PVC**.
5. Enter the new size and click **Expand**. It can take up to 2 minutes to complete.

## Use dynamic storage

Dynamic storage can be created manually:

1. In your project, go to **Storage** in the left sidebar.
2. Click **Create Storage**.
3. Set the storage class to `ocs-storagecluster-cephfs`.
4. Choose an access mode:
   - **Single User (RWO)** - only you can read and write.
   - **Shared Access (RWX)** - all users with project access can read and write.
   - **Read Only (ROX)** - all users with project access can read.

## Ephemeral storage

:::warning

Ephemeral storage is currently disabled by default as it was causing data loss for users.

:::

When creating a pod without persistent storage, OpenShift uses ephemeral storage bound to the pod — data is lost when the pod is deleted. This can be sufficient for quick testing but is not recommended for any data you want to keep.