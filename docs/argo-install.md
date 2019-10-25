---
id: argo-install
title: Install Argo workflows
---

[![Argo project](/dsri-documentation/img/argo-logo.png)](https://argoproj.github.io/argo/)

## Install Argo on OpenShift

```shell
oc apply -n test-vincent -f https://raw.githubusercontent.com/MaastrichtU-IDS/argo/master/manifests/namespace-install.yaml

# Get cluster roles
oc describe clusterrole.rbac | less

# Config service account, see link below
oc create rolebinding default-admin --clusterrole=admin --serviceaccount=default:default

argo submit --watch https://raw.githubusercontent.com/argoproj/argo/master/examples/hello-world.yaml
```

> [Configure service account](https://github.com/argoproj/argo/blob/master/demo.md#3-configure-the-service-account-to-run-workflows).

## Install client on MacOS

```shell
brew install argoproj/tap/argo
```

