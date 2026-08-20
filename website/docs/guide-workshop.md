---
id: guide-workshop
title: Preparing a Workshop
---

The DSRI is a good platform to run a training or class within Maastricht University.

## Request VPN accounts for users

If the users are **students** from Maastricht University, or are **not** from Maastricht University (without an email @maastrichtuniversity.nl), you will need to contact the ICT support of your department to request accounts so that your users can connect to the UM VPN.

At FSE, send an email to [lo-fse@maastrichtuniversity.nl](mailto:lo-fse@maastrichtuniversity.nl) and [rcs-ub@maastrichtuniversity.nl](mailto:rcs-ub@maastrichtuniversity.nl) with the following information:

- Emails of the users
- Why they need access to the DSRI (provide the course ID if it is for a course)
- Until which date the users will need the VPN accounts

## Request DSRI access for your users

Submit a [ticket](https://servicedesk.icts.maastrichtuniversity.nl/tas/public/ssp/content/serviceflow?unid=09acae9cdf454968bc94ad125b1f8e76&from=436967a9-738c-4112-b3f6-240a9847118e&openedFromService=true) to give us more details about your workshop or course so we can set up access for your users.

## Prepare your workshop

Use the [DSRI documentation](https://dsri.maastrichtuniversity.nl/docs/) to explain to your users how to access and use the DSRI.

### Publish an image for your training

Feel free to use the existing templates for JupyterLab, RStudio, or Visual Studio Code in the DSRI catalog.

You can reuse our images and adapt them to your training needs by installing the required dependencies:

- [JupyterLab image](https://github.com/MaastrichtU-IDS/jupyterlab)
- [RStudio image](https://github.com/MaastrichtU-IDS/rstudio)
- [Visual Studio Code image](https://github.com/MaastrichtU-IDS/code-server)

Then instruct your users to start an existing template with your newly published image.

With the JupyterLab template you can also provide a git repository URL to be automatically cloned in the workspace when users start it.

You can find examples of Python scripts with databases to run on the DSRI in the [dsri-demo repository](https://github.com/MaastrichtU-IDS/dsri-demo).

### Show your users how to start a workspace

Point your users to the [DSRI documentation](https://dsri.maastrichtuniversity.nl/docs/) for step-by-step instructions on starting a workspace. Otherwise, walk through it directly with them during the workshop.