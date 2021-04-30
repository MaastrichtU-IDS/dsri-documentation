---
id: openshift-load-data
title: Upload data
---

## In RStudio, JupyterLab and VSCode

* If you are using **JupyterLab** or **VSCode** you should be able to load data to the container by simply **drag and drop the files to upload** in the JupyterLab/VSCode web UI.
* For **RStudio**, use the Upload file button in the RStudio web UI to upload files from your computer to the RStudio workspace.

:::caution File too big

If those solutions don't work due to the files size, try one of the solutions below.

:::

## Upload large files with the `oc` tool

The best way to upload large files or folders from a laptop or server to the DSRI is to use the `oc` command line interface.

:::tip Install the client

To install the `oc` client on your laptop/server, visit the [Install the client](/docs/openshift-install) page

:::

`oc cp` directly copy, and overwrite existing files, from a laptop or server to an Application pod on the DSRI.

First get the `<pod_id>` using your application name:

```shell
oc get pod --selector app=<my_application_name>
```

### Copy from local to pod

Folders are uploaded recursively by default:

```shell
oc cp <folder_to_upload> <pod_id>:<copy_path_in_pod>
```

For example:

```shell
oc cp my-folder flink-jobmanager-000:/mnt
```

### Copy from pod to local

```shell
oc cp <pod-id>:<path_to_copy> <local_destination>
```

## Synchronizes files

For files that are updated regularly, you can use `rsync` as it synchronizes the files if they already exist, preventing duplication and making synchronization faster. But

:::caution Faster but less stable

Rsync is less reliable than `cp`, e.g. when copying symlinks.

:::

### Sync local to pod

Content of directory in local `/data/my-dir` will be synced with the pod `/data` directory:

```shell
oc rsync <folder_to_sync> <pod-id>:<sync_path_in_pod>
```

### Sync pod to local

Getting data from the pod to local.

```shell
oc rsync <pod-id>:<folder_to_sync> <local_destination_to_sync>
```