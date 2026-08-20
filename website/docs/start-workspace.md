---
id: start-workspace
title: Starting Your Workspace
---

This page will help you start a workspace to run your code and experiments on the DSRI.

## Introduction to containers

Everything running on the DSRI runs inside a Docker container (a lightweight, isolated Linux environment with only what you need installed). This gives you full control over your environment and avoids conflicts between dependencies.

You can start from existing images that already have popular data science applications pre-installed with a web interface (JupyterLab for Python, RStudio for R, or Visual Studio Code if you prefer an IDE). Once inside a running container, you can install anything you need from the terminal and run your code through the notebook, RStudio, or VSCode interface.

## Choose your workspace

The DSRI provides ready-to-use templates for the most common data science workspaces:

- **JupyterLab** - run Python, R, Julia, and Java notebooks with a built-in terminal and file browser.
- **Visual Studio Code** - your daily IDE, running in the browser on the DSRI.
- **RStudio** - the go-to environment for R users.
- **Ubuntu Desktop** - a full Ubuntu desktop accessible in your browser, useful for graphical applications. Available on request.
- **Custom workspace** - deploy any application with a web interface. See [Anatomy of a DSRI application](/docs/anatomy-of-an-application) for details.

:::info

See the [Applications & Templates](/docs/applications) page for the full list of available templates and deployment instructions for each one.

:::

## Start your workspace

1. Log in to the [DSRI web UI](https://console.dsri.unimaas.nl).
2. Select your project
3. Click the **+** button in the top right corner of the page, or go to **+Add** and select **Developer Catalog** > **All services**.
4. Make sure the **Templates** checkbox is checked, then search for the application you want to deploy.
5. Click on the template, read the description, and click **Instantiate Template**.
6. Fill in the parameters (such as a password to access the web UI) and click **Create**.

Your application will appear in the project view. It may take a few seconds to a few minutes to pull the Docker image and start. Once running, click on the application and open the **Route** that has been automatically generated to access the web UI.

## Upload your code and data

We recommend using `git` to clone your code into your workspace. It makes sharing and version control straightforward. It is pre-installed in most images, or you can install it with:

```bash
apt-get install git
```

For small and medium files, you can drag and drop directly into the JupyterLab, VSCode, or RStudio web UI.

For large files, install the `oc` client and use `oc cp` or `oc rsync`. See the [Uploading data](/docs/openshift-load-data) page for details.

## Install your dependencies

Once your workspace is running, install the dependencies you need. Save all installation commands in a script (e.g. `install.sh`) so you can reproduce the environment easily if the container restarts.

Most containers are based on Debian/Ubuntu, so you can install packages with:

```bash
apt-get update
apt-get install -y wget curl
```

## Run your code

You can run your code through the web interface as usual. For long-running jobs, we recommend running scripts from the terminal rather than directly in a notebook, as notebooks can be unstable for jobs that run for more than a few minutes.

Use `nohup` and `&` to run a script in the background so you can disconnect and come back later:

```bash
nohup python my_script.py &
```

Output will be saved to `nohup.out`. To check if the process is still running:

```bash
ps aux
```

To stop it, get the process ID (PID) from the above command and run:

```bash
kill -9 <PID>
```