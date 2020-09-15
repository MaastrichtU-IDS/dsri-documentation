---
id: openshift-debug
title: Debug an application
---

## Debug from the web UI

Some debugging can be done through the [DSRI web UI](https://app.dsri.unimaas.nl:8443).

* If the pod is not building or deploying properly take a look at the `Events` tab of the deployment.  It is a log of all events faced by the deployment (pull image, install, etc).

* You can also check the `Monitoring` page in the left side menu to see all events in a project.

* When a pod is running you can check its logs in the `Logs` tab of a pod web page.

## Debug build

If a build or deployment if failing you can see the detail of the last events of the DSRI using

```shell
oc get events
```

## Debug pod

Get into a container, to understand why it bugs, by creating a YAML with the command `tail -f /dev/null` to keep it hanging.

> See the [example in the d2s-argo-workflow repository](https://github.com/MaastrichtU-IDS/d2s-core/blob/master/argo/tests/test-devnull-pod.yaml).

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
      # Change you PVC here
      claimName: pvc-mapr-projects-test-vincent
  containers:
  - name: test-devnull
    image: umids/rdfunit:latest
    # Change the container image to test here
    command: [ "tail", "-f", "/dev/null"]
    resources:
      limits:
        cpu: 1000m 
        memory: 10Gi 
    volumeMounts:
    - name: workdir
      mountPath: /data
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

## Debug an Argo workflow

Pod can also be tested within an Argo workflow, see [tests/test-devnull-argo.yaml](https://github.com/MaastrichtU-IDS/d2s-core/blob/master/argo/tests/test-devnull-argo.yaml).

```shell
argo submit tests/test-devnull-argo.yaml
```
