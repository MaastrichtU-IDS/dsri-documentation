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

OC version: **3.11.0**

Follow the [official documentation on Windows](https://docs.okd.io/latest/cli_reference/get_started_cli.html#cli-windows) to install the `oc` client.

First, head to this page  and look for the current [Windows client tools](https://github.com/openshift/origin/releases/tag/v3.11.0) release under "Assets"

After downloading the `.zip` and extract all.

Next set the system **PATH** environment variables for the directory containing `oc.exe`, which now resides in your newly created **OpenShift** folder inside of <span style='color:red'>*C:\Program Files (x86)\OpenShift*</span> 

Open the Control Panel, and click on **System**. Click on **Advance system settings** on the left or open the **Advance** tab of *System Properties.* Click the button labeled **Environment Variables..** at the bottom. Look for the option in the *User variables* section for *Path.*

<img class="screenshot" src="/dsri-documentation/img/OC_Path.png" alt="Set OC Path" style="zoom: 100%; max-height: 500px; max-width: 500px;">

This makes it easy to access OC Tools by simply opening up command prompt and typing in an `oc` command.

```powershell
oc version
```

---

## Install the Helm client

> This feature has not been tested at the moment. Please [contact us](mailto:dsri-support-l@maastrichtuniversity.nl) if you are interested in deploying Helm Charts.

[Helm](https://helm.sh/) is a popular package manager for [Kubernetes](https://kubernetes.io/). It allows you to easily deploy [Helm Charts](https://hub.helm.sh/) built by the community. See [this documentation to deploy Helm 3 on OpenShift 4](https://access.redhat.com/documentation/en-us/openshift_container_platform/4.3/html/cli_tools/helm-cli).

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

