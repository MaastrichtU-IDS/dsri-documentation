---
id: openshift-debug
title: Debug a pod
---

Get into a container, to understand why it bugs, by creating a YAML with the command `tail -f /dev/null` to keep it hanging.

> See the [example in the d2s-argo-workflow repository](https://github.com/MaastrichtU-IDS/d2s-argo-workflows/blob/master/tests/test-devnull-pod.yaml).

```yaml
apiVersion: v1
kind: Pod
metadata:
  labels:
    purpose: test
  name: test-devnull-pod
  namespace: test-vincent
spec:
  volumes:
  - name: workdir
    persistentVolumeClaim:
      claimName: pvc-mapr-projects-test-vincent
  containers:
  - name: test-devnull
    image: umids/rdfunit:latest
    command: [ "tail", "-f", "/dev/null"]
    resources:
      limits:
        cpu: 1000m 
        memory: 10Gi 
    volumeMounts:
    - name: workdir
      mountPath: /data
      # subPath: dqa-workspace
```

Then start the pod:

* On OpenShift

```shell
oc create -f tests/test-devnull-pod.yaml -n test-vincent
```

* Or on local kubernetes (to test Argo)

```shell
kubectl create -f tests/test-devnull-pod.yaml
```

And connect with the Shell:

* On OpenShift

```shell
oc rsh test-devnull-pod
```

>Change the pod ID to the generated pod ID.

* Using local Kubernetes

```shell
kubectl exec -it test-devnull-pod -- /bin/bash
```

