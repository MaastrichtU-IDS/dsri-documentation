---
id: openshift-login
title: Login with the CLI
---

![OpenShift](/dsri-documentation/img/openshift-logo.png)

To use the `oc` Command Line Interface, you will need to authenticate to the [DSRI](https://app.dsri.unimaas.nl:8443/console):

1. Go to the [DSRI web UI](https://app.dsri.unimaas.nl:8443/console).
2. Click on the **Copy Login Command** button (in the top right of the page).

<img src="/dsri-documentation/img/screenshot_copy_login.png" alt="Copy Login Command button" style="max-width: 100%; max-height: 100%;" />

3. Paste the copied command in your terminal, and execute it to login with `oc` 🔑

> The command should look like this:
>
> ```shell
> oc login https://openshift_cluster:8443 --token=$GENERATED_TOKEN
> ```
>