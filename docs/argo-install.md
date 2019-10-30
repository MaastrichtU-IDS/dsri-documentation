---
id: argo-install
title: Install Argo
---

[![Argo project](/dsri-documentation/img/argo-logo.png)](https://argoproj.github.io/argo/)

## Install client

See [official documentation](https://argoproj.github.io/docs/argo/demo.html#1-download-argo).

### On Ubuntu

```shell
sudo curl -sSL -o /usr/local/bin/argo https://github.com/argoproj/argo/releases/download/v2.2.1/argo-linux-amd64
sudo chmod +x /usr/local/bin/argo
```

### On MacOS

```shell
brew install argoproj/tap/argo
```

---

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

# Config service account (default on default namespace), see link below
oc create rolebinding default-admin --clusterrole=admin --serviceaccount=default:default
oc create rolebinding default-admin --clusterrole=admin --serviceaccount=argo:test-vincent

# Test it
argo submit --watch https://raw.githubusercontent.com/argoproj/argo/master/examples/hello-world.yaml

```

> [Configure service account](https://github.com/argoproj/argo/blob/master/demo.md#3-configure-the-service-account-to-run-workflows).

---

## Install local Kubernetes

### Install kubectl on Ubuntu

```shell
sudo snap install microk8s --classic
sudo snap alias microk8s.kubectl kubectl
mkdir -p ~/.kube
microk8s.kubectl config view --raw > $HOME/.kube/config
```

### Install kubectl on MacOS & Windows

Included in [Docker installation](/docs/cwl-install#on-macos-windows).

> Activate it in Docker Preferences > Kubernetes.

---

### Install Dashboard UI

```shell
# Install Kubernetes UI
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0-beta4/aio/deploy/recommended.yaml
kubectl apply -f d2s-argo-workflows/roles/dashboard-adminuser.yml
kubectl apply -f d2s-argo-workflows/roles/admin-role-binding.yml
# Get the Token
kubectl -n kube-system describe secret $(kubectl -n kube-system get secret | grep admin-user | awk '{print $1}')

# Start proxy
kubectl proxy
```

> Then visit: http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/

---

### Install Argo

```shell
kubectl create ns argo
# On argo namespace
kubectl apply -n argo -f https://raw.githubusercontent.com/vemonet/argo/master/manifests/namespace-install.yaml

kubectl create rolebinding default-admin --clusterrole=admin --serviceaccount=default:default

# Expose Argo UI
kubectl -n argo port-forward deployment/argo-ui 8002:8001
```

> Argo UI on http://localhost:8002.

---

### Create persistent volume

```shell
# Create volume
kubectl apply -n argo -f d2s-argo-workflows/storage/storage-mac.yaml
```

> **TODO:** Not working at the moment.

---

## Uninstall

Clean uninstall before 2.2.

```shell
kubectl get cm workflow-controller-configmap -o yaml -n kube-system --export | kubectl apply -n argo -f -
kubectl delete -n kube-system cm workflow-controller-configmap
kubectl delete -n kube-system deploy workflow-controller argo-ui
kubectl delete -n kube-system sa argo argo-ui
kubectl delete -n kube-system svc argo-ui
```

[![Kubernetes](/dsri-documentation/img/Kubernetes.png)](https://kubernetes.io/)