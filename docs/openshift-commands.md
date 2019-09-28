---
id: openshift-commands
title: OpenShift commands
---

[![OpenShift](/img/openshift-logo.png)](https://www.openshift.com/)



## Projects

### List projects

```shell
oc get projects
```

### Get project

```shell
oc project my-project
```

---

## Pods

### Create pod from YAML

```shell
oc create -f my-pod.yaml
```

> E.g. [d2s-pod-virtuoso.yaml](https://github.com/MaastrichtU-IDS/d2s-argo-workflows/blob/master/d2s-pod-virtuoso.yaml).

### List pods

```shell
oc get pod
```

### Get specific pod

```shell
oc get pod | grep my-pod
```

### Delete pod

```shell
oc delete pod my-pod
```

### Get logs

```shell
oc logs -f d2s-download-pod
```

### Copy files

```shell
# From local to pod
oc cp my-file my-pod:/data

# From pod to local
oc cp my-pod:/data/my-file .
```

### Rsync

Synchronizes directories with a pod.

```shell
# From local to pod
oc rsync /data my-pod:/data

# From pod to local
oc rsync my-pod:/data/my-file /data
```

