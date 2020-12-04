---
id: openshift-load-data
title: Upload data
---

## In JupyterLab and VSCode

If you are using JupyterLab or VSCode you should be able to load data to the container by simply **drag and drop the files to upload** in the JupyterLab/VSCode web UI.

> If this solution doesn't work due to the files size, try one of the solutions below.

## In RStudio

Use the Upload file button in the RStudio web UI to upload files from your computer to the RStudio workspace.

> If this solution doesn't work due to the files size, try one of the solutions below.

## Copy files

Copy a file, or directory, from your local filesystem to an OpenShift pod.

For files that are updated regularly, we recommend using `rsync` (see [below](/dsri-documentation/docs/openshift-load-data#rsync)) as it synchronizes the file if it already exists, preventing duplication and making synchronization faster. 

But `oc cp` can fix issues met with rsync, such as copying symlinks for example, or files too big.

First get the `<pod_id>` using your application name:

```shell
oc get pod --selector app=<my_application_name>
```

### Copy from local to pod

```shell
oc cp <file_to_copy> <pod_id>:<copy_path_in_pod>
```

> It will copy folders recursively by default.

For example:

```shell
oc cp my-folder flink-jobmanager-000:/mnt
```

### Copy from pod to local

```shell
oc cp <pod-id>:<path_to_copy> <local_destination>
```

## Rsync

[Synchronizes](https://docs.openshift.com/enterprise/3.1/dev_guide/copy_files_to_container.html) local directories with a pod.

### Sync local to pod

```shell
oc rsync <file_to_sync> <pod-id>:<sync_path_in_pod>
```

> Content of directory in local `/data/my-dir` is synced with the pod `/data` directory.

### Sync pod to local

Getting data from the pod to local.

```shell
oc rsync <pod-id>:<file_to_sync> <local_destination_to_sync>
```

> Data can be transfered from one pod to another using the same mechanisms.
>
> ```shell
> oc rsync my-pod1:/mnt my-pod2:/mnt
> ```
