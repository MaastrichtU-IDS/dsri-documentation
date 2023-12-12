---
id: login-docker-registry
title: Login to Docker registries
---

Login to an external container registry can be helpful to pull private images, or increase the DockerHub pull limitations.

You will need to create a secret in your project, then link it to the default service account of this project.

We detail here the process for [UM Container registry](https://cr.icts.unimaas.nl), [GitHub Container Registry](https://docs.github.com/en/packages/guides/about-github-container-registry) and [Docker Hub](https://hub.docker.com/), but the process is similar for any other container registry (e.g. [quay.io](https://quay.io/))

## UM Container registry 

:::info Access

You need to be connected to the UM network to access this container registry.

:::

This container registry is available at [UM Container registry](https://cr.icts.unimaas.nl). Here you can login using your **UM credentials** by clicking on the "Login via OIDC provider"

<img class="screenshot" src="/img/screenshot_harbor_login_page.png" alt="Harbor_login_page" style={{zoom: '100%', maxHeight: '500px', maxWidth: '500px'}} />

:::info Public Projects

You don't need to follow the steps below if you are using one of the Public projects. These are available without credentials.

:::

### Logging in with Docker CLI
1. Go to [UM Container registry](https://cr.icts.unimaas.nl), click on your username in the top right corner followed by clicking on **User Profile**. Click on the **Copy** icon.
2. Login with your credentials:
```
docker login cr.icts.unimaas.nl

(Username)
(Copied in Step 1)
```

### Using a Proxy Cache

1. Go to [UM Container registry](https://cr.icts.unimaas.nl), look for a project of type **Proxy Cache**. For each of the mayor registries we created a **Proxy Cache**. Remember the project name, for example **dockerhub**.
2. On the DSRI you can deploy an image like in this example:

<img class="screenshot" src="/img/screenshot_harbor_proxy_cache.png" alt="Harbor_proxy_cache" style={{zoom: '100%', maxHeight: '500px', maxWidth: '500px'}} />

:::info Docker CLI

The same concept can be applied using the docker CLI
```
docker pull cr.icts.unimaas.nl/dockerhub/ubuntu:22.04
```

:::

### Creating your own project

1. Go to [UM Container registry](https://cr.icts.unimaas.nl), click on **+ NEW PROJECT**. Fill in the details of project name and Access Level (preferred method is to leave the checkbox unchecked).

2. Click OK

### Using your own user

1. Go to [UM Container registry](https://cr.icts.unimaas.nl), click on your username in the top right corner followed by clicking on **User Profile**. Click on the **Copy** icon.

2. Create a secret to login to UM Harbor Container Registry in your project:

```
oc create secret docker-registry um-harbor-secret --docker-server=cr.icts.unimaas.nl --docker-username=<UM username> --docker-password=<copied in step 1>
```
3. Link the login secret to the default service account:
```
oc secrets link default um-harbor-secret --for=pull
```

### Using a robot account

1. Go to [UM Container registry](https://cr.icts.unimaas.nl), click on your project if you already created one.

2. Click on the tab **Robot Accounts**

3. Click on **New Robot Account**

4. Create the Robot account to your liking

5. Copy the secret or export it

6. Create a secret to login to UM Harbor Container Registry in your project:

```
oc create secret docker-registry um-harbor-secret --docker-server=cr.icts.unimaas.nl --docker-username=<robot account name> --docker-password=<copied or exported in step 5>
```
7. Link the login secret to the default service account:
```
oc secrets link default um-harbor-secret --for=pull
```

## GitHub Container Registry

1. Go to [GitHub Settings](https://github.com/settings/tokens), and create a Personal Access Token (PAT) which will be used as password to connect to the GitHub Container Registry

2. Create a secret to login to GitHub Container Registry in your project:

```bash
oc create secret docker-registry github-ghcr-secret --docker-server=ghcr.io --docker-username=<github-username> --docker-password=<github-personal-access-token> --docker-email=<email-address>
```

3. Link the login secret to the default service account:

```bash
oc secrets link default github-ghcr-secret --for=pull
```

## DockerHub

:::tip Increase DockerHub limitations

Login with DockerHub also increase the DockerHub limitations to pull images in your project

:::

1. Create a secret to login to DockerHub in your project:

```bash
oc create secret docker-registry dockerhub-secret --docker-server=docker.io --docker-username=<dockerhub-username> --docker-password=<dockerhub-password> --docker-email=<email-address>
```

2. Link the login secret to the default service account:

```bash
oc secrets link default dockerhub-secret --for=pull
```
