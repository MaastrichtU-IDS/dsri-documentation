---
id: deploy-rstudio
title: RStudio
---

## Start RStudio

Start a RStudio container based on [Rocker RStudio tidyverse images](https://github.com/rocker-org/rocker/wiki/Using-the-RStudio-image) (debian), with `sudo` privileges to install anything you need (e.g. pip or apt packages)

You can start a container using the **JupyterLab** template in the [Catalog web UI](https://console-openshift-console.apps.dsri2.unimaas.nl/console/catalog) (make sure the **Templates** checkbox is checked)

Provide a few parameters, and Instantiate the template. The username will be **rstudio**, and the DSRI will automatically create a persistent volume to store data you will put in the `/home/rstudio` folder. You can find the persistent volumes in the DSRI web UI, go to the **Administrator** view > **Storage** > **Persistent Volume Claims**.

<img src="/dsri-documentation/img/screenshot-deploy-rstudio.png" alt="Deploy RStudio" style={{maxWidth: '100%', maxHeight: '100%'}} />

:::info Official image documentation

See the [official Docker image documentation](https://github.com/rocker-org/rocker/wiki/Using-the-RStudio-image) for more details about the container deployed.

:::

## Restricted RStudio with Shiny server

Start a RStudio application, with a complementary Shiny server, using a regular `rstudio` user, **without `sudo` privileges**.

Create the template in your project:

* In the DSRI web UI, go to **+ Add**, then click on **YAML**, add the content of the [template-rstudio-shiny-restricted.yml](https://raw.githubusercontent.com/MaastrichtU-IDS/dsri-documentation/master/applications/templates/restricted/template-rstudio-shiny-restricted.yml) file, and validate.

* You can also do it using the terminal:

  ```bash
  oc apply -f https://raw.githubusercontent.com/MaastrichtU-IDS/dsri-documentation/master/applications/templates/restricted/template-rstudio-shiny-restricted.yml
  ```

Once the template has been created in your project, use the **RStudio with Shiny server** template in the OpenShift web UI catalog. It will automatically create a persistent storage for the data.

:::caution No sudo privileges

You will not have `sudo` privileges in the application.

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

## Run jobs in RStudio 

Checkout this package to run chunks of R code as jobs directly through RStudio: https://github.com/lindeloev/job

