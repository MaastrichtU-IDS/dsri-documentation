---
id: workflows-nextflow
title: Run Nextflow Workflows
---

[Nextflow](https://www.nextflow.io/) enables scalable and reproducible scientific workflows using software containers. It allows the adaptation of pipelines written in the most common scripting languages.

Nextflow has been developed by the genomic research scientific community and is built to run bioinformatics pipeline.

Define your workflow in a Bash script fashion, providing input, output and the command to run. Without the need to create and use Docker container for pipelines.

:::info Official documentation

See the [Nextflow documentation](https://docs.seqera.io/nextflow/).

:::

## Install Nextflow

Install the `nextflow` client on your local device:

```shell
wget -qO- https://get.nextflow.io | bash
```

## Log into the DSRI with OC CLI

See our [CLI documentation](https://dsri.maastrichtuniversity.nl/docs/openshift-install) to read about how to install the CLI and log into the DSRI with it.

## Create the correct Persistent Volume Claim

To use Nexflow, you will need a Persistent Volume Claim (PVC) with ReadWriteMany (RWX) permissions set in your project you are going to use for your Nextflow workflow. To read more about how to set up an PVC on the DSRI, please refer to our [documentation](https://dsri.maastrichtuniversity.nl/docs/openshift-storage#create-the-persistent-storage). 

Make sure when creating an PVC with RWX permissions to use the storageClass `ocs-storagecluster-cephfs`! This storageClass is needed to be able to set the RWX permissions.

## Create Nextflow serviceaccount

To run a Nextflow pipeline you will need a serviceaccount with specific priviliges in your project. You will need to use this service account in your Nextflow configuration described in the next step.

First you will need to creaste the correct role. Note that the namespace field is left empty,and you will need to fill in your project name. Save this file as `nextflow-pod-manager-role.yaml`.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: nextflow-pod-manager
  namespace: <project name>
rules:
  - apiGroups: [""]
    resources: ["pods"]
    verbs: ["get", "list", "watch", "create", "delete", "patch"]
  - apiGroups: [""]
    resources: ["pods/log", "pods/status"]
    verbs: ["get", "list", "watch"]
  - apiGroups: [""]
    resources: ["configmaps", "persistentvolumeclaims"]
    verbs: ["get", "list", "create", "delete"]
```

Next, you will need to create the correct rolebinding. Note that again you will need to fill in the project you want to use in the namespace fields! Save this file as nextflow-rolebinding.yaml

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: nextflow-pod-manager-binding
  namespace: <project name>
subjects:
  - kind: ServiceAccount
    name: nextflow-sa
    namespace: <project name>
roleRef:
  kind: Role
  name: nextflow-pod-manager
  apiGroup: rbac.authorization.k8s.io
```

Then you will need to create the actual service account. Run the following CLI command to do so, again you will need to specific the correct project name:

```bash
oc create serviceaccount nextflow-sa -n <project name>
```

When everything is created and the files are saved, you will need to apply the role and rolebinding to your project. Run the following CLI commands to do so: 

```bash
oc apply -f nextflow-pod-manager-role.yaml -n <project name>
```

and

```bash
oc apply -f nextflow-rolebinding.yaml -n <project name>
```

## Create Nextflow configuration file

In the directory where you have installed Nextflow on your local computer, you will need to create a file named `nextflow.config`.

In this configuration file you will need to state the correct serviceaccount which we created in the previous step. Additionally for the namespace fill in the project you want to run your Nextflow pipeline in.

```bash
k8s {
    serviceAccount = 'nextflow-sa'
    namespace      = '<project name>'
}
```

Make sure to set the serviceaccount to you created in the previous step, as this is the correct serviceaccount to use! Change the `project name` accordingly to match your project you want to run your Nextflow workflow in.

### Advanced Nextflow configuration file

Note that sometimes you will need to set more configuration options to make the Nextflow pipeline work. For example it might be needed to specify the home and nextflow home directories as in the example below: 

```bash
k8s {
    serviceAccount = 'nextflow-sa'
    namespace      = '<project name>'

    pod = [
        [env: 'HOME',     value: '/data'],
        [env: 'NXF_HOME', value: '/data/.nextflow']
    ]
}
```

The `/data` folder is equal to the `/data` directoryyou specify when initiating the Nextflow pipeline shown in the nexst step.

## Run workflow

Try the hello world workflow from Nextflow:

```shell
nextflow kuberun https://github.com/nextflow-io/hello -v pvc-name:/data
```

This will map the `/data` directory in your Nextflow workflow pod(s) to the PVC you have created for this workflow.

To read more about how to use Nextflow on a Kubernetes cluster please refer to their [documentation](https://www.nextflow.io/docs/latest/kubernetes.html).