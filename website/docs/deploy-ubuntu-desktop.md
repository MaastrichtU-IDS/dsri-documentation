---
id: deploy-ubuntu-desktop
title: Ubuntu VNC Desktop
---

Ubuntu VNC Desktop provides a full Ubuntu 22.04 LTS desktop environment (LXDE) accessible directly in your web browser. It is useful when you need a graphical interface for applications that do not have a web-based UI.

:::caution

This template is not activated by default in the DSRI catalog. Contact the [RCS](mailto:rcs-ub@maastrichtuniversity.nl) team, to have it enabled for your project.

:::

## Deploy

Once the template is enabled for your project, find **Ubuntu VNC Desktop** in the [DSRI Catalog](https://console.dsri.unimaas.nl/catalog/) (make sure the **Templates** checkbox is checked) and instantiate it with a password of your choice.

Login credentials:
- **Username**: `root`
- **Password**: the password you set when instantiating the template

## Persistent storage

Use the `/root/persistent` folder to store your data. Files kept in this directory survive pod restarts.