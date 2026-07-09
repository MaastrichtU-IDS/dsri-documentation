---
id: deploy-vscode
title: Visual Studio Code
---

Visual Studio Code server is a browser-based version of VS Code that runs as a container on the DSRI. It uses the `coder` user, which has `sudo` privileges, so you can install anything you need from the terminal.

## Deploy

Find the **VisualStudio Code server** template in the [DSRI Catalog](https://console.dsri.unimaas.nl/catalog/) (make sure the **Templates** checkbox is checked) and instantiate it with a password of your choice.

## Persistent storage

A persistent volume is automatically created at `/home/coder/project`. Data stored in this folder survives pod restarts. You can find it in the DSRI web UI under **Administrator view** > **Storage** > **Persistent Volume Claims**.

## Use git

The easiest way to clone a repository from GitHub is to use the built-in authentication system - click **Clone Repository...** on the Welcome page and follow the instructions at the top of the VS Code window.

Alternatively, use `git` from the terminal:

```bash
git clone https://github.com/your-org/your-repo.git
```

For GitHub, you may need to generate a [personal access token](https://github.com/settings/tokens) to use as your password.

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

## Deploy on GPU

See the [Deploy on GPU](/docs/deploy-on-gpu) page to deploy a Visual Studio Code server on a GPU node.