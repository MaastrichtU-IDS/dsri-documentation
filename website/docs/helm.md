---
id: helm
title: Install from Helm charts
---

[Helm](https://helm.sh/) is a popular package manager for [Kubernetes](https://kubernetes.io/). A Helm chart is a bundle of parameterizable YAML resources for Kubernetes/OpenShift.

:::caution Difference with Operators

Helm charts can be defined as [Operators](/docs/operators) (if they are packaged using the `operator-sdk`), but they are not all Operators.

:::

See the official [documentation for Helm on OpenShift](https://docs.openshift.com/container-platform/4.6/cli_reference/helm_cli/getting-started-with-helm-on-openshift-container-platform.html).

## Install the Helm client

### Install Golang

Go lang is required to run Helm. Install `go 1.14.4` on Linux, you can find instructions for MacOS, Windows and newer versions at https://golang.org/dl

```shell
wget https://dl.google.com/go/go1.14.4.linux-amd64.tar.gz

# Extract to /usr/local
tar -C /usr/local -xzf go1.14.4.linux-amd64.tar.gz

# Add Go to path in .profile
echo "export PATH=$PATH:/usr/local/go/bin" >> ~/.profile
# Or in .zshrc if you use ZSH
echo "export PATH=$PATH:/usr/local/go/bin" >> ~/.zshrc
```

> Restart your laptop for the changes to take effects or execute `source ~/.profile`

### Install Helm

You can also use the [official documentation to install Helm](https://helm.sh/docs/intro/install/) on your machine.

#### Install on Linux

```shell
curl https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3 | bash
```

> See [Helm documentation for Linux](https://helm.sh/docs/intro/install/#from-the-binary-releases).

#### Install on MacOS

```shell
brew install helm
```

> See [Helm documentation for MacOS](https://helm.sh/docs/intro/install/#from-homebrew-macos).

#### Install on Windows

Install using [Chocolatey](https://chocolatey.org/).

```shell
choco install kubernetes-helm
```

> See [Helm documentation for Windows](https://helm.sh/docs/intro/install/#from-chocolatey-windows).

### Check Helm installation

```shell
helm version
```

## Install a Helm chart

Explore published Helm charts at [https://hub.helm.sh ⛵](https://hub.helm.sh)

### Start a MySQL database with Helm

Example from the [OpenShift 4.3 documentation](https://docs.openshift.com/container-platform/4.3/cli_reference/helm_cli/getting-started-with-helm-on-openshift-container-platform.html). See also the [official Helm documentation](https://helm.sh/docs/intro/using_helm/).

1. Add the repository of official Helm charts to your local Helm client:

```bash
helm repo add stable https://kubernetes-charts.storage.googleapis.com/
```

2. Update the repository:

```bash
helm repo update
```

3. Install an example MySQL chart, and start the application named `example-mysql`:

```bash
helm install example-mysql stable/mysql
```

:::info Password

The instructions to retrieve the admin password and connect to the database will be displayed in the terminal. 

Retrieve the database password with this command (N.B.: `kubectl` can also be used in place of `oc`):

```bash
oc get secret example-mysql -o jsonpath="{.data.mysql-root-password}" | base64 --decode; echo
```

:::

4. Verify that the chart has installed successfully:

```bash
helm list
```

5. Expose the MySQL service as a route:

```bash
oc expose service example-mysql
oc get routes
```

Or port-forward to http://localhost:3306

```bash
oc port-forward svc/example-mysql 3306
```

### Uninstall the application

```bash
helm uninstall example-mysql
```

### Set deployment parameters

You can also define deployment parameters when installing a Helm chart, such as the **service account** and **node selector**. 

For example, here we make sure the application will run on DSRI CPU nodes and use the `anyuid` service account:

Add Bitnami repository:

```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
```

Install and start Postgresql:

```bash
helm install postgresql-db bitnami/postgresql --set nodeSelector.dsri.unimaas.nl/cpu=true --set serviceAccount.name=anyuid
```



