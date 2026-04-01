---
id: neuroscience
title: Neuroimaging
---

:::tip Feedbacks welcome

We are not experts in Neuroscience ourselves, please contact us if you see any improvements that could be made to this page, or if you need any help to get it working.

:::

# Neuroimaging and Neuroscience Research on DSRI

We provide specialized environments on the DSRI optimized for neuroimaging analysis. These images include standard tools like **FSL**, **ANTs**, and **FreeSurfer**, aavailable as integrated graphical workstations or standalone environments.

## Ubuntu VNC for fMRI Preprocessing

A complete **Ubuntu 22.04 LTS** desktop environment pre-loaded with FSL, ANTs, and JupyterLab. Perfect for interactive fMRI preprocessing workflows that require both scripting and visualization.

### What's Included
- **FSL 6.0.7** - Full suite including FSLeyes for visualization
- **ANTs 2.6.4** - Advanced normalization tools
- **JupyterLab** - Pre-installed and accessible via a desktop icon

:::warning Accessing Neuroimaging Tools

Please note that these specialized neuroimaging templates are **not activated by default** in the DSRI catalog.

If you require access to the **Integrated Ubuntu fMRI Workstation**, **Freesurfer**, **FSL**, or **ANTs** images, please contact the Research Computing Support team to have them enabled for your specific project:

**Email us directly**: [rcs-ub@maastrichtuniversity.nl](mailto:rcs-ub@maastrichtuniversity.nl)

:::

## Standalone Workspaces
For workflows that don't require a full desktop, we provide lightweight JupyterLab environments.

### JupyterLab with FreeSurfer

- **Version:** 8.1.0

### JupyterLab with FSL
Standalone FSL environment for command-line workflows.
- **Version:** 6.0.7

**Note:** This is a CLI-only image. For FSL GUI tools like FSLeyes, use the Ubuntu VNC fMRI environment.

### JupyterLab with ANTs
Standalone ANTs environment optimized for registration and segmentation.
- **Version:** 2.6.4

## Technical Configuration

### Data Persistence

When instantiating the template you can provide a few parameters similar to the standard JupyterLab, such as:

* **Password** to access the notebook
* Optionally you can provide a **git repository** to be automatically cloned in the JupyterLab (if there is a `requirements.txt` packages will be automatically installed with `pip`)
* Your **git username and email** to automatically configure git

The DSRI will automatically create a persistent volume to store data you will put in the `/home/jovyan/work` folder (the folder used by the notebook interface). You can find the persistent volumes in the DSRI web UI, go to the **Administrator** view > **Storage** > **Persistent Volume Claims**

You can also link your git repository to the project for automatic deployment see [using git in JupyterLab](https://dsri.maastrichtuniversity.nl/docs/deploy-jupyter#-use-git-in-jupyterlab)


### Firefox in VNC Desktop with the fMRI tools

Firefox inside the Ubuntu VNC environment is configured with sandboxing disabled for compatibility with DSRI's security model. You may see a security warning in the browser, this can be safely ignored as your pod is already isolated at the Kubernetes level.
