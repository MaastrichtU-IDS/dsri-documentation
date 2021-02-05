---
id: okd3-openshift-install
title: Install the oc client
---


Install the **OpenShift Command Line Interface (CLI)** to access the DSRI from your computer's terminal. 

The `oc` CLI enables to perform operations on your applications deployed on the DSRI, such as:

* Copy large files to or from the DSRI using `oc cp`
* Connect to an application terminal using `oc rsh`
* Get the applications running in your project with `oc get pods`

## Install the `oc` client

### On Linux

Download the `oc` and `kubectl` Command Line Interface clients:

```shell
wget https://github.com/openshift/origin/releases/download/v3.11.0/openshift-origin-client-tools-v3.11.0-0cbc58b-linux-64bit.tar.gz
tar xvf openshift-origin-client-tools*.tar.gz
cd openshift-origin-client*/
sudo mv oc kubectl /usr/local/bin/
```

> See the [release on GitHub](https://github.com/openshift/origin/releases/tag/v3.11.0).

### On Mac

Use `brew` to install the client:

```shell
brew install openshift-cli
```

> See the [official documentation on MacOS](https://docs.okd.io/latest/cli_reference/get_started_cli.html#cli-mac) for more details.

### On Windows

1. Create a folder for OpenShift in Program Files: `C:\Program Files (x86)\OpenShift`
2. Click [here](https://github.com/openshift/origin/releases/download/v3.11.0/openshift-origin-client-tools-v3.11.0-0cbc58b-windows.zip) to download the `oc` tool `.zip` file, and move it to `C:\Program Files (x86)\OpenShift`.

2. Extract the `.zip` file.

3. Next set the system **PATH** environment variables for the directory containing the `oc.exe` file, which now resides in your newly created **OpenShift** folder inside of `C:\Program Files (x86)\OpenShift`
   1. Open the Control Panel, and click on **System**
   2. Click on **Advance system settings** on the left or open the **Advance** tab of *System Properties.* 
   3. Click the button labeled **Environment Variables...** at the bottom. 
   4. Look for the option in the **User variables** section for **Path**.

<img class="screenshot" src="/dsri-documentation/img/OC_Path.png" alt="Set OC Path" style={{zoom: '100%', maxHeight: '500px', maxWidth: '500px'}} />

This makes it easy to access the `oc` command line interface by simply opening up the **PowerShell** and typing in the `oc` command, e.g.:

```powershell
oc version
```

## Login in the terminal with `oc`

To use the `oc` Command Line Interface, you will need to authenticate to the [DSRI](https://app.dsri.unimaas.nl:8443/console):

1. Go to the [DSRI web UI](https://app.dsri.unimaas.nl:8443/console).
2. Click on the **Copy Login Command** button (in the top right of the page).

<img src="/dsri-documentation/img/screenshot_copy_login.png" alt="Copy Login Command button" style={{maxWidth: '100%', maxHeight: '100%'}} />

3. Paste the copied command in your terminal, and execute it to login with `oc` 🔑


:::info Login command
The command should look like this:

```bash
oc login https://openshift_cluster:8443 --token=$GENERATED_TOKEN
```
:::
