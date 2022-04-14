---
id: prepare-project-for-dsri
title: Prepare your project
---

## Code in a git repository

Using `git` is mandatory to deploy your code on the DSRI. Store your code in a git repository to keep track of changes, and make it easier to share and re-use your code outside of your computer.

:::info Platform recommendations

We recommend those platforms depending on your use-case:

* [GitHub](https://github.com) for public repositories
* [GitLab hosted at Maastricht University](https://gitlab.maastrichtuniversity.nl) for private repositories

:::

> Any other git platform, such as BitBucket or gitlab.com, is fine too.

<!--

## Develop locally or on the DSRI?

You can develop directly on the DSRI using VisualStudio Code or JupyterLab.

If you prefer your local environment for development, and only run big tasks on the DSRI:

* Make sure your code **does not use absolute paths**. For example, `C://Desktop/myproject/data` will not work when running on the DSRI, use a relative path such as `../data`
* **Use `git`** to synchronize your local development code with the code on the DSRI

## Define your deployment strategy

<img src="/img/dsri-deploy-flowchart.png" alt="DSRI deployment flowchart" style={{maxWidth: '100%', maxHeight: '100%'}} />

-->

## Get your data ready

If your project is using a large amount of data that cannot be pushed to a git repository, you will need to use a persistent storage to store your data on the DSRI. See the [Storage on the DSRI](/docs/openshift-storage) documentation for more details about creating a persistent storage.

Here are the options to upload your data to the DSRI storage:

### Data is on your local machine

If the data is stored on a local machine, such as your computer:
* Drag and drop files from your computer to the VisualStudio Code or JupyterLab web UI, if applicable.
* Otherwise, use the `oc cp` command to copy data to your application pod. See the [Load data](/docs/openshift-load-data) documentation page for more informations.

:::caution Upload to persistent storage

Make sure you **upload the data to a folder mounted on a persistent storage** in the pod to avoid losing your data if the pod restarts.

:::

### Data is on a server

Same as for your laptop, you will need to install and use the `oc cp` command to copy data to your application pod. See the [Load data](/docs/openshift-load-data) documentation page for more informations.


### Request access to internal UM servers

In certain cases, UM servers are not accessible by default from the DSRI. This is even the case for servers that are normally publicly accessible. To be able to access these UM servers from the DSRI, we need to put in the request to open the connection. 

Please let us know either the servername and port you like to access, or the URL (e.g. um-vm0057.unimaas.nl on port 443 or https://gitlab.maastrichtuniversity.nl). You can reach out to us either by mail or by Slack.

The procedure is described in the diagram below:

<img src="/img/request-access-um-servers.svg" alt="Access procedure UM servers" style={{maxWidth: '100%', maxHeight: '100%'}} />

<!-- Check readme for source of the diagram -->
