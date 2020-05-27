---
id: guide-dockerfile-to-openshift
title: Deploy a new service
---

## Build from local Dockerfile

This manual shows you an example of how to convert a dockerfile from your local machine to a running container on DSRI (openshift / okd). Start by cloning the example repository to your local machine.

```shell
git clone git@gitlab.maastrichtuniversity.nl:dsri-examples/dockerfile-to-okd.git
```
After cloning you now have a local folder containing a Dockerfile and index.html file. Inspect both files.

Login with the openshift client:
```shell
oc login https://app.dsri.unimaas.nl:8443
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

### Build image

Start a new build with the example files we provided.

```shell
cd dockerfile-to-okd
oc start-build dockerfile-to-okd --from-dir=. --follow --wait
```

---

### Create app

Create a new app using the build we just created:

```shell
oc new-app dockerfile-to-okd
```

---

### Expose app

Expose the application so you can reach it from your browser and check the route that was created

```shell
oc expose svc/dockerfile-to-okd
oc get route
```

You can now visit the route shown in the HOST/PORT output of the 'oc get route' command and see if you have successfully converted the docker file. 

---

### Delete the created build

```shell
oc delete build dockerfile-to-okd
```

> See [oc delete documentation](https://docs.openshift.com/enterprise/3.0/cli_reference/basic_cli_operations.html#application-modification-cli-operations).