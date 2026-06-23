---
id: access-and-use-dsri
title: Accessing and Using the DSRI
---

## Connect to the UM network

You need to be connected to the UM network to access the DSRI.

**On Linux**: use `openconnect` to connect to the UM VPN. You can easily install it on Ubuntu and Debian distributions with `apt`:

```bash
sudo apt install openconnect
sudo openconnect --useragent "AnyConnect" --no-external-auth -u YOUR.USER --authgroup=01 vpn.maastrichtuniversity.nl
```

**On MacOS and Windows**: download and install the **Maastricht University VPN** client available at **[vpn.maastrichtuniversity.nl](https://vpn.maastrichtuniversity.nl/)**

## Access the web UI

Access the DSRI web UI at **[https://console.dsri.unimaas.nl](https://console.dsri.unimaas.nl)**

:::info Password

Use your general UM password.

:::

If you do not have access to the DSRI while you think you should, [please contact us](mailto:rcs-ub@maastrichtuniversity.nl).

Log in at **[https://console.dsri.unimaas.nl](https://console.dsri.unimaas.nl)** using the standard Maastricht University portal:

<img src="/img/screenshot_login_screen.png" alt="Login screen" style={{maxWidth: '100%', maxHeight: '100%'}} />

<img src="/img/screenshot_um_login_screen.png" alt="UM login screen" style={{maxWidth: '100%', maxHeight: '100%'}} />

:::info Command line interface

We recommend installing the `oc` command line interface to perform additional operations on your applications, such as loading large amounts of data using `oc cp` or deploying an application from a local `Dockerfile`. Instructions on installing the client can be found [here](/docs/openshift-install).

:::

## Access your project

In the DSRI web console, applications are deployed in projects. A project is created for you when you are granted access to the DSRI.

After logging in, navigate to your project using the **Projects** overview on the home screen.

:::caution Reuse your project

You can request a new project when necessary. However, you can easily [delete your current project](/docs/delete-a-project) instead of requesting a new one every time you want to start fresh.

:::

:::info Managing access to your project

You can grant or revoke access permissions for project collaborators under your project's **RoleBindings**. For more info, see [Managing Access to Your Project](/docs/manage-access-project).

:::

## About the web UI

The DSRI web console lets you **visualize**, **browse**, and **manage** your projects and workloads directly from the browser.

From within a project you can:

- Deploy applications from container images, Dockerfiles, or Git repositories
- Monitor running workloads, check pod logs, and inspect resource usage
- Manage storage, secrets, and config maps
- Set resource quotas and access permissions for collaborators