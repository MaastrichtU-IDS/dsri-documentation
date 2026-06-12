---
id: catalog-imaging
title: Imaging Software
---

## CellProfiler

[CellProfiler](https://cellprofiler.org/home) is a cell image analysis tool for measuring and analyzing cell morphology and phenotypes from microscopy images.

### Deploy

Find the **CellProfiler** template in the [DSRI Catalog](https://console-openshift-console.apps.dsri2.unimaas.nl/catalog) (make sure the **Templates** checkbox is checked) and instantiate it. The template uses the [official CellProfiler image](https://hub.docker.com/r/cellprofiler/cellprofiler) from DockerHub.

### Persistent storage

Use the `/usr/local/src/work` folder to store your data. You can find the persistent volumes in the DSRI web UI under **Administrator view** > **Storage** > **Persistent Volume Claims**.

### Particularities

CellProfiler runs in headless mode on the DSRI. Access it via the pod terminal in the DSRI web UI, or using:

```bash
oc rsh <pod-name>
```

Then run CellProfiler from the terminal:

```bash
cellprofiler --help
cellprofiler --run
cellprofiler --run-headless
```

For more information on using CellProfiler from the command line, see [this guide](https://carpenter-singh-lab.broadinstitute.org/blog/getting-started-using-cellprofiler-command-line).