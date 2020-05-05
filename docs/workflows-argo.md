---
id: workflows-argo
title: Run Argo workflows
---

![Argo project](/dsri-documentation/img/argo-logo.png)

## Install the client

[Argo](https://argoproj.github.io/argo/) is a container native workflow engine for [Kubernetes](https://kubernetes.io/) supporting both [DAG](https://argoproj.github.io/docs/argo/examples/readme.html#dag) and [step based](https://argoproj.github.io/docs/argo/examples/readme.html#steps) workflows.

Download the [Argo client](https://github.com/argoproj/argo/blob/master/demo.md#1-download-argo) to [run workflows](https://argoproj.github.io/docs/argo/examples/readme.html) on the DSRI cluster, from your computer.

### On Ubuntu

```shell
sudo curl -L -o /usr/local/bin/argo https://github.com/argoproj/argo/releases/download/v2.4.2/argo-linux-amd64
sudo chmod +x /usr/local/bin/argo
```

### On MacOS

```shell
brew install argoproj/tap/argo
```

### On Windows

Get [Argo executable version 2.4.2](https://github.com/argoproj/argo/releases/download/v2.4.2/argo-windows-amd64) from [Argo Releases](https://github.com/argoproj/argo/releases) on GitHub.

> See [official Argo documentation](https://argoproj.github.io/docs/argo/demo.html#1-download-argo).

### Test Argo

Run Hello world workflow to test if Argo has been properly installed. And take a look at the [examples provided in Argo documentation](https://argoproj.github.io/docs/argo/examples/readme.html) to discover how to use the different features available.

```shell
argo submit --watch https://raw.githubusercontent.com/argoproj/argo/master/examples/hello-world.yaml
```

> You will need to have the `oc` client installed, see the [install documentation page](/dsri-documentation/docs/openshift-install).

> It will allow you to [authenticate to the OpenShift cluster](/dsri-documentation/docs/openshift-login) using `oc login` .

> Argo needs to be installed in your project, contact the DSRI team to request it.


### Uninstall Argo client

#### On Ubuntu

```shell
sudo rm /usr/local/bin/argo
```

> You can now reinstall a newer version of Argo.

---

## Run workflows to convert structured data to RDF

We will use examples from the [MaastrichtU-IDS/d2s-core](https://github.com/MaastrichtU-IDS/d2s-core) project.

### Clone the repository

```shell
git clone --recursive https://github.com/MaastrichtU-IDS/d2s-project-template.git
cd d2s-project-template
```

[Authenticate to the OpenShift cluster](/dsri-documentation/docs/openshift-login) using `oc login` .

### Workflow to convert XML files to RDF

* Steps-based workflow for XML files

```shell
argo submit d2s-core/argo/workflows/d2s-workflow-transform-xml.yaml \
  -f support/config/config-transform-xml-drugbank.yml
```

> Config files can be provided using the `-f` arguments, but are not necessary.

> See the example workflow [YAML file on GitHub](https://github.com/MaastrichtU-IDS/d2s-core/blob/master/argo/d2s-workflow-xml.yaml).


* DAG workflow  for XML files

```shell
argo submit d2s-core/argo/workflows/d2s-workflow-transform-xml-dag.yaml \
  -f support/config/config-transform-xml-drugbank.yml
```

> See the [YAML file on GitHub](https://github.com/MaastrichtU-IDS/d2s-core/blob/master/argo/d2s-workflow-xml-dag.yaml).

### Workflow to convert CSV files to RDF

* Steps-based workflow for CSV files

```shell
argo submit d2s-core/argo/workflows/d2s-workflow-transform-csv.yaml \
  -f support/config/config-transform-csv-stitch.yml
```

* DAG workflow for CSV files

```shell
argo submit d2s-core/argo/workflows/d2s-workflow-transform-csv-dag.yaml \
  -f support/config/config-transform-csv-stitch.yml
```

> Try this to solve steps services IP: `{{steps.nginx-server.pod-ip}}`

---

## Argo commands

### List running Argo workflows

```shell
argo list
```

### Stop a workflow

```shell
argo terminate my-workflow
```

> This might not stop the workflow, in this case use `argo delete`

### Delete a workflow

```shell
argo delete my-workflow
```

---

## Debug a workflow

Get into a container, to understand why it bugs, by creating a YAML with the command `tail -f /dev/null` to keep it hanging.

> See the [example in the d2s-argo-workflow repository](https://github.com/MaastrichtU-IDS/d2s-core/blob/master/argo/tests/test-devnull-argo.yaml).

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Workflow
metadata:
  generateName: test-devnull-argo-
spec:
  entrypoint: execute-workflow

  # Use existing volume
  volumes:
  - name: workdir
    persistentVolumeClaim:
      claimName: pvc-mapr-projects-test-vincent 

  templates:
  - name: execute-workflow
    steps:
    - - name: run-rdfunit
        template: rdfunit
   
  - name: rdfunit
    container:
      image: umids/rdfunit:latest
      command: [tail]
      args: ["-f", "/dev/null"]
      volumeMounts:
      - name: workdir
        mountPath: /data
        subPath: dqa-workspace
```

Then start the workflow:

```shell
argo submit --serviceaccount argo tests/test-devnull-argo.yaml
```

And connect with the Shell:

```shell
oc rsh test-devnull-argo-pod
```

> Change the pod ID to the generated pod ID.