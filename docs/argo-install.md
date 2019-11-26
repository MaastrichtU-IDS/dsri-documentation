---
id: argo-install
title: Install Argo client
---

![Argo project](/dsri-documentation/img/argo-logo.png)

## Install client

[Argo](https://argoproj.github.io/argo/) allows you to describe and run workflows on [Kubernetes](https://kubernetes.io/) clusters.

Download the [Argo client](https://github.com/argoproj/argo/blob/master/demo.md#1-download-argo) to run workflows on the cluster, from your computer.

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

## Test argo

Run Hello world workflow to test if argo has been properly installed.

```shell
argo submit --watch https://raw.githubusercontent.com/argoproj/argo/master/examples/hello-world.yaml
```

> You will need to select a project where Argo workflow has been installed.

## Install OpenShift client

You might also need to install the `oc` client, see the [install documentation page](/dsri-documentation/docs/openshift-install).

## Uninstall Argo client

### On Ubuntu

```shell
sudo rm /usr/local/bin/argo
```

> You can now reinstall a newer version of Argo.