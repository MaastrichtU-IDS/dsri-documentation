---
id: argo-install
title: Install Argo client
---

![Argo project](/dsri-documentation/img/argo-logo.png)

## Install client

See [official documentation](https://argoproj.github.io/docs/argo/demo.html#1-download-argo).

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

## Test argo

Run Hello world workflow to test if argo has been properly installed.

```shell
argo submit --watch https://raw.githubusercontent.com/argoproj/argo/master/examples/hello-world.yaml
```

> You will need to select a project where Argo workflow has been installed.

## Uninstall Argo client

### On Ubuntu

```shell
sudo rm /usr/local/bin/argo
```

> You can now reinstall a newer version of Argo.