---
id: okd3-openshift-load-data
title: Upload data
---

## In RStudio, JupyterLab and VSCode

* If you are using **JupyterLab** or **VSCode** you should be able to load data to the container by simply **drag and drop the files to upload** in the JupyterLab/VSCode web UI.
* For **RStudio**, use the Upload file button in the RStudio web UI to upload files from your computer to the RStudio workspace.

:::caution File too big

If those solutions don't work due to the files size, try one of the solutions below.

:::

## Upload large files with the `oc` tool

Copy a file, or directory, from your local filesystem to an OpenShift pod.

For files that are updated regularly, we recommend using `rsync` (see [below](/dsri-documentation/docs/openshift-load-data#rsync)) as it synchronizes the file if it already exists, preventing duplication and making synchronization faster. 

But `oc cp` can fix issues met with rsync, such as copying symlinks for example, or files too big.

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

You can also use the `oc` command to [synchronizes](https://docs.openshift.com/enterprise/3.1/dev_guide/copy_files_to_container.html) local directories to an application on the DSRI.

:::caution Faster but less stable

Rsync is usually faster than `oc cp` if you want to update data already uploaded without re-uploading everything. But it has more chances to fail (when `oc cp` should work in most cases)

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
