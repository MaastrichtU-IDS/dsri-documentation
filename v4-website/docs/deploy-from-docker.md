---
id: deploy-from-docker
title: Deploy from a Docker image
---

The DSRI is an [OpenShift OKD](https://www.okd.io/) cluster, based on [Kubernetes](https://kubernetes.io/). It uses [Docker containers](https://www.docker.com) to deploy services and applications in **pods**.

Any service or job can be run in a Docker container. If you want to run a service in Python for example, you will find Docker images for Python. 

* You can find already existing images for the service you want to run on DockerHub
* or create a custom Docker image in a few minutes. 

## Find an image for your service

The easiest way to deploy a service on the DSRI is to use a Docker image from [DockerHub 🐳](https://hub.docker.com/).

Search for an image for your service published on [DockerHub](https://hub.docker.com/)

* [Google "dockerhub my_service_name"](https://www.google.com/search?q=dockerhub+python)
* Sometimes multiple images can be found for your service. Take the official image when possible, or the one most relevant to your use-case.

:::info Deploy from a Dockerfile

If no suitable image can be found on [DockerHub](https://hub.docker.com/), it can be **deployed from a Dockerfile**. See above to do so.

:::

---

## Deploy the image on OpenShift

Once you have a Docker image for your application you can deploy it using the [DSRI web UI](https://console-openshift-console.apps.dsri2.unimaas.nl/console/projects).

Go to the [Overview page](https://console-openshift-console.apps.dsri2.unimaas.nl/console/projects) of your project.

* Click the **Add to Project** button in top right corner > **Deploy Image**
* Select to deploy from **Image Name**
  * Provide your image name, e.g. `umdsri/freesurfer`
  * Eventually change the **Name**, it needs to be unique by project.
  * Click **Deploy**.

<img src="/dsri-documentation/img/screenshot-deploy_image_from_ui.png" alt="Deploy image from UI" style={{maxWidth: '100%', maxHeight: '100%'}} />

:::info Access the application

You should now see your pod deployed on the [Overview](https://console-openshift-console.apps.dsri2.unimaas.nl/console/projects) page of your project.

You can expose routes to this pod in the [Overview](https://console-openshift-console.apps.dsri2.unimaas.nl/console/projects) page: **Create route**

:::

---

## Build and push a new Docker image

In case you there is no Docker image for your application you can build and push one.

To build and push a Docker image you will need to have [Docker installed](https://docs.docker.com/get-docker/).

:::info Install Docker

See the [official documentation to install Docker](https://docs.docker.com/get-docker/).

:::

### Define a Dockerfile

If no images are available on DockerHub, it is still possible that the developers created the [Dockerfile to build the image](https://docs.docker.com/engine/reference/builder/) without pushing it to DockerHub. Go to the GitHub/GitLab source code repository and search for a `Dockerfile`, it can usually be found in

* the source code repository root folder
* a `docker` subfolder
* as instructions in the `README.md`

If no `Dockerfile` are available we will need to define one. 

:::info Contact us

Feel free to [contact us](/help) to get help with this, especially if you are unfamiliar with [Docker](https://docs.docker.com/get-started/).

:::

### Build the image

Once a Dockerfile has been defined for the service you can build it by running the following command from the source code root folder, where the Dockerfile is:

```shell
docker build -t username/my-service .
```

Arguments can be provided when starting the build, they need to be defined in the Dockerfile to be used.

```shell
docker build -t username/my-service --build-args MY_ARG=my_value .
```

### Push to DockerHub

Before pushing it to DockerHub you will need to create a repository. To do so, click on **[Create Repository](https://hub.docker.com/repository/create)**.

* DockerHub is free for public repositories
* Images can be published under your DockerHub user or an organization you belong to

Login to DockerHub, if not already done:

```shell
docker login
```

Push the image previously built to DockerHub:

```shell
docker push username/my-service
```

You can link DockerHub to your source code repository and ask it to build the Docker image automatically (from the Dockerfile in the root folder). It should take between 10 and 30min for DockerHub to build your image

:::tip Deploy from a local Dockerfile

You can also deploy a service on the DSRI directly from a local `Dockerfile`, to avoid using DockerHub. See [this page to deploy a service from a local Dockerfile](/dsri-documentation/docs/guide-dockerfile-to-openshift) for more instructions

:::