---
id: okd3-workflows-argo
title: Run Argo workflows
---

![Argo project](/img/argo-logo.png)

:::warning Install in your project

Argo needs to be installed in your project, [contact the DSRI team](mailto:dsri-support-l@maastrichtuniversity.nl) to request it.

:::

## Install the `argo` client

[Argo](https://argoproj.github.io/argo/) is a container native workflow engine for [Kubernetes](https://kubernetes.io/) supporting both [DAG](https://argoproj.github.io/docs/argo/examples/readme.html#dag) and [step based](https://argoproj.github.io/docs/argo/examples/readme.html#steps) workflows.

Download and install the [Argo client](https://github.com/argoproj/argo/blob/master/demo.md#1-download-argo) on your computer to [start workflows](https://argoproj.github.io/docs/argo/examples/readme.html) on the DSRI.

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

:::caution Logged in

You will need to have the `oc` client installed and be logged in with `oc login`, see the [install documentation page](/dsri-documentation/docs/openshift-install).

:::


### Uninstall `argo`

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

[Authenticate to the OpenShift cluster](/dsri-documentation/docs/openshift-install) using `oc login` .

### Workflow to convert XML files to RDF

* Steps-based workflow for XML files, see the example workflow [YAML file on GitHub](https://github.com/MaastrichtU-IDS/d2s-core/blob/master/argo/d2s-workflow-xml.yaml).

```shell
argo submit d2s-core/argo/workflows/d2s-workflow-transform-xml.yaml \
  -f support/config/config-transform-xml-drugbank.yml
```

:::info Provide config files

Config files can be provided using the `-f` arguments, but are not necessary.

:::


* DAG workflow for XML files, see the [YAML file on GitHub](https://github.com/MaastrichtU-IDS/d2s-core/blob/master/argo/d2s-workflow-xml-dag.yaml).

```shell
argo submit d2s-core/argo/workflows/d2s-workflow-transform-xml-dag.yaml \
  -f support/config/config-transform-xml-drugbank.yml
```

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

:::caution Solve issue

Try this to solve issue related to steps services IP: `{{steps.nginx-server.pod-ip}}`

:::

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

:::caution Workflow

This might not stop the workflow, in this case use:

```bash
argo delete my-workflow
```

:::

### Delete a workflow

```shell
argo delete my-workflow
```

---

## Debug a workflow

Get into a container, to understand why it bugs, by creating a YAML with the command `tail -f /dev/null` to keep it hanging.

See the [example in the d2s-argo-workflow repository](https://github.com/MaastrichtU-IDS/d2s-core/blob/master/argo/tests/test-devnull-argo.yaml):

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

And connect with the Shell (change the pod ID to your pod ID):

```shell
oc rsh test-devnull-argo-pod
```
