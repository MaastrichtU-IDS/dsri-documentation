---
id: workflows-nextflow
title: Run Nextflow Workflows
---

[Nextflow](https://www.nextflow.io/) enables scalable and reproducible scientific workflows using software containers. It allows the adaptation of pipelines written in the most common scripting languages.

Nextflow has been developed by the genomic research scientific community and is built to run bioinformatics pipeline.

Define your workflow in a Bash script fashion, providing input, output and the command to run. Without the need to create and use Docker container for pipelines.

:::info Official documentation

See the [Nextflow documentation](https://www.nextflow.io/docs/latest/getstarted.html#installation).

:::

## Install Nextflow

Install the `nextflow` client on your local device:

```shell
wget -qO- https://get.nextflow.io | bash
```

## Log into the DSRI with OC CLI

See our [CLI documentation](https://dsri.maastrichtuniversity.nl/docs/openshift-install) to read about how to install the CLI and log into the DSRI with it.

## Create the correct Persistent Volume Claim

To use Nexflow, you will need a Persistent Volume Claim (PVC) with ReadWriteMany (RWX) permissions set in your namespace you are going to use for your Nextflow workflow. To read more about how to set up an PVC on the DSRI, please refer to our [documentation](https://dsri.maastrichtuniversity.nl/docs/openshift-storage#create-the-persistent-storage). 

Make sure when creating an PVC with RWX permissions to use the storageClass `ocs-storagecluster-cephfs`! This storageClass is needed to be able to set the RWX permissions.

## Create Nextflow configuration file

In the directory where you have installed Nextflow on your local computer, you will need to create a file named `nextflow.config`.

In this fill you will need to set the correct serviceaccount which Nextflow will use, and the namespace you want to run your Nextflow pipeline in.

```bash
k8s {
    serviceAccount = 'deployer'
    namespace      = 'namespace-name'
}
```

Make sure to set the serviceaccount to `deployer`, as this is the correct serviceaccount to use! Change the `namespace-name` accordingly to match the namespace you want to run your Nextflow workflow in.

## Run workflow

Try the hello world workflow from Nextflow:

```shell
nextflow kuberun https://github.com/nextflow-io/hello -v pvc-name:/data
```

This will map the `/data` directory in your Nextflow workflow pod(s) to the PVC you have created for this workflow.

To read more about how to use Nextflow on a Kubernetes cluster please refer to their [documentation](https://www.nextflow.io/docs/latest/kubernetes.html).