---
id: okd3-workflows-cwl
title: Run CWL workflows
---

The [Common Workflow Language](https://www.commonwl.org/) (CWL) is an open standard for describing analysis workflows and tools in a way that makes them portable and scalable across a variety of software and hardware environments.

We use the [CWL Calrissian](https://github.com/Duke-GCB/calrissian) implementation, note that this project is young and still in development, feel free to report issues and contribute to its documentation.

## Clone the repository

1. Git clone in `/calrissian` on a [persistent volume](/dsri-documentation/docs/openshift-storage) on the cluster from a terminal. 

```shell
cd /data/calrissian
git clone --recursive https://github.com/MaastrichtU-IDS/d2s-project-template.git
cd d2s-project-template
```

2. You will need to create the folder for the workflow output data, in our example it is `output-data`:

```shell
mkdir /data/calrissian/output-data
```

3. You might need to give permissions (CWL execution will fail due to permissions issues otherwise).

```shell
chmod -R 777 /data/calrissian
```

## Start pod

Start the CWL execution from your computer using the `oc` client. Define the CWL command arguments to run in [run-workflows-cwl.yaml](https://github.com/MaastrichtU-IDS/d2s-core/blob/master/support/run-workflows-cwl.yaml) (be careful to properly define the paths to the CWL files in the pod storage).

```shell
oc create -f d2s-core/support/run-workflows-cwl.yaml
```

:::caution Delete the pod

You will need to delete the pod if you want to re-create it.

:::

## Delete created pod

```shell
oc delete -f d2s-core/support/run-workflows-cwl.yaml
```
