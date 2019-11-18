---
id: guide-local-install
title: Install local Kubernetes
---

[![OpenShift](/dsri-documentation/img/openshift-logo.png)](https://docs.okd.io/latest/minishift/getting-started/installing.html)

## Install MiniShift

You will need to install the [virtual environment](https://docs.okd.io/latest/minishift/getting-started/setting-up-virtualization-environment.html) before [installing MiniShift](https://docs.okd.io/latest/minishift/getting-started/installing.html).

Download [MiniShift](https://github.com/minishift/minishift/releases) and unzip it.

```shell
# For Ubuntu 18.04 and older
sudo apt install -y libvirt-bin qemu-kvm
# For Ubuntu 18.10 and newer (replace libvirtd by libvirt in next commands)
sudo apt install -y qemu-kvm libvirt-daemon libvirt-daemon-system

# Create group if does not exist
sudo addgroup libvirtd
sudo adduser $(whoami) libvirtd

sudo usermod -a -G libvirtd $(whoami)
newgrp libvirtd
curl -L https://github.com/dhiltgen/docker-machine-kvm/releases/download/v0.10.0/docker-machine-driver-kvm-ubuntu16.04 -o /usr/local/bin/docker-machine-driver-kvm
sudo chmod +x /usr/local/bin/docker-machine-driver-kvm

# Check if libvirtd running
systemctl is-active libvirtd
# Start if inactive
sudo systemctl start libvirtd

# Copy MiniShift in your path
cp minishift-1.34.1-linux-amd64/minishift /usr/local/bin
```

### Start MiniShift

```shell
minishift start
```

> Get your local OpenShift cluster URL after the command complete.

### Login

Go to your local cluster URL.

> E.g. https://192.168.42.58:8443/console/catalog.

> Username: `admin` or `developer`
>
> Password: anything will work

```shell
# As admin
oc login -u system:admin
```

### Stop

```shell
minishift stop
```

### Reset

```shell
minishift delete -f
```

---

## Install kubectl

[![Kubernetes](/dsri-documentation/img/Kubernetes.png)](https://kubernetes.io/)

### kubectl on Ubuntu

```shell
sudo snap install microk8s --classic
sudo snap alias microk8s.kubectl kubectl
mkdir -p ~/.kube
microk8s.kubectl config view --raw > $HOME/.kube/config
```

### kubectl on MacOS & Windows

Included in [Docker installation](/docs/cwl-install#on-macos-windows).

> Activate it in Docker Preferences > Kubernetes.

### Install the Dashboard UI

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

### Create persistent volume

```shell
# Create volume
kubectl apply -n argo -f d2s-argo-workflows/storage/storage-mac.yaml
```

> **TODO:** Not working at the moment.

### Uninstall

Clean uninstall before 2.2.

```shell
kubectl get cm workflow-controller-configmap -o yaml -n kube-system --export | kubectl apply -n argo -f -
kubectl delete -n kube-system cm workflow-controller-configmap
kubectl delete -n kube-system deploy workflow-controller argo-ui
kubectl delete -n kube-system sa argo argo-ui
kubectl delete -n kube-system svc argo-ui
```

> **TODO:** test

---

## Install Argo workflows

[![Argo project](/dsri-documentation/img/argo-logo.png)](https://argoproj.github.io/argo/)

> **TODO:** update to do the global install through MiniShift (we don't need namespace install on local)

```shell
kubectl create ns argo
# On argo namespace
kubectl apply -n argo -f https://raw.githubusercontent.com/vemonet/argo/master/manifests/namespace-install.yaml

kubectl create rolebinding default-admin --clusterrole=admin --serviceaccount=default:default

# Expose Argo UI
kubectl -n argo port-forward deployment/argo-ui 8002:8001
```

> Argo UI on http://localhost:8002.

[![Argo workflows](/dsri-documentation/img/argo-logo.png)](https://argoproj.github.io/)