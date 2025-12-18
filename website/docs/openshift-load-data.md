---
id: openshift-load-data
title: Uploading data
---

## In RStudio, JupyterLab and VSCode

* If you are using **JupyterLab** or **VSCode** you should be able to load data to the container by simply **drag and drop the files to upload** in the JupyterLab/VSCode web UI.
* For **RStudio**, use the Upload file button in the RStudio web UI to upload files from your computer to the RStudio workspace.

:::caution File too big

If those solutions don't work due to the files size, try one of the solutions below.

:::

## Copy large files with the terminal 

The quickest way to upload large files or folders from a laptop or server to the DSRI is to use the `oc` command line interface.

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
oc cp <folder_to_copy> <pod_id>:<absolute_path_in_pod>
```

:::caution Use absolute path in the pod

You need to provide the absolute (full) path where you want to copy it in the pod. Use your application workspace path, e.g. `/home/jovyan` for JupyterLab or `/home/rstudio` for RStudio)

:::

For example:

```shell
oc cp my-folder jupyterlab-000:/home/jovyan
```

You can also use this one-liner to automatically get the pod ID based on your app label:

```bash
oc get pod --selector app=<my_application_name> | xargs -I{} oc cp <folder_to_copy> {}:<absolute_path_in_pod>
```

### Copy from pod to local

Just do the inverse:

```shell
oc cp <pod_ID>:<path_to_copy> <local_destination>
```

### Download data from SURFdrive

You can download data from your SURFdrive to your pod by creating a public link to the file:

1. Go to the file in SURFdrive you'd like to share
2. Click share and the create public link
3. Fill in a name for the public link (like DSRI). The name does not matter much, but it can help you keep track of the goal of the public link.
4. Click copy to clipboard
5. Visit link in browser and copy the direct URL displayed on that page.
6. Use the direct URL you just copied to download the file using either wget or curl (e.g. "wget https://surfdrive.surf.nl/files/index.php/s/5mFwyAKj4UexlJb/download")
7. Revoke link in the SURFdrive portal

## Synchronizes files with `oc rsync`

If you have a lot of large files and/or they are updated regularly, you can use `rsync` as it synchronizes the files if they already exist, preventing duplication and making synchronization faster.  You can also see the progress with `rsync` which you cannot with `cp`. And if the upload is stopped for any reason `rsync` should pick it up from where it stopped (instead of restarting from scratch like `oc cp` does)

:::caution 

Rsync does not work with symlinks (created with `ln -s`)

:::

### Sync local to pod

```shell
oc rsync --progress <folder_to_sync> <pod-id>:<sync_path_in_pod>
```

You can also use this one-liner to automatically get the pod ID based on your app label:

```bash
oc get pod --selector app=<my_application_name> | xargs -I{} oc rsync --progress <folder_to_sync> {}:<absolute_path_in_pod>
```

### Sync pod to local

Again, do the inverse:

```shell
oc rsync --progress <pod-id>:<folder_to_sync> <local_destination_to_sync>
```

### More options

You can use more options to improve the upload of large files:

| `--compress` | compress file data during the transfer               |
| ------------ | ---------------------------------------------------- |
| `--delete`   | delete files not present in source                   |
| `--watch`    | Watch directory for changes and resync automatically |

## One-liner

