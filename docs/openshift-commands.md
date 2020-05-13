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

> E.g. [d2s-pod-virtuoso.yaml](https://github.com/MaastrichtU-IDS/d2s-core/blob/master/argo/d2s-pod-virtuoso.yaml).

### List pods

```shell
oc get pod
```

### Get specific pod

```shell
oc get pod | grep <pod_id>
```

Using selector with Apache Flink as example, and showing only the pod id without header:

```bash
oc get pod --selector app=flink --selector component=jobmanager --no-headers -o=custom-columns=NAME:.metadata.name
```

### Remote Shell connection

Connect to a pod with [Bash](https://devhints.io/bash).

```shell
oc rsh <pod_id>
```

### Execute command in pod

Example creating a folder:

```shell
oc exec <pod_id> -- mkdir -p /mnt/workspace/resources
```

### Delete pod

```shell
oc delete pod <pod_id>

# Force deletion
oc delete pod --force --grace-period=0 <pod_id>
```

### Get pod logs

```shell
oc logs -f <pod_id>
```

> Get more details on how to [debug a pod](/dsri-documentation/docs/openshift-debug).

### Copy files

See the [Load data](https://maastrichtu-ids.github.io/dsri-documentation/docs/openshift-load-data) page.

[![Bash](/dsri-documentation/img/bash_logo.png)](https://devhints.io/bash)

