---
id: deploy-rstudio
title: RStudio
---

RStudio can be easily deployed from the [OpenShift web UI Catalog](https://console-openshift-console.apps.dsri2.unimaas.nl/console/catalog).

## RStudio with root user

:::caution Root permission required

🔒 You need root containers (aka. anyuid) enabled in your project to start this application.

:::

Run RStudio with `sudo` privileges, can be useful if need to install additional packages that requires `sudo`

Create the template in your project catalog if not present:

```bash
oc apply -f https://raw.githubusercontent.com/MaastrichtU-IDS/dsri-openshift-applications/main/templates-anyuid/template-rstudio-root-persistent.yml
```

The application will use an existing Persistent Volume Claim (PVC) for a persistent storage of the data.

:::info Official documentation
See the [official Docker image documentation](https://github.com/rocker-org/rocker/wiki/Using-the-RStudio-image) for more details about the container deployed.
:::

<img src="/dsri-documentation/img/screenshot-deploy-rstudio.png" alt="Deploy RStudio" style={{maxWidth: '100%', maxHeight: '100%'}} />

## RStudio with Shiny server

Start a RStudio application, with a complementary Shiny server, using a **regular `rstudio` user, without `sudo` privileges**.

Create the template in your project catalog:

```bash
oc apply -f https://raw.githubusercontent.com/MaastrichtU-IDS/dsri-openshift-applications/main/templates-restricted/template-rstudio-shiny-dynamic.yml
```

Use the **RStudio with Shiny (Dynamic)** template in the OpenShift web UI catalog. It will automatically create a persistent storage for the data.

:::caution No sudo privileges

Image optimized for DSRI OpenShift, does not require root containers enabled. But you will not have `sudo` privileges in the application.

:::

## Use Git in RStudio

The fastest way to get started is to use `git` from the terminal, for example to clone the git repository:

```bash
git clone https://github.com/MaastrichtU-IDS/dsri-openshift-applications.git
```

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

