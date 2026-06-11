---
id: catalog-genomics
title: Genomics
---

## Trinity RNA-Seq

[Trinity](https://github.com/trinityrnaseq/trinityrnaseq/wiki) assembles transcript sequences from Illumina RNA-Seq data. It is a method for de novo reconstruction of transcriptomes from RNA-seq data.

### Deploy

Find the **Trinity RNA-Seq** template in the [DSRI Catalog](https://console-openshift-console.apps.dsri2.unimaas.nl/catalog) (make sure the **Templates** checkbox is checked) and instantiate it. The template uses the Trinity RNA-Seq image hosted in the [UM IDS GitHub Container Registry](https://github.com/orgs/maastrichtu-ids/packages/container/package/trinityrnaseq).

### Persistent storage

Use the `/usr/local/src/work` folder to store your data. You can find the persistent volumes in the DSRI web UI under **Administrator view** > **Storage** > **Persistent Volume Claims**.

### Particularities

Port `8787` is enabled in the container if you need to deploy additional applications.