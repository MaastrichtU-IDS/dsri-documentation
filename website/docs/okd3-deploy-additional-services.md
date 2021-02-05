---
id: okd3-deploy-additional-services
title: Additional services
---

Additional services available with easy installation on the **Data Science Research Infrastructure**.

Feel free to propose new services using [pull requests](https://github.com/MaastrichtU-IDS/dsri-documentation/pulls) or request new ones by creating a [new issues](https://github.com/MaastrichtU-IDS/dsri-documentation/issues).

A service can be easily deployed from a [Docker image](/dsri-documentation/docs/guide-dockerfile-to-openshift).

## Ubuntu

Start Ubuntu with the `root` user which has `sudo` permissions to install anything.

Add the [template](https://github.com/MaastrichtU-IDS/dsri-openshift-applications/blob/main/templates-anyuid/template-ubuntu-root-persistent.yml) to your project:

```bash
oc apply -f https://raw.githubusercontent.com/MaastrichtU-IDS/dsri-openshift-applications/main/templates-anyuid/template-ubuntu-root-persistent.yml
```

This template uses the Ubuntu image hosted on DockerHub, see its documentation at https://hub.docker.com/r/ubuntu

:::caution Root permission required

🔒 You need root containers enabled (aka. anyuid) in your project to start this application.

:::

:::info Persistent data folder

📂 Use the `/root` folder (home of the root user) to store your data in the existing persistent storage

We enabled the port `8080` in the Ubuntu container if you need to deploy applications.

:::

To quickly access it from the terminal you can use the **Terminal** tab in the pod page, or via your local terminal:

1. Get the Ubuntu pod ID:

   ```bash
   oc get pods
   ```

2. Connect to it:

   ```bash
   oc rsh POD_ID
   ```

3. Enable Bash in the Ubuntu container (if it starts with the Shell)

   ```bash
   bash
   ```

## Apache Flink

[Apache Flink](https://flink.apache.org/) enables processing of Data Streams using languages such as Java or Scala .

:::caution Root permission required

🔒 You need root containers enabled (aka. anyuid) in your project to start this application.

:::

Create the Apache Flink template in your project using [vemonet/flink-on-openshift](https://github.com/vemonet/flink-on-openshift)

```shell
oc apply -f https://raw.githubusercontent.com/vemonet/flink-on-openshift/master/template-flink-dsri.yml
```

Use the template to start the cluster from the catalog.

Use this command to get the Flink Jobmanager pod id and copy file to the pod.

```shell
oc get pod --selector app=flink --selector component=jobmanager --no-headers -o=custom-columns=NAME:.metadata.name

# Example creating the workspace folder and copying the RMLStreamer.jar to the pod
oc exec <pod_id> -- mkdir -p /mnt/workspace/resources
oc cp workspace/resources/RMLStreamer.jar <pod_id>:/mnt/
```

Delete the Apache Flink cluster (change the application name):

```bash
oc delete all,secret,configmaps,serviceaccount,rolebinding --selector app=flink-cluster
```

## OpenMPI

OpenMPI can be deployed and run on the DSRI. We use the [MPI Operator from Kubeflow](https://github.com/kubeflow/mpi-operator).

See the [Kubeflow documentation to create a MPI job](https://www.kubeflow.org/docs/components/training/mpi/#creating-an-mpi-job) on OpenShift.

Create Tensorflow Benchmark:

```bash
git clone https://github.com/kubeflow/mpi-operator.git && cd mpi-operator
oc create -f examples/v1alpha2/tensorflow-benchmarks.yaml
```

See the GPU benchmarks for examples of MPI job definitions:

* [MPI TensorFlow benchmark](https://github.com/kubeflow/mpi-operator/blob/master/examples/v1alpha2/tensorflow-benchmarks.yaml)
* [MPI TensorFlow ImageNet benchmark](https://github.com/kubeflow/mpi-operator/blob/master/examples/v1alpha2/tensorflow-benchmarks-imagenet.yaml)

:::info Contact us

[Contact us](mailto:dsri-support-l@maastrichtuniversity.nl) to get access to OpenMPI on the DSRI 📬

:::

## File browser

Deploy a file browser on your persistent volume. This will provide a web UI to upload and download data to your DSRI persistent volume in case you need it (JupyterLab, RStudio and VisualStudio Code server already include a file browser)

:::caution Root permission required

🔒 You need root containers enabled (aka. anyuid) in your project to start this application.

:::

Add the file browser template:

```bash
oc apply -f https://raw.githubusercontent.com/MaastrichtU-IDS/dsri-openshift-applications/main/templates-anyuid/template-filebrowser.yml
```

Then the file browser can be deployed from the [OpenShift Catalog](https://app.dsri.unimaas.nl:8443/console/catalog):

<img src="/dsri-documentation/img/screenshot-deploy-filebrowser.png" alt="Deploy File browser" style={{maxWidth: '100%', maxHeight: '100%'}} />

We can only deploy file browser as a Persistent deployment.

🗄️ **Persistent**: use a Persistent Volume Claim (PVC) for a persistent storage of the data.

The following parameters can be provided:

1. Provide a unique **Application name**. It will be used to generate the application URL.
2. The **Storage name** of the Persistent Volume Claim  (PVC) that will be exposed by the filebrowser.
3. **Storage subpath** in the the Persistent Volume Claim that will be exposed by the filebrowser. Let it empty to use the Root folder of the persistent volume.

You can find the Storage name if you Go to the deployments page > Storage panel.

This deployment require to have  root user enabled on your project. Contact the [DSRI support team](mailto:dsri-support-l@maastrichtuniversity.nl)  or create a [new issues](https://github.com/MaastrichtU-IDS/dsri-documentation/issues) to request root access or to create persistent volume for your project if you don't have them .

:::info Credentials

Default credentials will be username `admin` and password `admin`

:::

:::caution Change password

Please **change the password in the Filebrowser Web UI** once it has been created.

:::

<img src="/dsri-documentation/img/screenshot-filebrowser-login.png" alt="File browser Web UI" style={{maxWidth: '50%', maxHeight: '50%'}} />