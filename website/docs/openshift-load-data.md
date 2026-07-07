---
id: openshift-load-data
title: Uploading Data
---

There are several ways to upload data to your workspace on the DSRI, depending on the size of your files and the application you are using.

## From the web UI

Most workspaces have a built-in file manager:

- **JupyterLab** and **VSCode** — drag and drop files directly into the web UI.
- **RStudio** — use the **Upload** button in the Files panel.

:::caution

If files are too large to upload via the web UI, use `oc cp` or `oc rsync` instead.

:::

## Copy files with `oc cp`

`oc cp` copies files or folders from your machine to a pod on the DSRI, overwriting existing files.

First, get the pod name using your application name:

```bash
oc get pod --selector app=<my-application-name>
```

### Copy from local to pod

```bash
oc cp <folder-to-copy> <pod-name>:<absolute-path-in-pod>
```

:::caution

Always use the **absolute path** in the pod, for example `/home/jovyan` for JupyterLab or `/home/rstudio` for RStudio.

:::

Example:

```bash
oc cp my-folder jupyterlab-000:/home/jovyan
```

### Copy from pod to local

```bash
oc cp <pod-name>:<path-to-copy> <local-destination>
```

## Sync files with `oc rsync`

Use `oc rsync` when you have many large files or files that change regularly. Unlike `oc cp`, rsync only transfers files that have changed, shows progress, and can resume if interrupted.

:::caution

`oc rsync` does not work with symlinks created with `ln -s`.

:::

### Sync local to pod

```bash
oc rsync --progress <folder-to-sync> <pod-name>:<path-in-pod>
```

### Sync pod to local

```bash
oc rsync --progress <pod-name>:<folder-to-sync> <local-destination>
```

### Additional options

| Option | Description |
| --- | --- |
| `--compress` | Compress file data during transfer |
| `--delete` | Delete files in the destination not present in the source |
| `--watch` | Watch directory for changes and resync automatically |

## Download data from SURFdrive

To download data from SURFdrive directly to your pod:

1. Go to the file in SURFdrive and click **Share** > **Create public link**.
2. Give the link a name and click **Copy to clipboard**.
3. Open the link in a browser and copy the direct download URL shown on the page.
4. In your pod terminal, download the file using `wget` or `curl`:

```bash
wget https://surfdrive.surf.nl/files/index.php/s/yourlink/download
```

5. Revoke the link in the SURFdrive portal when done.