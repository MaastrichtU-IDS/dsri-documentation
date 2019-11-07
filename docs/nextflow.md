---
id: nextflow
title: Run Nextflow workflows
---

![Nextflow](/dsri-documentation/img/nextflow_logo.png)

## Install Nextflow

https://www.nextflow.io/docs/latest/getstarted.html#installation

```shell
wget -qO- https://get.nextflow.io | bash
```

---

## Run workflow

```shell
nextflow kuberun https://github.com/nextflow-io/hello -v pvc-mapr-projects-showcase:/data
```