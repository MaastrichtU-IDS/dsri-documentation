---
id: prepare-project-for-dsri
title: Preparing Data
---

## Code in a git repository

Using `git` is strongly recommended to deploy your code on the DSRI. Store your code in a git repository to keep track of changes, and make it easier to share and re-use your code outside of your computer.

:::info Platform recommendations

We recommend those platforms depending on your use-case:

- [GitHub](https://github.com) for public repositories
- [GitLab hosted at Maastricht University](https://gitlab.maastrichtuniversity.nl) for private repositories

Any other git platform, such as BitBucket or gitlab.com, is fine too.

:::

## Get your data ready

If your project is using a large amount of data that cannot be pushed to a git repository, you will need to use persistent storage on the DSRI. See the [Storage on the DSRI](/docs/openshift-storage) documentation for more details.

Here are the options to upload your data to the DSRI storage:

### Data is on your local machine

If the data is stored on your computer:

- Drag and drop files from your computer to the Visual Studio Code or JupyterLab web UI, if applicable.
- Otherwise, use the `oc cp` command to copy data to your application pod. See the [Load data](/docs/openshift-load-data) page for more information.

:::caution

Make sure you **upload the data to a folder mounted on a persistent storage** in the pod to avoid losing your data if the pod restarts.

:::

### Data is on a server

Use the `oc cp` command to copy data from a server to your application pod. See the [Load data](/docs/openshift-load-data) page for more information.

