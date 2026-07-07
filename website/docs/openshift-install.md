---
id: openshift-install
title: Installing the Client
---

Install the **OpenShift Command Line Interface (CLI)**: `oc` to access the DSRI from your terminal.

The `oc` CLI allows you to:

- Copy large files to or from the DSRI using `oc cp`
- Connect to an application terminal using `oc rsh`
- List the applications running in your project with `oc get pods`

## Install the `oc` client

### On Linux

```bash
wget https://mirror.openshift.com/pub/openshift-v4/x86_64/clients/ocp/stable/openshift-client-linux.tar.gz && tar xvf openshift-client-linux.tar.gz
sudo mv oc kubectl /usr/local/bin/
```

### On Mac

Using [`brew`](https://brew.sh):

```bash
brew install openshift-cli
```

Or manually:

1. Download [openshift-client-mac.tar.gz](https://mirror.openshift.com/pub/openshift-v4/x86_64/clients/ocp/stable/openshift-client-mac.tar.gz)
2. Unzip the archive.
3. Move the `oc` binary to a directory on your PATH. To check your PATH:

```bash
echo $PATH
```

### On Windows

1. Create a folder: `C:\Program Files (x86)\OpenShift`
2. Download [openshift-client-windows.zip](https://mirror.openshift.com/pub/openshift-v4/x86_64/clients/ocp/stable/openshift-client-windows.zip) and move it to that folder.
3. Extract the `.zip` file.
4. Add the folder to your system PATH:
   1. Open **Control Panel** > **System** > **Advanced system settings**.
   2. Click **Environment Variables**.
   3. Find **Path** in the User or System variables and add `C:\Program Files (x86)\OpenShift`.
5. Verify the installation by opening PowerShell and running:

```powershell
oc version
```

:::info

See the [official OKD documentation](https://docs.okd.io/latest/cli_reference/openshift_cli/getting-started-cli.html#installing-openshift-cli) if you run into issues installing the client.

:::

## Log in with `oc`

:::warning

Authentication using your UM password is not supported. You must use a token.

:::

```bash
oc login --token=<token>
```

To get your token:

1. Go to the [DSRI web UI](https://console.dsri.unimaas.nl).
2. Click your username in the top right corner and select **Copy login command**.
3. Paste the command in your terminal and run it.

The command will look like this:

```bash
oc login https://api.dsri.unimaas.nl:6443 --token=$GENERATED_TOKEN
```