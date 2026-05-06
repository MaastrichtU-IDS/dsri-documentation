---
id: deploy-halfpipe
title: HALFpipe
---

HALFpipe will be co-deployed with a Ubuntu 22.04 LTS workspace with a regular desktop interface (LXDE) accessible directly in your web browser. HALFpipe itself is CLI only. See the steps below on how to connect to the HALFpipe pod correctly to use the CLI.

HALFpipe is deployed using the Docker image built by the HALFpipe team. For more information check their [GitHub repository](https://github.com/HALFpipe/HALFpipe).

:::warning Accessing the template

Please note that this template is **not activated by default** in the DSRI catalog.

If you require access to **HALFpipe** image please contact the Research Computing Support team to have it enabled for your specific project:

**Email us directly**: [rcs-ub@maastrichtuniversity.nl](mailto:rcs-ub@maastrichtuniversity.nl)

:::

## Chooste the right template

When the template has been enabled for your project, simply search for the template `Ubuntu with desktop interface and HALFPipe` via the template catalog. Click `instantiate template` and fill in the required fields.

Because HALFpipe is deployed using the pre-built Docker image, you can easily change the version to your preferred version in the `Halfpipe Docker image` field. Currently version 1.3.2 is the version we have tested and know it works.

## Connect to the HALFpipe pod and start HALFpipe

After the pods are deployed, to connect to the HALFpipe pod to be able to run CLI commands you will need to first get the deployed pod's name:

`oc get pods -n <project name>`

When you have the HALFpipe pod's name then run the following command to connect to the pod:

`oc exec -it <pod name> -- bash`

Start HALFpipe by typing `halfpipe` on the command line.

## Persistent storage

Make sure the select the right directory to work in!

<img src="/img/halfpipe-start.png" alt="Deploy RStudio" style={{maxWidth: '75%', maxHeight: '75%'}} />

The HALFpipe pod is setup to persistently save your data and file when they are saved in the `/home/fmriprep/data` directory. Please select this directory when starting HALFpipe.

The co-deployed Ubuntu workspace is set up to use the same Persistent Volume Claim (PVC), which uses the `root/persistent` directory.


