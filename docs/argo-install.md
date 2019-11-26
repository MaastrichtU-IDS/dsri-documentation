---
id: argo-install
title: Install Argo client
---

![Argo project](/dsri-documentation/img/argo-logo.png)

## Install the client

[Argo](https://argoproj.github.io/argo/) is a container native workflow engine for [Kubernetes](https://kubernetes.io/) supporting both [DAG](https://argoproj.github.io/docs/argo/examples/readme.html#dag) and [step based](https://argoproj.github.io/docs/argo/examples/readme.html#steps) workflows.

Download the [Argo client](https://github.com/argoproj/argo/blob/master/demo.md#1-download-argo) to [run workflows](https://argoproj.github.io/docs/argo/examples/readme.html) on the DSRI cluster, from your computer.

### On Ubuntu

```shell
sudo curl -L -o /usr/local/bin/argo https://github.com/argoproj/argo/releases/download/v2.4.2/argo-linux-amd64
sudo chmod +x /usr/local/bin/argo
```

### On MacOS

```shell
brew install argoproj/tap/argo
```

### On Windows

Get [Argo executable version 2.4.2](https://github.com/argoproj/argo/releases/download/v2.4.2/argo-windows-amd64) from [Argo Releases](https://github.com/argoproj/argo/releases) on GitHub.

> See [official Argo documentation](https://argoproj.github.io/docs/argo/demo.html#1-download-argo).

## Test Argo

Run Hello world workflow to test if Argo has been properly installed. And take a look at the [examples provided in Argo documentation](https://argoproj.github.io/docs/argo/examples/readme.html) to discover how to use the different features available.

```shell
argo submit --watch https://raw.githubusercontent.com/argoproj/argo/master/examples/hello-world.yaml
```

> You will need to be connected with the `oc` client, and select a project where Argo has been installed.

## Install the OpenShift client

You will need to have the `oc` client installed, see the [install documentation page](/dsri-documentation/docs/openshift-install).

> It will allow you to [authenticate to the OpenShift cluster](/dsri-documentation/docs/openshift-login) using `oc login` .

## Uninstall Argo client

### On Ubuntu

```shell
sudo rm /usr/local/bin/argo
```

> You can now reinstall a newer version of Argo.