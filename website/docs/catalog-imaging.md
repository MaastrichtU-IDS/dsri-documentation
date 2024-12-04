---
id: catalog-imaging
title: Imaging softwares
---

Feel free to propose new services using [pull requests](https://github.com/MaastrichtU-IDS/dsri-documentation/pulls), or to request them by creating [new issues](https://github.com/MaastrichtU-IDS/dsri-documentation/issues).

## CellProfiler

Cell image analysis software. See [their website](https://cellprofiler.org/home).

You can start a container using the **CellProfiler** template in the [Catalog web UI](https://console-openshift-console.apps.dsri2.unimaas.nl/catalog) (make sure the **Templates** checkbox is checked)

This template uses the [official CellProfiler image](https://hub.docker.com/r/cellprofiler/cellprofiler) hosted on DockerHub

:::info Persistent data folder

📂 Use the `/usr/local/src/work` folder (home of the root user) to store your data in the existing persistent storage. You can find the persistent volumes in the DSRI web UI, go to the **Administrator** view > **Storage** > **Persistent Volume Claims**.

:::

Once the CellProfiler has been started you can access it through the pod terminal (in the DSRI web UI, or using `oc rsh POD_ID`)

```bash
cellprofiler --help
cellprofiler --run
cellprofiler --run-headless
```

:::info Getting Started

🐬 For more information using cell profiler from the command line see [this post](https://carpenter-singh-lab.broadinstitute.org/blog/getting-started-using-cellprofiler-command-line)

:::

