---
id: openshift-install
title: Install the client
---


Install the **OpenShift Command Line Interface (CLI)**: `oc` to access the DSRI from your computer's terminal. 

The `oc` CLI enables to perform operations on your applications deployed on the DSRI, such as:

* Copy large files to or from the DSRI using `oc cp`
* Connect to an application terminal using `oc rsh`
* Get the applications running in your project with `oc get pods`

## Install the `oc` client

### On Linux

Download the `oc` and `kubectl` Command Line Interface clients:

```shell
wget https://mirror.openshift.com/pub/openshift-v4/clients/oc/latest/linux/oc.tar.gz && tar xvf oc.tar.gz
sudo mv oc kubectl /usr/local/bin/
```

### On Mac

1. Download https://mirror.openshift.com/pub/openshift-v4/clients/oc/latest/macosx/oc.tar.gz

2. Unzip the archive

3. Move the `oc` binary to a directory on your PATH.

   To check your `PATH`, open a terminal and execute the following command:

   ```bash
   echo $PATH
   ```

### On Windows

1. Create a folder for OpenShift in Program Files: `C:\Program Files (x86)\OpenShift`
2. Click [here](https://mirror.openshift.com/pub/openshift-v4/clients/oc/latest/windows/oc.zip) to download the `oc` tool `.zip` file, and move it to `C:\Program Files (x86)\OpenShift`.
3. Extract the `.zip` file.
4. Next set the system **PATH** environment variables for the directory containing the `oc.exe` file, which now resides in your newly created **OpenShift** folder inside of `C:\Program Files (x86)\OpenShift`
   1. Open the Control Panel, and click on **System**
   2. Click on **Advance system settings** on the left or open the **Advance** tab of *System Properties.* 
   3. Click the button labeled **Environment Variables...** at the bottom. 
   4. Look for the option in the **User variables** section for **Path**.

<img class="screenshot" src="/dsri-documentation/img/OC_Path.png" alt="Set OC Path" style={{zoom: '100%', maxHeight: '500px', maxWidth: '500px'}} />

This makes it easy to access the `oc` command line interface by simply opening up the **PowerShell** and typing in the `oc` command, e.g.:

```powershell
oc version
```

:::note Official documentation

See the [official documentation to install the client](https://docs.okd.io/latest/cli_reference/openshift_cli/getting-started-cli.html#installing-openshift-cli) if needed.

:::

## Login in the terminal with `oc`

To use the `oc` Command Line Interface, you will need to authenticate to the [DSRI](https://console-openshift-console.apps.dsri2.unimaas.nl/console) in you terminal:

```bash
oc login https://api.dsri2.unimaas.nl:6443
```

Otherwise try to use the token provided by the Web UI:

1. Go to the [DSRI web UI](https://console-openshift-console.apps.dsri2.unimaas.nl/console).

2. Click on the **Copy Login Command** button (in the top right of the page).

   <img src="/dsri-documentation/img/screenshot_copy_login.png" alt="Deploy VSCode" style={{maxWidth: '100%', maxHeight: '100%'}} />

3. Paste the copied command in your terminal, and execute it to login with `oc` 🔑

:::info Login command
The command should look like this:

```bash
oc login https://api.dsri2.unimaas.nl:6443 --token=$GENERATED_TOKEN
```
:::
