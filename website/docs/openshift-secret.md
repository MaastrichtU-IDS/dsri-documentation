---
id: openshift-secret
title: Use secrets
---

:::caution

Feature still in development, only use it if you know how it works.

:::

[OpenShift secrets](https://docs.openshift.com/enterprise/3.1/dev_guide/secrets.html) can be used to store confidential information required when the pods are running (such as passwords).

Got to your project > `Resources` > `Secret`

* `Secret Type`: Generic Secret
* `Secret Name`: my-password
* `Key`: password
* Enter the password in the text box `Clean Value`

The secret can now be used in pods. 

## Connect to DockerHub

Create secret to pull private images, or increase the DockerHub limitations to pull images:

```shell
oc create secret docker-registry docker-hub-secret --docker-server=docker.io --docker-username=your-dockerhub-username --docker-password=your-dockerhub-password --docker-email=your-dockerhub-email
```

## Manage Secrets

Secrets cannot be read, but they can be changed through the OpenShift UI.

## Use in Argo workflows

Example to authenticate to a database to run an update query:

```yaml
- name: d2s-sparql-operations
  inputs:
    parameters:
    - name: sparql-queries-path
    - name: sparql-input-graph
    - name: sparql-output-graph
    - name: sparql-service-url
    - name: sparql-triplestore-url
    - name: sparql-triplestore-repository
    - name: sparql-triplestore-username
  container:
    image: maastrichtuids/d2s-sparql-operations:latest
    args: ["-ep", "{{inputs.parameters.sparql-triplestore-url}}", 
      "-rep", "{{inputs.parameters.sparql-triplestore-repository}}", 
      "-op", "update", "-f", "{{inputs.parameters.sparql-queries-path}}",
      "-un", "{{inputs.parameters.sparql-triplestore-username}}", 
      "-pw", "{{inputs.parameters.sparql-triplestore-password}}",
      "-pw", "$SPARQLPASSWORD",  # secret from env
      "--var-input", "{{inputs.parameters.sparql-input-graph}}",
      "--var-output", "{{inputs.parameters.sparql-output-graph}}", 
      "--var-service", "{{inputs.parameters.sparql-service-url}}", ]
    env:
    - name: PASSWORD
      valueFrom:
        secretKeyRef:
          name: my-password
          key: password
```

:::success

Now you can use the secret as environment variable in the workflow definition.

:::