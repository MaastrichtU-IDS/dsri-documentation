---
id: openshift-secret
title: Use secrets
---

![OpenShift](/dsri-documentation/img/openshift-logo.png)

[OpenShift secrets](https://docs.openshift.com/enterprise/3.1/dev_guide/secrets.html) can be used to store confidential information required when the pods are running (such as passwords).

> Access [DSRI OpenShift](https://app.dsri.unimaas.nl:8443/). 

>  `Argo` project > `Resources` > `Secret`

* `Secret Type`: Generic Secret
* `Secret Name`: d2s-sparql-password
* `Key`: password
* Enter the password in the text box `Clean Value`

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
    - name: SPARQLPASSWORD
      valueFrom:
        secretKeyRef:
          name: d2s-sparql-password
          key: password
```

> Now you can use the secret as environment variable in the workflow definition.