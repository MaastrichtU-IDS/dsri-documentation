---
id: deploy-rstudio
title: RStudio
---

RStudio is an integrated development environment for R. On the DSRI it runs as a container based on [Rocker RStudio tidyverse images](https://github.com/rocker-org/rocker/wiki/Using-the-RStudio-image) (Debian), with `sudo` privileges so you can install anything you need using `pip`, `apt`, or R's `install.packages()`.

## Deploy

Find the **RStudio** template in the [DSRI Catalog](https://console-openshift-console.apps.dsri2.unimaas.nl/catalog) (make sure the **Templates** checkbox is checked) and instantiate it. You will need to set a **password** to access the UI. The username will always be `root`.

If you need Bioconductor packages for genomics or single-cell RNA sequencing analysis, use the **Bioconductor with RStudio** template instead. It includes Bioconductor 3.21 with R 4.5.2 pre-installed. Everything else works the same way.

## Persistent storage

A persistent volume is automatically created at `/root/persistent`. Data stored in this folder survives pod restarts. You can find it in the DSRI web UI under **Administrator view** > **Storage** > **Persistent Volume Claims**.

## Use git

The fastest way to get started is to use `git` from the terminal. For example, to clone a repository:

```bash
git clone https://github.com/your-org/your-repo.git
```

Before pushing to GitHub or GitLab, configure your username and email:

```bash
git config --global user.name "Jean Dupont"
git config --global user.email jeandupont@gmail.com
```

To save your password for 15 minutes:

```bash
git config credential.helper cache
```

Or store it in a plain text file:

```bash
git config --global credential.helper 'store --file ~/.git-credentials'
```

:::tip

We recommend using SSH instead of HTTPS where possible. See [GitHub's guide](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) on generating SSH keys.

:::

You can also enable the built-in Git integration in RStudio - see the [RStudio Git documentation](https://support.rstudio.com/hc/en-us/articles/200532077) for instructions.

## Run R jobs

To run a standalone R job on the DSRI, see the [dsri-demo repository](https://github.com/MaastrichtU-IDS/dsri-demo/tree/main/r-job) for resources and instructions.

To run chunks of R code as background jobs directly from RStudio, see the [job package](https://github.com/lindeloev/job).