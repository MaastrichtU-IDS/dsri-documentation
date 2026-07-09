---
id: deploy-jupyter
title: Jupyter Notebooks
---

JupyterLab is an interactive web-based environment for data science and scientific computing. On the DSRI it runs as a container based on the [official Jupyter docker stacks](https://github.com/jupyter/docker-stacks), with `sudo` privileges so you can install anything you need using `pip`, `conda`, or `apt`.

## Deploy

Find the **JupyterLab** template in the [DSRI Catalog](https://console.dsri.unimaas.nl/catalog/) (make sure the **Templates** checkbox is checked) and instantiate it with the following parameters:

- **Password** to access the notebook
- **Docker image** to use (see available images below)
- **Git repository URL** (optional) - will be automatically cloned at startup; if a `requirements.txt` is present, packages will be installed automatically with `pip`
- **Git username and email** to automatically configure git

## Persistent storage

A persistent volume is automatically created and mounted at `/home/jovyan/work` - the default working folder in JupyterLab. Data stored here survives pod restarts. You can find it in the DSRI web UI under **Administrator view** > **Storage** > **Persistent Volume Claims**.

## Available images

The default image is `ghcr.io/maastrichtu-ids/jupyterlab:latest`, a custom image for data science on the DSRI with additional kernels (Java), conda integration, VisualStudio Code, and Python autocomplete.

You can also use any image from the official Jupyter docker stack:

- `ghcr.io/maastrichtu-ids/jupyterlab:knowledge-graph` - for working with knowledge graphs, includes a SPARQL kernel and OpenRefine
- `jupyter/scipy-notebook` - science packages pre-installed
- `jupyter/datascience-notebook` - includes Julia kernel
- `jupyter/tensorflow-notebook` - TensorFlow pre-installed
- `jupyter/r-notebook` - for working with R
- `jupyter/pyspark-notebook` - for connecting to a Spark cluster
- `jupyter/all-spark-notebook` - for running Spark locally in the notebook

To build your own image, use [this repository](https://github.com/MaastrichtU-IDS/jupyterlab) as a starting point.

## Manage dependencies with conda

With the `ghcr.io/maastrichtu-ids/jupyterlab:latest` image you can use conda environments as notebook kernels, as long as `nb_conda_kernels` and `ipykernel` are installed in those environments.

You can pass a git repository URL containing an `environment.yml` file at startup - the conda environment will be installed automatically and appear in the JupyterLab Launcher. See [this repository](https://github.com/MaastrichtU-IDS/dsri-demo) for an example.

Or install it directly in a running JupyterLab using `mamba` (faster than `conda`):

```bash
mamba env create -f environment.yml
```

Wait 1-2 minutes for the new environment to appear in the Launcher.

Example `environment.yml` for a Python 3.9 environment:

```yaml
name: custom-env
channels:
  - defaults
  - conda-forge
  - anaconda
dependencies:
  - python=3.9
  - ipykernel
  - nb_conda_kernels
  - pip
  - pip:
    - matplotlib
```

:::caution

You cannot use `conda activate` in a Docker container. Use `conda run` instead to run scripts in a specific environment:

```bash
conda run -n custom-env python --version
```

:::

## Use git

You can always use `git` from the terminal. Before pushing to GitHub or GitLab, configure your username and email:

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

You can also use the [JupyterLab Git extension](https://github.com/jupyterlab/jupyterlab-git) to manage repositories directly from the UI. It will prompt for credentials if the repository is private.