---
id: deploy-rstudio
title: RStudio
---

## Start RStudio

Start a RStudio container based on [Rocker RStudio tidyverse images](https://github.com/rocker-org/rocker/wiki/Using-the-RStudio-image) (debian), with `sudo` privileges to install anything you need (e.g. pip or apt packages)

You can start a container using the **RStudio** template in the [Catalog web UI](https://console-openshift-console.apps.dsri2.unimaas.nl/catalog) (make sure the **Templates** checkbox is checked)

Provide a few parameters, and Instantiate the template. The **username** will be `root` and the **password** will be what you configure yourself, the DSRI will automatically create a persistent volume in the project space which is the `/root` folder. You can find the persistent volumes in the DSRI web UI, go to the **Administrator** view > **Storage** > **Persistent Volume Claims**.



<img src="/img/screenshot-deploy-rstudio.png" alt="Deploy RStudio" style={{maxWidth: '100%', maxHeight: '100%'}} />

:::info Official image documentation

See the [official Docker image documentation](https://github.com/rocker-org/rocker/wiki/Using-the-RStudio-image) for more details about the container deployed.

:::

## Use Git in RStudio

The fastest way to get started is to use `git` from the terminal, for example to clone a git repository use `git clone`

You can also check how to enable Git integration in RStudio at https://support.rstudio.com/hc/en-us/articles/200532077

You can run this command to ask git to save your password for 15min:

```bash
git config credential.helper cache
```

Or store the password/token in a plain text file:

```bash
git config --global credential.helper 'store --file ~/.git-credentials'
```

Before pushing back to GitHub or GitLab, you will need to **configure you username and email** in the terminal:

```bash
git config --global user.name "Jean Dupont"
git config --global user.email jeandupont@gmail.com
```

:::tip Git tip

We recommend to use SSH instead of HTTPS connection when possible, checkout [here](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) how to generate SSH keys and use them with your GitHub account.

:::

## Run R jobs

You can visit this folder that gives all resources and instructions to explain how to run a standalone R job on the DSRI: https://github.com/MaastrichtU-IDS/dsri-demo/tree/main/r-job

If you want to run jobs directly from RStudio, checkout this package to run chunks of R code as jobs directly through RStudio: https://github.com/lindeloev/job

