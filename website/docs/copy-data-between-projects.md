---
id: copy-data-between-projects
title: Copy Data Between Projects
---

If you have two projects, or more, of which you want to copy data between there is a utility pod "OC copy" that enables you to do so.

:::caution
Read this documentation carefully. There are multiple steps involved to make this work properly. Please **fully** read the documentation first before using the OC copy pod.
:::

## Prerequisites

* A deployment and running pod in the project you want to copy your data and files **to**. For example, a JupyterLab or RStudio deployment.
* A deployment and running pod in the project you want to copy your data and file **from**. Note that the running pod needs to be connected to the PVC which holds your data you want to copy!
* All PVCs need to have storageClass `ocs-storagecluster-cephfs` and volumeMode: `ReadWriteMany` (RWX).

## Select the right template

You will need to deploy the OC copy pod in the project **you want the data to end up**. So, the project where you want to copy the data to needs to have the OC copy pod.
Select the OC copy template via searching for it through the catalogue in the web UI. You will be presented with a form that you'll need to fill in. In the `PVC to mount` field, you need to fill in the PVC name **connected to the running pod to which you want to copy your data and files to**.

## Example - part 1

You have projects `rstudio-project-1` which has data and files you want to copy to project `jupyterlab-project-2`. 
In project `rstudio-project-1`, you have a RStudio pod running connected to a PVC named `rstudio-pvc`. This PVC has your data and files you want to copy to `jupyterlab-project-2`.
In project `jupyterlab-project-2`, you have a JupyterLab pod running conencted to a PVC named `jupyterlab-pvc`. This is the PVC you want to copy the data and files to.
Therefore, you will instantiate the OC copy template in project `jupyterlab-project-2` and will fill in for the `PVC to mount` field the name of the JupyterLab pod's PVC. You will fill in: `jupyterlab-pvc`.

## Using the OC copy pod

To use the OC copy pod you will need to connect to the pod's terminal. You could either do this via the web UI, or via the OC CLI on your machine.

Either use rsh or exec to connect to the OC copy pod's terminal.

```bash
oc rsh -n <projectname> oc-copy
```

or

```bash
oc exec -it oc-copy -n <projectname> -- sh
```

### Starting tmux shell session

:::warning
This is a very important step, especially when copying over large amounts of data and files! This will make sure the copying process will keep on going even when you disconnect from the OC copy pod's terminal.
:::

To start a named tmux shell session run the following command, in this example we name the tmux shell session: `copy`.

```bash
tmux new -s copy
```

### Logging into the OC CLI inside the OC copy pod

To get your token:

1. Go to the DSRI web UI.
2. Click your username in the top right corner and select Copy login command.
3. Paste the command in your terminal and run it.

```bash
oc login https://<URL>:<port> --token=<token>
```

### List available projects, and select the right project

You need to select the correct project. In this case this will be the project you want to copy your data and files **from**.

```bash
oc projects
```

```bash
oc project <projectname>
```

### Get the pod's name

You need to get the correct pod's name. In this case this will be the pod you want to copy your data and files **from**.

```bash
oc get pods
```

### Copy using `oc cp`

`oc cp` copies files or folders, overwriting existing files.

First, get the pod name using your application name:

```bash
oc cp <podname>:<path_to_your_files> /persistent
```

:::caution

Always use the **absolute path** in the pod, for example `/home/jovyan/persistent` for JupyterLab or `/root/persistent` for RStudio.

:::

### Copy using `oc rsync`

Use `oc rsync` when you have many large files or files that change regularly. Unlike `oc cp`, rsync only transfers files that have changed, shows progress, and can resume if interrupted.

```bash
oc rsync --progress <podname>:<path_to_your_files> /persistent
```

:::caution

`oc rsync` does not work with symlinks created with `ln -s`.

:::

:::caution

Always use the **absolute path** in the pod, for example `/home/jovyan/persistent` for JupyterLab or `/root/persistent` for RStudio.

:::

## Detach from the tmux shell session and exit the OC copy pod's terminal

:::warning
This is again a very important step. If not done correctly, the copying process will stop and copying over the data and files will fail!
:::

To detach from the tmux shell session, on your keyboard press:

```
Ctrl-b
```

then

```
d
```

Now you can exit the OC copy pod's terminal without disrupting the copying process.
Just type exit to exit the terminal.

```bash
exit
```

## Reconnect to the OC copy pod's terminal and tmux shell session

When you want to check the progress after a while, or see if the copying process has finished correctly, you can reconnect to the terminal and tmux shell session.

Connect to the OC copy pod's terminal via the web UI, or via the OC CLI on your machine.

Either use rsh or exec to connect to the OC copy pod's terminal.

```bash
oc rsh -n <projectname> oc-copy
```

or

```bash
oc exec -it oc-copy -n <projectname> -- sh
```

### List active tmux sessions

To make sure you are going to reattach to the correct tmux shell session, list the active sessions.

```bash
tmux ls
```

### Reattach to the tmux shell session

Now that you have the name of the tmux shell session, you can reattach to it. Please be aware of the name we gave the tmux shell session earlier in this documentation: `copy`.

```bash
tmux attach -t copy
```

### Additional tmux information 

Scrolling to see earlier output in tmux is `Ctrl-b` then `[`, then `arrow`/`PageUp` to scroll, and `q` to quit scroll mode.

## Example - part 2

In the previous part we instantiated and deployed the OC copy pod in the `jupyterlab-project-2` project and connected the OC copy pod to the `jupyterlab-pvc` PVC. In this part we are going to copy over data and files from the `rstudio-project-1` project to the `jupyterlab-project-2` project. More specifically we will copy it over from the `rstudio-pvc` PVC to the `jupyterlab-pvc` PVC.

First we will connect to the OC copy pod in the `jupyterlab-project-2` project. We will use `oc rsh` for this from the OC CLI.

```bash
oc rsh -n jupyterlab-project-2 oc-copy
```

Now we are connected to the OC copy pod's terminal. Let's start a tmux shell session, so we can safely exit the terminal without losing the copying process when it is still running. 
Note that we name this tmux shell sessions: `copy`

```bash
tmux new -s copy
```

Inside this tmux shell session we will need to log into the OC CLI in order to be able to connect to the `rstudio-project-1` project.
Follow the steps above on how to get your OC CLI token.

```bash
oc login https://<URL>:<port> --token=<token>
```

Next, we need to make sure we are connected to the `rstudio-project-1` project. Let's list our available projects and connect to the `rstudio-project-1` project.

```bash
oc projects
```

output:

```bash
rstudio-project-1
jupyterlab-project-2
```

Connect to the `rstudio-project-1` project.

```bash
oc project rstudio-project-1
```

Now we can retrieve the exact podname of our RStudio pod which is connected to the `rstudio-pvc` PVC, and which has the data and files we want to copy over to the `jupyterlab-project-2` project.

```bash
oc get pods
```

output:

```bash
NAME                           READY   STATUS    RESTARTS   AGE
rstudio-6cbcfd65cf-wj65p       1/1     Running   0          1d
```

Now we can start the copying process. In the example we will use `oc rsync`. Note that the full path to the persistent folder, which has our data and files, in a RStudio pod is `/root/persistent`.

```bash
oc rsync --progress rstudio-6cbcfd65cf-wj65p:/root/persistent /persistent
```

While the copy process is running we can choose to detach from the tmux shell session and exit the OC copy pod's terminal. If we choose not to do so, we need to make sure we stay connected to the terminal. In other words, don't close your laptop/PC, disconnect from the VPN, put your laptop/PC to sleep etc. When you connected to the OC copy pod's terminal via the web UI, don't close your browser.

```
Ctrl-d
```

then

```
d
```

We have detached from the tmux session. We can safely exit the terminal now, and therefore also for example close our laptop.

```
exit
```

If we want to check the progress after a while, or when the copying process is done and you want to verify it, we can reconnect to the OC copy pod's terminal and reattach to the tmux shell session.

First reconnect to the OC copy pod's terminal.

```bash
oc rsh -n jupyterlab-project-2 oc-copy
```

Now we can list the active tmux shell session(s).

```bash
tmux ls
```

output:

```bash
copy: 1 windows (created Fri Jul 31 11:35:40 2026)
```

Let's connect to the (only) tmux shell session, named `copy`.

```bash
tmux attach -t copy
```

You can check the progress, or either verify the copying process finished without any warnings and/or errors. After you can close everything by just typing `exit` in the tmux shell session and `exit` again in the OC copy pod's terminal.