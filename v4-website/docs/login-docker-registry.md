---
id: login-docker-registry
title: Login to Docker registries
---

Login to an external container registry can be helpful to pull private images, or increase the DockerHub pull limitations.

You will need to create a secret in your project, then link it to the default service account of this project.

We detail here the process for the [GitHub Container Registry](https://docs.github.com/en/packages/guides/about-github-container-registry) and DockerHub, but the process is similar for any other container registry (e.g. [quay.io](https://quay.io/))

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
