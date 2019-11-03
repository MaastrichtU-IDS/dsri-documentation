---
id: nextflow
title: Run Nextflow workflows
---

![CWL workflows](/dsri-documentation/img/CWL_logo.png)

## Install Nextflow

https://www.nextflow.io/docs/latest/getstarted.html#installation

```shell
wget -qO- https://get.nextflow.io | bash
```

---

## Clone the repository

Git clone in `/calrissian` from a terminal. E.g. from [Jupyterlab](https://app.dsri.unimaas.nl:8443/console/project/test-vincent/browse/pods/jupyterlab-root-2-8w472?tab=terminal), shared in `/data/calrissian`.

```shell
cd /data/calrissian
git clone --recursive https://github.com/MaastrichtU-IDS/d2s-transform-template.git
cd d2s-transform-template
```

You might need to give permissions.

```shell
chmod -R 777 /data/calrissian
```

---

## Start pod

From your computer using the `oc` client.

```shell
oc create -f d2s-cwl-workflows/support/run-cwl-calrissian.yaml
```

> Browse running pods [here](https://app.dsri.unimaas.nl:8443/console/project/test-vincent/browse/pods).

## Delete created pod

```shell
oc delete -f d2s-cwl-workflows/support/run-cwl-calrissian.yaml
```

