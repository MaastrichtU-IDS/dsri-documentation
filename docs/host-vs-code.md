---
id: host-vs-code
title: Run Visual Studio Code Server on the OC Cluster
---

Feel free to propose new deployments using [pull requests](https://github.com/MaastrichtU-IDS/dsri-documentation/pulls) or request new ones by creating a [new issues](https://github.com/MaastrichtU-IDS/dsri-documentation/issues).



## Setup on the OC Pod

The following pre-requisites are needed on the OC Pod to host the VS code-server environment,

1. First install tmux using,
```
sudo apt install tmux
```

You can also use any other way to run the VS code-server in the background. ```tmux``` is useful since the terminal environment is accessible easily.

2. Follow the instructions to install code-server on your OC Pod from [https://github.com/cdr/code-server](https://github.com/cdr/code-server)

3. Open up a tmux session and run code-server. The code-server runs on port 8080 by default. Look at ```~/.config/code-server/config.yaml``` for more information (Auth password, port, host etc.)


## Setup on local machine

On the local machine, run the following commands to port-forward the VS code-server on a local port.

1. Install ```oc``` client from [openshift-install](openshift-install.md)
2. Once installed, use the ```oc login``` command from [openshift-login](openshift-login.md) to login.
3. Once logged in, you can use ```oc get pods``` to get a list of your pods. Select the pod where code-server was hosted and run
```
oc port-forward <pod_id> 8080:8080
```

This forwards the server to port 8080 on your local machine. You can then go to http://localhost:8080 and access VS Code. 
