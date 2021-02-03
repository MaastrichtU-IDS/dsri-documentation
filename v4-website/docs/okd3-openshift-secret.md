---
id: okd3-openshift-secret
title: Use secrets
---

[OpenShift secrets](https://docs.openshift.com/enterprise/3.1/dev_guide/secrets.html) can be used to store confidential information required when the pods are running (such as passwords).

Got to your project > `Resources` > `Secret`

* `Secret Type`: Generic Secret
* `Secret Name`: my-password
* `Key`: password
* Enter the password in the text box `Clean Value`

:::tip Secret created

The secret can now be used in deployment configs, pods, etc. 

:::

## Connect to Docker registries

Create secret to login to Docker registries to pull private images.

### For DockerHub

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

## For GitHub Container Registry

1. Go to [GitHub Settings](https://github.com/settings/tokens), and create a Personal Access Token (PAT) which will be used as password to connect to the GitHub Container Registry

2. Create a secret to login to GitHub Container Registry in your project:

```bash
oc create secret docker-registry github-ghcr-secret --docker-server=ghcr.io --docker-username=<github-username> --docker-password=<github-personal-access-token> --docker-email=<email-address>
```

3. Link the login secret to the default service account:

```bash
oc secrets link default github-ghcr-secret --for=pull
```

## Use in a deployment

Example to define a secret in a deployment YAML file:

```yaml
container:
  image: maastrichtuids/jupyterlab:latest
  env:
  - name: PASSWORD
    valueFrom:
      secretKeyRef:
        name: my-password
        key: password
```

Now you can use the secret as environment variable in the container.

