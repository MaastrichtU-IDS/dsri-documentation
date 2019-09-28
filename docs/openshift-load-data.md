---
id: openshift-load-data
title: Load data
---

[![OpenShift](/dsri-documentation/img/openshift-logo.png)](https://www.openshift.com/)

## Copy files

Copy a file, or directory, from your local filesystem to an OpenShift pod.

### Copy local to pod

```shell
oc cp my-dir my-pod:/data
```

### Copy pod to local

```shell
oc cp my-pod:/data/my-dir .
```

---

## Rsync

[Synchronizes](https://docs.openshift.com/enterprise/3.1/dev_guide/copy_files_to_container.html) local directories with a pod.

### Sync local to pod

```shell
oc rsync /data/my-dir my-pod:/data
```

> Directory in local `/data/my-dir` is synced with the pod `/data` directory.

### Sync pod to local

```shell
oc rsync my-pod:/data /data/my-dir
```

