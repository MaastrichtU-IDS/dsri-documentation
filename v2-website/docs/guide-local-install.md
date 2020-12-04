---
id: guide-local-install
title: Install local OpenShift
---

OpenShift and Kubernetes can be installed locally on a single machine for test purpose. The installation requires knowledge of your OS administration, and can be quite complex. We recommend to install it locally only if really required. Otherwise we recommend you to simply use Docker to test images, then deploy them on the DSRI.

## Install MiniShift

[](https://docs.okd.io/latest/minishift/getting-started/installing.html)

You will need to [set up the virtualization environment](https://docs.okd.io/latest/minishift/getting-started/setting-up-virtualization-environment.html) before [installing MiniShift](https://docs.okd.io/latest/minishift/getting-started/installing.html).

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

[![Kubernetes](/img/Kubernetes.png)](https://kubernetes.io/)

### kubectl on Ubuntu

For more details: read the official [install Kubernetes on Ubuntu tutorial](https://tutorials.ubuntu.com/tutorial/install-a-local-kubernetes-with-microk8s#0) or see the official [Ubuntu Kubernetes install documentation](https://ubuntu.com/kubernetes/install).

```shell
sudo snap install microk8s --classic
sudo usermod -a -G microk8s $USER
# Restart your machine
mkdir -p ~/.kube
microk8s.kubectl config view --raw > $HOME/.kube/config

# Make sure this works for dashboard on Ubuntu
microk8s.enable dashboard dns
```

> To do only if kubectl is not already installed on your machine:
>
> ```shell
> sudo snap alias microk8s.kubectl kubectl
> ```

### kubectl on MacOS & Windows

Included in Docker installation. Use the installer provided by DockerHub.

> Activate it in Docker Preferences > Kubernetes.

For Windows you will need to download the `kubectl.exe` and place it in your PATH.

* https://storage.googleapis.com/kubernetes-release/release/v1.17.0/bin/windows/amd64/kubectl.exe

We recommend to create a `kubectl` directory in `C:/` and add this `C:/kubectl` to the Path environment variable in System properties > Advanced > Environment Variables > Path

### Install the Dashboard UI

```shell
# Install Kubernetes UI
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0-beta4/aio/deploy/recommended.yaml
kubectl apply -f https://raw.githubusercontent.com/MaastrichtU-IDS/d2s-core/master/argo/roles/kube-dashboard-adminuser-sa.yml
kubectl apply -f https://raw.githubusercontent.com/MaastrichtU-IDS/d2s-core/master/argo/roles/kube-adminuser-rolebinding.yml

# Get the Token to access the dashboard
kubectl -n kube-system describe secret $(kubectl -n kube-system get secret | grep admin-user | awk '{print $1}')


# Windows user will need to execute the 2 commands manually:
kubectl -n kube-system get secret 
# And get the token containing 'admin-user'
kubectl -n kube-system describe secret
# For Windows: give the anonymous user global access
kubectl create clusterrolebinding cluster-system-anonymous --clusterrole=admin --user=system:anonymous
# Note: this could be improved. I think only the Dashboard UI didn't have the required permissions.

# Finally, start the web UI, and chose the Token connection
kubectl proxy
```

> Then visit: http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/
>
> And provide the previously obtained token.

**Warning:** you will need to save the token to login again next time (use the password save from your browser if possible).

### Run kubectl

`kubectl` should be running at start.

Just restart the web UI

```shell
kubectl proxy
```

> Then visit: http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/

### Enable internet

[Debug DNS on Ubuntu](https://kubernetes.io/docs/tasks/administer-cluster/dns-debugging-resolution/)

```shell
microk8s.enable dns
```

> Restart your machine.

You might need to change your firewall configuration

* On Ubuntu

```shell
sudo ufw allow in on cni0
sudo ufw allow out on cni0
sudo ufw default allow routed
```

* Try to connect to the internet from Kubernetes with the [test-busybox pod](https://github.com/MaastrichtU-IDS/d2s-core/blob/master/argo/tests/test-busybox.yaml).

```shell
kubectl exec -ti busybox -- /bin/sh
ping google.com
```

### Create persistent volume

```shell
# Create volume
kubectl apply -n argo -f d2s-core/argo/storage/storage-mac.yaml
```

> Not working at the moment.

### Uninstall

Clean uninstall before 2.2.

```shell
kubectl get cm workflow-controller-configmap -o yaml -n kube-system --export | kubectl apply -n argo -f -
kubectl delete -n kube-system cm workflow-controller-configmap
kubectl delete -n kube-system deploy workflow-controller argo-ui
kubectl delete -n kube-system sa argo argo-ui
kubectl delete -n kube-system svc argo-ui
```

---

## Install Argo workflows

[![Argo project](/img/argo-logo.png)](https://argoproj.github.io/argo/)

### Install on your local Kubernetes

Argo workflows will be installed on the `argo` namespace. See the [official Argo documentation](https://argoproj.github.io/docs/argo/demo.html#2-install-the-controller-and-ui) for more details.

```shell
kubectl create ns argo
kubectl apply -n argo -f https://raw.githubusercontent.com/argoproj/argo/v2.4.2/manifests/install.yaml

# Configure service account to run workflow
kubectl create rolebinding default-admin --clusterrole=admin --serviceaccount=default:default

# Test run
argo submit --watch https://raw.githubusercontent.com/argoproj/argo/master/examples/hello-world.yaml
```

> See [custom configuration](https://raw.githubusercontent.com/vemonet/argo/master/manifests/namespace-install.yaml) for namespace install.
>
> ```shell
> kubectl apply -n argo -f https://raw.githubusercontent.com/vemonet/argo/master/manifests/namespace-install.yaml
> ```

### Install the client

See the [Argo workflows documentation](/dsri-documentation/docs/workflows-argo).

### Expose the UI

```shell
kubectl -n argo port-forward deployment/argo-ui 8002:8001
```

> Access on http://localhost:8002.