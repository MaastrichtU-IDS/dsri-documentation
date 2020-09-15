---
id: deploy-vscode
title: Start a VSCode server
---

## Start pod with VisualStudio Code

### Standalone VSCode

Use the **VisualStudio Code (Persistent)** template to start a simple pod on a CPU node with VisualStudio Code and Python3.7 installed.

> You will be able to access it directly on the DSRI using the generated URL.

> We recommend to **use Chrome** as pasting in the terminal (`ctrl + shift + v`) won't work on Firefox

### VSCode for GPU

See the [Deploy on GPU](/dsri-documentation/docs/deploy-on-gpu) page.

## Git login in VSCode

VSCode will prompt a window to give permission to GitHub in a web page, if this option does not work you can cancel this window and VSCode will ask your for username and password.

You can run this command to ask git to save your password:

```bash
git config credential.helper cache
```

## Install VisualStudio Code in existing pod

Installing VSCode in another existing pod requires to forward the port 8080 to your localhost.

### Install VSCode

Install code-server in the pod:

```bash
curl -fsSL https://code-server.dev/install.sh | sh
```

Run it in the background:

```bash
nohup code-server &
```

The following pre-requisites are needed on the OC Pod to host the VS code-server environment,

1. First install tmux using,
```bash
sudo apt install tmux
```

You can also use any other way to run the VS code-server in the background. ```tmux``` is useful since the terminal environment is accessible easily.

2. Follow the instructions to install code-server on your OC Pod from [https://github.com/cdr/code-server](https://github.com/cdr/code-server)

Install code-server:

```bash
curl -fsSL https://code-server.dev/install.sh | sh
```

3. Open up a tmux session and run code-server. 

```bash
code-server
```

> The code-server runs on port 8080 by default. Look at ```~/.config/code-server/config.yaml``` for more information (Auth password, port, host etc.)

### Forward on local machine

On the local machine, run the following commands to port-forward the VS code-server on a local port.

1. Install ```oc``` client from [openshift-install](openshift-install.md)
2. Once installed, use the ```oc login``` command from [openshift-login](openshift-login.md) to login.
3. Once logged in, you can use ```oc get pods``` to get a list of your pods. Select the pod where code-server was hosted and run
```bash
oc port-forward <pod_id> 8080:8080
```

This forwards the server to port 8080 on your local machine. You can then go to http://localhost:8080 and access VS Code. 
