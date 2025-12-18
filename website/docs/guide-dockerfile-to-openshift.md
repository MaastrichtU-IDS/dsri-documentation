---
id: guide-dockerfile-to-openshift
title: Deploying From a Dockerfile
---

## Build from local Dockerfile

This manual shows you an example of how to convert a dockerfile from your local machine to a running container on DSRI (openshift / okd). Start by cloning the example repository to your local machine.

```shell
git clone git@gitlab.maastrichtuniversity.nl:dsri-examples/dockerfile-to-okd.git
```
After cloning you now have a local folder containing a Dockerfile and index.html file. Inspect both files.

Login with the openshift client:
[Authenticate to the OpenShift cluster](/docs/openshift-install) using `oc login` .
```shell
oc login --token=<token>
```

Create a new project if you don't have a project yet you can work with (change myproject to a project name of your choice:
```shell 
oc new-project myproject
```

---

### Create new build configuration.

```shell
oc new-build --name dockerfile-to-okd --binary
```

---

### Build the image

Start a new build on the DSRI with the files provided:

```shell
cd dockerfile-to-okd
oc start-build dockerfile-to-okd --from-dir=. --follow --wait
```

---

### Create your app

Create a new app using the build we just created:

```shell
oc new-app dockerfile-to-okd
```

To properly deploy your app on OpenShift you will need to define a few more parameters:

- Enable root user access (with `serviceAccountName`) by running this command:

```bash
oc patch deployment/dockerfile-to-okd --patch '{"spec":{"template": {"spec":{"serviceAccountName": "anyuid"}}}}'
```

- You can also add persistent storage (with `volumes` and `containers: volumeMounts` )

  - `${STORAGE_NAME}`: Name of your persistent volume claim in the **Storage** page of your project in the web UI
  - `${STORAGE_FOLDER}` : Name of the folder inside the persistent volume claim to store the application data (so you can store multiple applications on the same persistent volume claim)

Open the configuration of the started app to fix its configuration:

```shell
oc edit deployment/dockerfile-to-okd
```

You can mount existing persistent volume this way (replace the variables, such as `${STORAGE_NAME}` by your values):

```yaml
    template:
      spec:
        serviceAccountName: anyuid
        volumes:
        - name: data
          persistentVolumeClaim:
            claimName: "${STORAGE_NAME}"
        containers:
        - image: rstudio-root:latest
          volumeMounts:
          - name: data
            mountPath: "/home/rstudio"
            subPath: "${STORAGE_FOLDER}"
```

:::info Generate deployment file in YAML

You can also generate the app deployment in a YAML file to edit it before start:

```shell
oc new-app dockerfile-to-okd -o yaml > myapp.yml
# Edit myapp.yml
oc create -f myapp.yml
```

:::

---

### Expose app

Expose the application so you can reach it from your browser and check the route that was created

```shell
oc expose svc/dockerfile-to-okd
oc get route
```

You can now visit the route shown in the HOST/PORT output of the `oc get route` command and see if you have successfully converted the docker file. 

You can edit the created route to enable HTTPS with this command:

```bash
oc patch route/dockerfile-to-okd --patch '{"spec":{"tls": {"termination": "edge", "insecureEdgeTerminationPolicy": "Redirect"}}}'
```

---

### Delete the created build

```shell
oc delete build dockerfile-to-okd
```

> See [oc delete documentation](https://docs.openshift.com/enterprise/3.0/cli_reference/basic_cli_operations.html#application-modification-cli-operations).

---

## Deploy from a local docker image

You can also deploy a local docker image from your machine. 

First build the docker image:

```shell
docker build -t my-docker-image:latest .
```

Check you have the image locally on your system:

```shell
docker images ls
```

You should have a docker image for your application:

```bash
REPOSITORY                                   TAG                 
my-docker-image                              latest
```

You can then deploy providing the docker image name and the name of the application to be deployed:

```abash
oc new-app my-docker-image --name app-name-on-openshift
```

---

## Deploy from a Git repository

Go to **+Add** > **From Git**: https://console-openshift-console.apps.dsri2.unimaas.nl/import

Follow the instructions given by the web UI: provide the URL to your git repository, the port on which the web interface will be deployed, you can also create a secret for git login if the repository is private.

Once the container has started you will need to make a small change to enable it running with any user ID (due to OpenShift security policies).

You can do it with the command line (just change `your-app-name` by your application name)

```bash
oc patch deployment/your-app-name --patch '{"spec":{"template": {"spec":{"serviceAccountName": "anyuid"}}}}'
```

Or through the web UI: click on your deployment, then **Actions** > **Edit Deployment**. And edit the YAML of your deployment to add `serviceAccountName: anyuid` under `template.spec`:

```yaml
    template:
      spec:
        serviceAccountName: anyuid
        containers:
        - [...]
```

