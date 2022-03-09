---
id: deploy-vscode
title: VisualStudio Code
---

## Start VisualStudio Code server

Start a VisualStudio Code server with the `coder` user, which has `sudo` privileges.

You can deploy it using the **VisualStudio Code server** solution in the [Catalog web UI](https://console-openshift-console.apps.dsri2.unimaas.nl/console/catalog) (make sure the **Templates** checkbox is checked)

Provide a few parameters, and instantiate the template. The DSRI will automatically create a persistent volume to store data you will put in the `/home/coder/project` folder. You can find the persistent volumes in the DSRI web UI, go to the **Administrator** view > **Storage** > **Persistent Volume Claims**.

<img src="/img/screenshot-deploy-vscode.png" alt="Deploy VSCode" style={{maxWidth: '100%', maxHeight: '100%'}} />

:::caution Use Chrome

Unfortunately, we recommend to **use Google Chrome** web browser as pasting in the terminal (`ctrl + shift + v`) might not work on Firefox

:::

## Use Git in VSCode

The easiest way to login and clone a repository from GitHub is to use the built-in authentication system of VisualStudio Code, to do so click on **clone repository...** in the **Welcome** page, and follow the instructions in the top of the VisualStudio window.

If this solution does not work for you, you can use `git` from the terminal to clone the git repository with `git clone`. VisualStudio might ask you to login in the dialog box at the top of the page, enter your username and password when requested. For GitHub you might need to generate a token at https://github.com/settings/tokens to use as password.

Once the repository cloned, you can use git from the VSCode web UI to manage your `git` repositories (add, commit, push changes), or in the terminal.

Before committing to GitHub or GitLab, you might need to configure you username and email in VSCode terminal:

```bash
git config --global user.name "Jean Dupont"
git config --global user.email jeandupont@gmail.com
```

:::info Save your git password

You can run this command to ask git to save your password for 15min:

```bash
git config credential.helper cache
```

Or store the password in a plain text file:

```bash
git config --global credential.helper 'store --file ~/.git-credentials'
```

:::

:::tip Git tip

We recommend to use SSH instead of HTTPS connection when possible, checkout [here](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) how to generate SSH keys and use them with your GitHub account.

:::

## VSCode for GPU

See the [Deploy on GPU](/docs/deploy-on-gpu) page to deploy a VisualStudio Code server on GPU.