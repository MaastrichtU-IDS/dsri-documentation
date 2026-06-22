---
id: openshift-commands
title: Command Line Tips
---

## Overview

Here is an overview of common `oc` commands:

| **Command** | **Description** |
| --- | --- |
| `oc login --token=<token>` | Login to the DSRI cluster in your terminal |
| `oc get projects` | List all available projects |
| `oc project <project>` | Switch to a project |
| `oc get pods` | List running pods |
| `oc rsh <pod-name>` | Open a remote shell connection to a pod |
| `oc cp <from> <to>` | Copy files between your machine and a pod |
| `oc rsync <from> <to>` | Synchronize directories between your machine and a pod |
| `oc exec <pod-id> -- <command>` | Execute a command in a pod |
| `oc delete pod <pod-id>` | Delete a pod |

## Projects

List all projects:

```bash
oc projects
```

Switch to a project:

```bash
oc project my-project
```

## Pods

### List pods

```bash
oc get pods
```

List only running pods:

```bash
oc get pods --field-selector=status.phase=Running
```

### Get a specific pod

```bash
oc get pod | grep <pod-id>
```

Using a selector (Apache Flink example):

```bash
oc get pod --selector app=flink --selector component=jobmanager --no-headers -o=custom-columns=NAME:.metadata.name
```

### Connect to a pod

Open a shell connection to a pod:

```bash
oc rsh <pod-id>
```

### Execute a command in a pod

```bash
oc exec <pod-id> -- mkdir -p /mnt/workspace/resources
```

### Get pod logs

```bash
oc logs -f <pod-id>
```

### Delete a pod

```bash
oc delete pod <pod-id>
```

:::caution Force deletion

If the pod is not deleting properly, force it:

```bash
oc delete pod --force --grace-period=0 <pod-id>
```

:::

:::info

See the [monitoring guide](/docs/guide-monitoring) for more details on how to debug a pod.

:::

## Deployments

Restart a deployment:

```bash
oc rollout restart deployment/<name>
```

Scale a deployment down:

```bash
oc scale deployment/<name> --replicas=0
```

Scale a deployment back up:

```bash
oc scale deployment/<name> --replicas=1
```

## Storage

List all Persistent Volume Claims in your project:

```bash
oc get pvc
```

Get details on a specific PVC:

```bash
oc describe pvc <pvc-name>
```

## Debugging

Get detailed information and events for a pod:

```bash
oc describe pod <pod-id>
```

List recent events in your project:

```bash
oc get events
```

## ImageStreams

To update an ImageStream to pull the latest version from an external registry (e.g. ghcr.io or DockerHub):

```bash
oc import-image <imagestream-id>
```

## Create a pod from a YAML file

```bash
oc create -f my-pod.yaml
```

## Deploy from a template

Deploy an application from a template using the CLI:

```bash
oc new-app my-template -p APPLICATION_NAME=my-app -p ADMIN_PASSWORD=mypassword
```

## Copy files

See the [Load data](/docs/openshift-load-data) page.