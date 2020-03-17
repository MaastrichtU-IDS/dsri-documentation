---
id: openshift-commands
title: OpenShift commands
---

[![OpenShift](/dsri-documentation/img/openshift-logo.png)](https://www.openshift.com/)

## Projects

### List projects

```shell
oc projects
```

### Connect to project

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
oc get pod | grep <pod_id>
```

### Delete pod

```shell
oc delete pod <pod_id>

# Force deletion
oc delete pod --force --grace-period=0 <pod_id>
```

### Get logs

```shell
oc logs -f <pod_id>
```

> Get more details on how to [debug a pod](/dsri-documentation/docs/openshift-debug).

### Remote shell connection

Connect to a pod with [Bash](https://devhints.io/bash).

```shell
oc rsh <pod_id>
```

### Copy files

See the [Load data](https://maastrichtu-ids.github.io/dsri-documentation/docs/openshift-load-data) page.

[![Bash](/dsri-documentation/img/bash_logo.png)](https://devhints.io/bash)

