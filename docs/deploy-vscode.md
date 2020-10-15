---
id: deploy-vscode
title: Start a VSCode server
---

## Start VisualStudio Code server

Use the **VisualStudio Code in the browser (Dynamic)** template to start a simple pod on a CPU node with a VisualStudio Code server

Packages installed:

* Python3.7
* Java 11
* NodeJS and NPM

If the VisualStudio Code templates are not available you can create it yourself:

```bash
oc apply -f oc apply -f https://raw.githubusercontent.com/MaastrichtU-IDS/dsri-openshift-applications/main/templates-datascience/template-vscode-dynamic.yml
```

> **You will not be root user**⚠️ you will be able to install new `pip` packages, but you will not have `sudo` privileges (so no installation of `apt` or `yum` packages)

> We recommend to **use Chrome** as pasting in the terminal (`ctrl + shift + v`) won't work on Firefox

### Git login in VSCode

VisualStudio will prompt a window to give permission to GitHub in a web page, if this option does not work you can cancel this window and VSCode will ask your for username and password.

You can run this command to ask git to save your password:

```bash
git config credential.helper cache
```

## VSCode for GPU

See the [Deploy on GPU](/dsri-documentation/docs/deploy-on-gpu) page to deploy a VisualStudio Code server on GPU.