---
id: openshift-debug
title: Debug a pod
---

![Argo project](/dsri-documentation/img/argo-logo.png)

Get into a container, to understand why it bugs, by creating a YAML with the command `tail /dev/null` to keep it hanging.

> Example for [d2s-download](https://github.com/MaastrichtU-IDS/d2s-download):

```yaml
apiVersion: v1
kind: Pod
metadata:
  labels:
    purpose: download-data-files
  name: d2s-download-pod
  namespace: argo
spec:
  volumes:
  - name: workdir
    persistentVolumeClaim:
      claimName: my-storage
  containers:
  - name: d2s-download
    image: maastrichtuids/d2s-download:latest
    command: [ "tail", "-f", "/dev/null"]
    volumeMounts:
    - name: workdir
      mountPath: /data
```

Then start the pod:

```shell
oc create -f archives/d2s-download-pod.yaml
```

And connect with the Shell:

```shell
oc rsh d2s-download-pod
```

![OpenShift](/dsri-documentation/img/openshift-logo.png)