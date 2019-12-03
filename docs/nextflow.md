---
id: nextflow
title: Run Nextflow workflows
---

![Nextflow](/dsri-documentation/img/nextflow_logo.png)

[Nextflow](https://www.nextflow.io/) enables scalable and reproducible scientific workflows using software containers. It allows the adaptation of pipelines written in the most common scripting languages

## Install Nextflow

```shell
wget -qO- https://get.nextflow.io | bash
```

> See the [Nextflow documentation](https://www.nextflow.io/docs/latest/getstarted.html#installation).

## Run workflow

```shell
nextflow kuberun https://github.com/nextflow-io/hello -v pvc-mapr-projects-showcase:/data
```

> Easily [define Conda environments and workflows](https://www.nextflow.io/docs/latest/conda.html) with Nextflow.