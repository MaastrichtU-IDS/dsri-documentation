---
 id: helm
title: Helm package manager
---

> This feature has not been tested at the moment. Please [contact us](mailto:dsri-support-l@maastrichtuniversity.nl) if you are interested in deploying Helm Charts.

[Helm](https://helm.sh/) is a popular package manager for [Kubernetes](https://kubernetes.io/). It allows you to easily deploy [Helm Charts](https://hub.helm.sh/) built by the community. See [this documentation to deploy Helm 3 on OpenShift 4](https://access.redhat.com/documentation/en-us/openshift_container_platform/4.3/html/cli_tools/helm-cli).

## Install the Helm client

### Install Golang

Install `go 1.14.4` on Linux, you can find instructions for MacOS, Windows and newer versions at https://golang.org/dl

```shell
wget https://dl.google.com/go/go1.14.4.linux-amd64.tar.gz

# Extract to /usr/local
tar -C /usr/local -xzf go1.14.4.linux-amd64.tar.gz

# Add Go to path in .profile
echo "export PATH=$PATH:/usr/local/go/bin" >> ~/.profile
```

> Restart your laptop for the changes to take effects or execute `source ~/.profile`

### Helm on Linux

```shell
curl https://get.helm.sh/helm-v3.2.2-linux-amd64.tar.gz > helm-v3.2.2-linux-amd64.tar.gz
tar -zxvf helm-v3.2.2-linux-amd64.tar.gz
sudo mv linux-amd64/helm /usr/local/bin/helm
```

> See [Helm documentation for Linux](https://helm.sh/docs/intro/install/#from-the-binary-releases).

Or use official OpenShift 4 version:

```shell
curl -L https://mirror.openshift.com/pub/openshift-v4/clients/helm/latest/helm-linux-amd64 -o /usr/local/bin/helm
chmod +x /usr/local/bin/helm
```

### Helm on MacOS

```shell
brew install helm
```

> See [Helm documentation for MacOS](https://helm.sh/docs/intro/install/#from-homebrew-macos).

### Helm on Windows

Install using [Chocolatey](https://chocolatey.org/).

```shell
choco install kubernetes-helm
```

> See [Helm documentation for Windows](https://helm.sh/docs/intro/install/#from-chocolatey-windows).

### Check Helm installation

```shell
helm version
```

