---
id: anatomy-of-an-application
title: Anatomy of a DSRI application
---

This page will present you how an applications is typically built using an OpenShift template. There are other ways to describe applications on OpenShift cluster (here the DSRI), such as Helm or Operators. But OpenShift templates are the easiest and quickest way to build an application that can be deployed from the DSRI web UI catalog in a few clicks, and by providing a few parameters.

You will need to have a basic understanding of what a docker container is to fully understand this tutorial, and not be afraid to read to YAML files. YAML is a human-friendly format to read and write configuration files, it's just about objects and arrays, like JSON, but easy to read.

We will use the template used to deploy JupyterLab as example, and we will describe the goal, importance and caveats of each parts. Checkout the [complete JupyterLab template here](https://github.com/MaastrichtU-IDS/dsri-documentation/blob/master/applications/templates/template-jupyterlab-root.yml) (it will be slightly different with a bit more comments, but there are globally the same)

You will see that deploying on Kubernetes (and by extension, here OpenShift), is just about defining objects in a YAML file, like a complex `docker-compose.yml` file. 

:::info Do you got what it takes?

The amount of objects might seems a bit overwhelming at first, but this is what it takes to automatically deploy a complex application on a large cluster, automatically available through a generated URL, with `HTTPS` encryption to protect your passwords when you log to a web UI!

:::

## Application walkthrough

First, you need to create your template objects, this will be the main object we will create here as all other objects defined will be deployed by this template.

```yaml
---
kind: Template
apiVersion: template.openshift.io/v1
labels:
  template: jupyterlab-root
metadata:
  name: jupyterlab-root
  annotations:
    openshift.io/display-name: JupyterLab
    description: |-
      Start JupyterLab images as the `jovyan` user, with sudo privileges to install anything you need. 

      📂 Use the `/home/jovyan` folder (workspace of the JupyterLab UI) to store your data in the persistent storage automatically created
      You can find the persistent storage in the DSRI web UI, go to Administrator view > Storage > Persistent Volume Claims
      
      You can use any image based on the official Jupyter docker stack https://github.com/jupyter/docker-stacks
      - jupyter/tensorflow-notebook
      - jupyter/r-notebook
      - jupyter/all-spark-notebook
      - ghcr.io/maastrichtu-ids/jupyterlab (with Java and SPARQL kernels)
      Or build your own! Checkout https://github.com/MaastrichtU-IDS/jupyterlab for an example of custom image

      Once JupyterLab is deployed you can install any pip packages, JupyterLab extensions, and apt packages.
    iconClass: icon-python
    tags: python,jupyter,notebook
    openshift.io/provider-display-name: Institute of Data Science, UM
    openshift.io/documentation-url: https://maastrichtu-ids.github.io/dsri-documentation/docs/deploy-jupyter
    openshift.io/support-url: https://maastrichtu-ids.github.io/dsri-documentation/help
```

Then define the params the user will be able to define via the DSRI catalog web UI.  `APPLICATION_NAME` is the most important as it will be used everywhere to create the objects and identify the application.

```yaml
parameters:
- name: APPLICATION_NAME
  description: Use a name without spaces, use - to separate words
  value: jupyterlab
  required: true
- name: NOTEBOOK_IMAGE
  value: ghcr.io/maastrichtu-ids/jupyterlab:latest
  required: true
  description: You can use any image based on https://github.com/jupyter/docker-stacks
- name: PASSWORD
  description: The password/token to access JupyterLab
  required: true
- name: STORAGE_SIZE
  displayName: Storage size
  description: Size of the storage allocated to the notebook persistent storage in `/home/jovyan`.
  value: 10Gi
  required: true
```

Then we will describe all objects deployed when we instantiate this template (to start an application). First we define the PersistentVolumeClaim, which is the storage 

```yaml
objects:
- apiVersion: "v1"
  kind: "PersistentVolumeClaim"
  metadata:
    name: ${APPLICATION_NAME}
    labels:
      app: "${APPLICATION_NAME}"
  spec:
    accessModes:
      - "ReadWriteMany"
    resources:
      requests:
        storage: ${STORAGE_SIZE}
```


Then the secret to store the password

```yaml
- apiVersion: v1
  kind: Secret
  metadata:
    annotations:
      template.openshift.io/expose-password: "{.data['application-password']}"
    name: "${APPLICATION_NAME}"
    labels:
      app: "${APPLICATION_NAME}"
  stringData:
    application-password: "${PASSWORD}"
```

Then deployment of JupyterLab, if you want to deploy another application alongside JupyterLab you can do it by adding as many deployments as you want! (and use the same or different persistent volume claims for storage)

```yaml
- kind: DeploymentConfig
  apiVersion: v1
  metadata:
    name: "${APPLICATION_NAME}"
    labels:
      app: "${APPLICATION_NAME}"
  spec:
    strategy:
      type: Recreate
    triggers:
    - type: ConfigChange
    replicas: 1
    selector:
      app: "${APPLICATION_NAME}"
      deploymentconfig: "${APPLICATION_NAME}"
    template:
      metadata:
        annotations:
          alpha.image.policy.openshift.io/resolve-names: "*"
        labels:
          app: "${APPLICATION_NAME}"
          deploymentconfig: "${APPLICATION_NAME}"
```

Then we define the spec of the pod that will be deployed

Setting the `serviceAccountName: anyuid` is required for most Docker containers as it allows to run a container using any user ID (e.g. root). Otherwise OpenShift expect to use a random user ID, which is require to build the Docker image especially to work with random user IDs.

We then create the `containers:` array which is where we will define the containers deployed in the pod. It is recommended to deploy 1 container per pod, as it enables a better separation and management of the applications, apart if you know what you are doing.

```yaml
      spec:
        serviceAccountName: anyuid
        containers:
        - name: jupyter-notebook
          image: "${NOTEBOOK_IMAGE}"
          command:
          - start-notebook.sh
          - "--no-browser"
          - "--ip=0.0.0.0"
```

Then define the ports exposed by your container, here 8888

```yaml
          ports:
          - containerPort: 8888
            protocol: TCP
```

Then define the environment variables used in your container, usually the password and most parameters are set here, such as enabling `sudo` in the container.

```yaml
          env:
          - name: JUPYTER_TOKEN
            valueFrom:
              secretKeyRef:
                key: application-password
                name: "${APPLICATION_NAME}"
          - name: JUPYTER_ENABLE_LAB
            value: "yes"
          - name: GRANT_SUDO
            value: "yes"
```

Then we need to mount the previously created PersistentVolume on `/home/jovyan` , the workspace of JupyterLab. Be careful: `volumeMounts` is in the `containers:` object, and `volumes` is defined in the `spec:` object

```yaml
          volumeMounts:
          - name: data
            mountPath: "/home/jovyan"
        volumes:
        - name: data
          persistentVolumeClaim:
            claimName: "${APPLICATION_NAME}"
```

Then we define the security context to allow JupyterLab to run as root, this is not required for most applications, just a specificity of the official Jupyter images to run with root privileges.

```yaml
        securityContext:
          runAsUser: 0
          supplementalGroups:
          - 100
        automountServiceAccountToken: false
```

Then we create the service to expose the port 8888 of our JupyterLab container on the project network. This means that the JupyterLab web UI will reachable by all other application deployed in your project using its application name as hostname (e.g. `jupyterlab`)

```yaml
- kind: Service
  apiVersion: v1
  metadata:
    name: "${APPLICATION_NAME}"
    labels:
      app: "${APPLICATION_NAME}"
  spec:
    ports:
    - name: 8888-tcp
      protocol: TCP
      port: 8888
      targetPort: 8888
    selector:
      app: "${APPLICATION_NAME}"
      deploymentconfig: "${APPLICATION_NAME}"
    type: ClusterIP
```

Then we define the route which will automatically generate a URL for the service of your application based following this template: `APPLICATION_NAME-PROJECT_ID-DSRI_URL`

```yaml
- kind: Route
  apiVersion: v1
  metadata:
    name: "${APPLICATION_NAME}"
    labels:
      app: "${APPLICATION_NAME}"
  spec:
    host: ''
    to:
      kind: Service
      name: "${APPLICATION_NAME}"
      weight: 100
    port:
      targetPort: 8888-tcp
    tls:
      termination: edge
      insecureEdgeTerminationPolicy: Redirect
```

### Add a configuration file

This practice is a bit advanced and is not required for most deployments, but you can easily create a `ConfigMap` object to define any file to be provided at runtime to the application. For example here we are going to define a `jupyter_notebook_config.py` which will be run at runtime (to do something with the notebook password)

```yaml
- kind: ConfigMap
  apiVersion: v1
  metadata:
    name: "${APPLICATION_NAME}-cfg"
    labels:
      app: "${APPLICATION_NAME}"
  data:
    jupyter_notebook_config.py: |
      import os
      password = os.environ.get('JUPYTER_NOTEBOOK_PASSWORD')
      if password:
          import notebook.auth
          c.NotebookApp.password = notebook.auth.passwd(password)
          del password
          del os.environ['JUPYTER_NOTEBOOK_PASSWORD']
      image_config_file = '/home/jovyan/.jupyter/jupyter_notebook_config.py'
      if os.path.exists(image_config_file):
          with open(image_config_file) as fp:
              exec(compile(fp.read(), image_config_file, 'exec'), globals())
```

We will then need to mount this config file like a persistent volume at where we want it to be, change the volumes and volumeMounts of your DeploymentConfig:

```yaml
          volumeMounts:
          - name: data
            mountPath: "/home/jovyan"
          - name: configs
            mountPath: "/etc/jupyter/openshift"
        automountServiceAccountToken: false
        volumes:
        - name: data
          persistentVolumeClaim:
            claimName: "${APPLICATION_NAME}"
        - name: configs
          configMap:
            name: "${APPLICATION_NAME}-cfg"
```

Finally change the `jupyter-notebook` container start command to include this config file:

```yaml
          command:
          - start-notebook.sh
          - "--no-browser"
          - "--ip=0.0.0.0"
          - "--config=/etc/jupyter/openshift/jupyter_notebook_config.py"
```

### Define resource limits

You can also define resources request and limits for each DeploymentConfig, in `spec:`

```yaml
        spec:
          resources:
            requests: 
              cpu: "${CPU_LIMIT}"
              memory: "${MEMORY_LIMIT}"
            limits:
              cpu: "128"
              memory: "300Gi"
```