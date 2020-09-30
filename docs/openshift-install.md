---
 id: openshift-install
title: Install oc tool
---

![OpenShift](/dsri-documentation/img/openshift-logo.png)

Install the OpenShift command line tool to access the DSRI from your computer's terminal. It enable to:

* Copy large files from/to the DSRI using `oc cp`
* Connect to a pod terminal using `oc rsh`

## On Linux

```shell
wget https://github.com/openshift/origin/releases/download/v3.11.0/openshift-origin-client-tools-v3.11.0-0cbc58b-linux-64bit.tar.gz
tar xvf openshift-origin-client-tools*.tar.gz
cd openshift-origin-client*/
sudo mv oc kubectl /usr/local/bin/
```

> See the [release on GitHub](https://github.com/openshift/origin/releases/tag/v3.11.0).

## On Mac

```shell
brew install openshift-cli
```

> For people that know what they are doing: download the `.zip` from [GitHub Releases](https://github.com/openshift/origin/releases) and unzip it in your path.

> See the [official documentation on MacOS](https://docs.okd.io/latest/cli_reference/get_started_cli.html#cli-mac) for more details.

## On Windows

OC version: **3.11.0**

> We strongly recommend to use the PowerShell to install and run the `oc` tool

Click on [Windows Client Tools](https://github.com/openshift/origin/releases/download/v3.7.2/openshift-origin-client-tools-v3.7.2-282e43f-windows.zip) to download OC tool zip file.

After downloading the `.zip` and extract all.

Next set the system **PATH** environment variables for the directory containing `oc.exe`, which now resides in your newly created **OpenShift** folder inside of <span style='color:red'>*C:\Program Files (x86)\OpenShift*</span> 

Open the Control Panel, and click on **System**. Click on **Advance system settings** on the left or open the **Advance** tab of *System Properties.* Click the button labeled **Environment Variables..** at the bottom. Look for the option in the *User variables* section for *Path.*

<img class="screenshot" src="/dsri-documentation/img/OC_Path.png" alt="Set OC Path" style="zoom: 100%; max-height: 500px; max-width: 500px;">

This makes it easy to access OC Tools by simply opening up command prompt and typing in an `oc` command.

```powershell
oc version
```
