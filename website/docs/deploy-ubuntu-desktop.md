---
id: deploy-ubuntu-desktop
title: Ubuntu VNC Desktop
---

### Ubuntu with a Graphical Interface (VNC)

Start an optimized Ubuntu 22.04 LTS workspace with a regular desktop interface (LXDE) accessible directly in your web browser.

:::warning Accessing Neuroimaging Tools

Please note that these specialized neuroimaging templates are **not activated by default** in the DSRI catalog.

If you require access to the **Integrated Ubuntu fMRI Workstation**, **Freesurfer**, **FSL**, or **ANTs** images, please contact the Research Computing Support team to have them enabled for your specific project:

**Email us directly**: [rcs-ub@maastrichtuniversity.nl](mailto:rcs-ub@maastrichtuniversity.nl)

:::info Login Credentials

Username: **root**

Password: **Template creation password**

Use the `/root/persistent` folder to store your data. Files kept in this directory are stored in persistent storage and will survive pod restarts.

:::

This template uses the Docker image defined at https://github.com/MaastrichtU-Library/ubuntu-vnc

