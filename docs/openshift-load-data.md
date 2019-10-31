---
id: openshift-load-data
title: Load data
---

![RSync](/dsri-documentation/img/rsync-logo.png)


## Rsync

[Synchronizes](https://docs.openshift.com/enterprise/3.1/dev_guide/copy_files_to_container.html) local directories with a pod.

### Sync local to pod

```shell
oc rsync /data/my-dir my-pod:/data
```

> Content of directory in local `/data/my-dir` is synced with the pod `/data` directory.

### Sync pod to local

Getting data from the pod to local.

```shell
oc rsync my-pod:/data /data/my-dir
```

> Data can be transfered from one pod to another using the same mechanisms.
>
> ```shell
> oc rsync my-pod1:/data my-pod2:/data
> ```

---

## Copy files

Copy a file, or directory, from your local filesystem to an OpenShift pod.

We recommend using `rsync` as it synchronizes the file if it already exists, preventing duplication and making synchronization faster. 

But `oc cp` can fix issues met with rsync, such as copying symlinks for example, file too huge.

### Copy local to pod

```shell
oc cp my-dir my-pod:/data
```

### Copy pod to local

```shell
oc cp my-pod:/data/my-dir .
```
