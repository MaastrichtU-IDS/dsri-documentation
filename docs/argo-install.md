---
id: argo-install
title: Install Argo
---

[![Argo project](/dsri-documentation/img/argo-logo.png)](https://argoproj.github.io/argo/)

## Install Argo on OpenShift

Replace `namespace: argo` by your namespace in [namespace-install.yaml](https://github.com/argoproj/argo/blob/master/manifests/namespace-install.yaml#L165).

```shell
oc apply -n test-vincent -f https://raw.githubusercontent.com/MaastrichtU-IDS/argo/master/manifests/namespace-install.yaml
# Updated config
oc apply -n test-vincent -f https://raw.githubusercontent.com/vemonet/argo/develop/manifests/namespace-install.yaml
# Install 2.4.2 on test-vincent
oc apply -n test-vincent -f https://raw.githubusercontent.com/vemonet/argo/vemonet-2.4.2/manifests/namespace-install.yaml

# Get cluster roles
oc describe clusterrole.rbac | less

# Config service account, see link below
oc create rolebinding default-admin --clusterrole=admin --serviceaccount=default:default

# Test it
argo submit --watch https://raw.githubusercontent.com/argoproj/argo/master/examples/hello-world.yaml
```

> [Configure service account](https://github.com/argoproj/argo/blob/master/demo.md#3-configure-the-service-account-to-run-workflows).

## Install client on MacOS

```shell
brew install argoproj/tap/argo
```

