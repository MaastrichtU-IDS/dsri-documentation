---
id: catalog-genomics
title: Genomics
---

Feel free to propose new services using [pull requests](https://github.com/MaastrichtU-IDS/dsri-documentation/pulls), or to request them by creating [new issues](https://github.com/MaastrichtU-IDS/dsri-documentation/issues).

## Trinity RNA Seq

Trinity assembles transcript sequences from Illumina RNA-Seq data. It represents a novel method for the efficient and robust the new reconstruction of transcriptomes from RNA-seq data. See [their documentation](https://github.com/trinityrnaseq/trinityrnaseq/wiki).

You can start a container using the **Trinity RNA-Seq** template in the [Catalog web UI](https://console-openshift-console.apps.dsri2.unimaas.nl/console/catalog) (make sure the **Templates** checkbox is checked)

<img src="/img/screenshot_trinityrnaseq.png" alt="Deploy Trinity RNA Seq" style={{maxWidth: '100%', maxHeight: '100%'}} />

This template uses the Trinity RNA-Seq image hosted in the [UM IDS GitHub Container Registry](https://github.com/orgs/maastrichtu-ids/packages/container/package/trinityrnaseq) 

:::info Persistent data folder

📂 Use the `/usr/local/src/work` folder (home of the root user) to store your data in the existing persistent storage. You can find the persistent volumes in the DSRI web UI, go to the **Administrator** view > **Storage** > **Persistent Volume Claims**.

:::

We enabled the port `8787` in the container, if you need to deploy applications.
