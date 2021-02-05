---
id: okd3-workflows-nextflow
title: Run Nextflow workflows
---

[Nextflow](https://www.nextflow.io/) enables scalable and reproducible scientific workflows using software containers. It allows the adaptation of pipelines written in the most common scripting languages.

Nextflow has been developed by the genomic research scientific community and is built to run bioinformatics pipeline.

Define your workflow in a Bash script fashion, providing input, output and the command to run. Without the need to create and use Docker container for Conda pipelines

## Install Nextflow

Install the `nextflow` client on your computer:

```shell
wget -qO- https://get.nextflow.io | bash
```

:::info Official documentation

See the [Nextflow documentation](https://www.nextflow.io/docs/latest/getstarted.html#installation).

:::

## Run workflow

Try the hello world workflow from Nextflow using an existing storage:

```shell
nextflow kuberun https://github.com/nextflow-io/hello -v pvc-mapr-projects-showcase:/data
```

:::tip Use Conda environments

You can easily [define Conda environments and workflows](https://www.nextflow.io/docs/latest/conda.html) with Nextflow.

:::