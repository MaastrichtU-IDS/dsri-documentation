---
id: openshift-commands
title: Command Line Interface
---



## Overview

Here is an overview of common `oc` commands:

| **Command**                      | **Description**                                              |
| -------------------------------- | ------------------------------------------------------------ |
| `oc login <host> -u <user>`      | Login to the DSRI OpenShift cluster in your terminal         |
| `oc get projects`                | List all available projects                                  |
| `oc project <project> `          | Switch to project                                            |
| `oc get pods `                   | Get running pods (a pod can run one or multiple containers for your application) |
| `oc rsh <pod_name> <command>`    | Remote terminal connexion to a pod (Shell/Bash)              |
| `oc cp <from> <to>`              | Copy files from host to container or vice versa, e.g. from host: `oc cp <local dir> <pod>:<pod_dir>` or from to host: `oc cp <pod>:<pod_dir> <local dir>` |
| `oc rsync <from> <to>`           | Similar to rsync command on Linux to synchronize directories between container and host or the other way around |
| `oc exec <pod_id> <folder_path>` | Execute command in pods                                      |
| `oc delete pod <pod_id>`         | Delete pod                                                   |

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

List running pods:

```bash
oc get pods --field-selector=status.phase=Running
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
```

:::caution Force pod deletion

If the pod is not properly deleted, you can force its deletion:

```bash
oc delete pod --force --grace-period=0 <pod_id>
```

:::

### Get pod logs

```shell
oc logs -f <pod_id>
```

:::info Debug a pod

Get more details on how to [debug a pod](/dsri-documentation/docs/openshift-debug).

:::

## Create app from template

Create app from template using the CLI and providing parameters as arguments:

```bash
oc new-app my-template -p APPLICATION_NAME=my-app,ADMIN_PASSWORD=mypassword
```

Example for the Semantic Web course notebooks:

```bash
oc new-app template-jupyterstack-notebook -p APPLICATION_NAME=swcourseName,NOTEBOOK_PASSWORD=PASSWORD

oc delete all --selector template=template-jupyterstack-notebook
```

### Copy files

See the [Load data](https://maastrichtu-ids.github.io/dsri-documentation/docs/openshift-load-data) page.

