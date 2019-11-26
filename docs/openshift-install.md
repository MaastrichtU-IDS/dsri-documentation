---
id: openshift-install
title: Installation
sidebar_label: Installation
---


## Install the OpenShift client

![OpenShift](/dsri-documentation/img/openshift-logo.png)

### On Linux

```shell
wget https://github.com/openshift/origin/releases/download/v3.11.0/openshift-origin-client-tools-v3.11.0-0cbc58b-linux-64bit.tar.gz
tar xvf openshift-origin-client-tools*.tar.gz
cd openshift-origin-client*/
sudo mv oc kubectl /usr/local/bin/
```

> See the [official documentation on Linux](https://docs.okd.io/latest/cli_reference/get_started_cli.html#cli-linux) for more details.

### On Mac

```shell
brew install openshift-cli
```

> For people that know what they are doing: download the `.zip` from [GitHub Releases](https://github.com/openshift/origin/releases) and unzip it in your path.

> See the [official documentation on MacOS](https://docs.okd.io/latest/cli_reference/get_started_cli.html#cli-mac) for more details.

### On Windows

Follow the [official documentation on Windows](https://docs.okd.io/latest/cli_reference/get_started_cli.html#cli-windows) to install the `oc` client.

---

## Install the Helm client

[Helm](https://helm.sh/) is a popular package manager for [Kubernetes](https://kubernetes.io/). It allows you to easily deploy [Helm Charts](https://hub.helm.sh/) built by the community.

### On Linux

```shell
curl https://get.helm.sh/helm-v3.0.0-linux-amd64.tar.gz > helm-v3.0.0-linux-amd64.tar.gz
tar -zxvf helm-v3.0.0-linux-amd64.tar.gz
sudo mv linux-amd64/helm /usr/local/bin/helm
```

> See [Helm documentation for Linux](https://helm.sh/docs/intro/install/#from-the-binary-releases).

### On MacOS

```shell
brew install helm
```

> See [Helm documentation for MacOS](https://helm.sh/docs/intro/install/#from-homebrew-macos).

### On Windows

Install using [Chocolatey](https://chocolatey.org/).

```shell
choco install kubernetes-helm
```

> See [Helm documentation for Windows](https://helm.sh/docs/intro/install/#from-chocolatey-windows).