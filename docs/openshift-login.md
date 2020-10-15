---
id: openshift-login
title: Login with the CLI
---

![OpenShift](/dsri-documentation/img/openshift-logo.png)

To use the `oc` Command Line Interface, you will need to authenticate to the [DSRI](https://app.dsri.unimaas.nl:8443/console):

1. Go to the [DSRI OpenShift web UI](https://app.dsri.unimaas.nl:8443/console).
2. Click on the **Copy Login Command** button (in the top right of the page).
3. Paste the copied command in your terminal.

The command should look like this:

```shell
oc login https://openshift_cluster:8443 --token=MY_TOKEN
```

<!-- ![](/dsri-documentation/img/getting-started-preparation-verify.png) -->