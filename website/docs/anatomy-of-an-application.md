---
id: anatomy-of-an-application
title: Anatomy of a DSRI application
---

This page will present you how an applications is typically built using an **OpenShift template**. This will also help you understand more in general the different objects that needs to be defined when **deploying an application on a Kubernetes cluster**. Even if OpenShift templates can only be deployed to OpenShift, the objects they define are the same as in Kubernetes (apart from the Route which becomes Ingress).

There are other ways to describe applications on OpenShift cluster (here the DSRI), such as Helm or Operators. But OpenShift templates are the easiest and quickest way to build an application that can be deployed from the DSRI web UI catalog in a few clicks, and by providing a few parameters.

It is better to have a basic understanding of what a docker container is to fully understand this walkthrough, but it should already gives a good idea of the different objects deployed with each DSRI application.

We will use the template used to deploy JupyterLab as example, and we will describe the goal, importance and caveats of each parts of the application definition. But the same template and instructions can be easily reused for other applications with a web UI to access.

Checkout the [complete JupyterLab template here](https://github.com/MaastrichtU-IDS/dsri-documentation/blob/master/applications/templates/template-jupyterlab-root.yml) (it will be slightly different with a bit more comments, but there are globally the same)

You will see that deploying on Kubernetes (and by extension, here OpenShift), is just about defining objects in a YAML file, like a complex `docker-compose.yml` file. 

:::info Do you got what it takes?

The amount of objects might seems a bit overwhelming at first, but this is what it takes to automatically deploy a complex application on a large cluster, automatically available through a generated URL, with `HTTPS` encryption to protect your passwords when you log to a web UI!

:::

## Application walkthrough

First, you need to create your **Template** objects, this will be the main object we will create here as all other objects defined will be deployed by this template. 

In this part we mainly just provide the description and informations that will be shown to users when deploying the application from the DSRI web UI catalog.

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

Then define the **parameters** the user will be able to define in the DSRI catalog web UI when instantiating the application.  `APPLICATION_NAME` is the most important as it will be used everywhere to create the objects and identify the application.

```yaml
parameters:
- name: APPLICATION_NAME
  displayName: Name for the application
  description: Must be without spaces (use -), and unique in the project.
  value: jupyterlab
  required: true
- name: PASSWORD
  displayName: JupyterLab UI Password
  description: The password/token to access the JupyterLab web UI
  required: true
- name: APPLICATION_IMAGE
  displayName: Jupyter notebook Docker image
  value: ghcr.io/maastrichtu-ids/jupyterlab:latest
  required: true
  description: You can use any image based on https://github.com/jupyter/docker-stacks
- name: STORAGE_SIZE
  displayName: Storage size
  description: Size of the storage allocated to the notebook persistent storage in `/home/jovyan`.
  value: 5Gi
  required: true
```

We can then refer to those parameters value (filled by the users of the template) in the rest of the template using this syntax: `${APPLICATION_NAME}`

We will now **describe all objects deployed** when we instantiate this template (to start an application). 

First we define the **ImageStream** object to import the Docker image(s) of your application(s) on the DSRI cluster

Setting the `importPolicy: scheduled` to `true` will have the DSRI to automatically check for new version of this image, which can be useful if you want to always have the latest published version of an applications. Visit the [OpenShift ImageStreams documentation](https://docs.openshift.com/container-platform/4.6/openshift_images/image-streams-manage.html) for more details. Be careful as enabling this feature without real need will cause the DSRI to query DockerHub more, which might require you to login to DockerHub to increase your pull request quota.

```yaml
objects:
- kind: "ImageStream"
  apiVersion: image.openshift.io/v1
  metadata:
    name: ${APPLICATION_NAME}
    labels:
      app: ${APPLICATION_NAME}
  spec:
    tags:
    - name: latest
      from:
        kind: DockerImage
        name: ${APPLICATION_IMAGE}
      importPolicy:
        scheduled: true
    lookupPolicy:
      local: true
```

Then we define the **PersistentVolumeClaim**, which is a persistent storage on which we will mount the `/home/jovyan` folder to avoid loosing data if our application is restarted.

Any file outside of a persistent volume can be lost at any moment if the pod restart, usually it only consists in temporary file if you are properly working in the persistent volume folder. This can be useful also if your application is crashing, stopping and restarting your pod (application) might fix it.

```yaml
- kind: "PersistentVolumeClaim"
  apiVersion: "v1"
  metadata:
    name: ${APPLICATION_NAME}
    labels:
      app: ${APPLICATION_NAME}
  spec:
    accessModes:
      - "ReadWriteMany"
    resources:
      requests:
        storage: ${STORAGE_SIZE}
```


Then the **Secret** to store the password

```yaml
- kind: "Secret"
  apiVersion: v1
  metadata:
    name: "${APPLICATION_NAME}"
    labels:
      app: ${APPLICATION_NAME}
  stringData:
    application-password: "${PASSWORD}"
```

Then the **DeploymentConfig** (aka. Deployment) define how to deploy the JupyterLab image, if you want to deploy another application alongside JupyterLab you can do it by adding as many deployments as you want! (and use the same, or different, persistent volume claims for storage). Checkout the [OpenShift Deployments documentation](https://docs.openshift.com/container-platform/4.6/applications/deployments/what-deployments-are.html) for more details.

In this first block we will define the strategy to update and recreate our applications if you change the YAML configuration, or when a new latest docker image is updated, allowing your service to always use the latest up-to-date version of a software without any intervention from you. 

We chose the `Recreate` release option to make sure the container is properly recreated and avoid unnecessary resources consumption, but you can also use `Rolling` to have a downtime free transition between deployments.

```yaml
- kind: "DeploymentConfig"
  apiVersion: v1
  metadata:
    name: "${APPLICATION_NAME}"
    labels:
      app: "${APPLICATION_NAME}"
  spec:
    replicas: 1
    strategy:
      type: "Recreate"
    triggers:
    - type: "ConfigChange"
    - type: "ImageChange"
      imageChangeParams:
        automatic: true
        containerNames:
        - jupyter-notebook
        from:
          kind: ImageStreamTag
          name: ${APPLICATION_NAME}:latest
    selector:
      app: "${APPLICATION_NAME}"
      deploymentconfig: "${APPLICATION_NAME}"
```

Then we define the spec of the **pod** that will be deployed by this DeploymentConfig.

Setting the `serviceAccountName: anyuid` is required for most Docker containers as it allows to run a container using any user ID (e.g. root). Otherwise OpenShift expect to use a random user ID, which is require to build the Docker image especially to work with random user IDs.

We then create the `containers:` array which is where we will define the containers deployed in the pod. It is recommended to deploy 1 container per pod, as it enables a better separation and management of the applications, apart if you know what you are doing. You can also provide the command to run at the start of the container to overwrite the default one, and define the exposed ports (here 8080).

```yaml
    template:
      metadata:
        labels:
          app: "${APPLICATION_NAME}"
          deploymentconfig: "${APPLICATION_NAME}"
      spec:
        serviceAccountName: "anyuid"
        containers:
        - name: "jupyter-notebook"
          image: "${APPLICATION_NAME}:latest"
          command:
          - "start-notebook.sh"
          - "--no-browser"
          - "--ip=0.0.0.0"
          ports:
          - containerPort: 8888
            protocol: TCP
```

Then define the **environment variables** used in your container, usually the password and most parameters are set here, such as enabling `sudo` in the container.

```yaml
          env:
          - name: JUPYTER_TOKEN
            valueFrom:
              secretKeyRef:
                key: "application-password"
                name: "${APPLICATION_NAME}"
          - name: JUPYTER_ENABLE_LAB
            value: "yes"
          - name: GRANT_SUDO
            value: "yes"
```

Then we need to mount the previously created **PersistentVolume** on `/home/jovyan` , the workspace of JupyterLab. Be careful: `volumeMounts` is in the `containers:` object, and `volumes` is defined in the `spec:` object

```yaml
          volumeMounts:
          - name: data
            mountPath: "/home/jovyan"
        volumes:
        - name: data
          persistentVolumeClaim:
            claimName: "${APPLICATION_NAME}"
```

Then we define the **securityContext** to allow JupyterLab to run as root, this is not required for most applications, just a specificity of the official Jupyter images to run with root privileges.

```yaml
        securityContext:
          runAsUser: 0
          supplementalGroups:
          - 100
        automountServiceAccountToken: false
```

Then we create the **Service** to expose the port 8888 of our JupyterLab container on the project network. This means that the JupyterLab web UI will reachable by all other application deployed in your project using its application name as hostname (e.g. `jupyterlab`)

```yaml
- kind: "Service"
  apiVersion: v1
  metadata:
    name: "${APPLICATION_NAME}"
    labels:
      app: ${APPLICATION_NAME}
  spec:
    ports:
    - name: 8888-tcp
      protocol: TCP
      port: 8888
      targetPort: 8888
    selector:
      app: ${APPLICATION_NAME}
      deploymentconfig: "${APPLICATION_NAME}"
    type: ClusterIP
```

Then we define the **Route** which will automatically generate a URL for the service of your application based following this template: `APPLICATION_NAME-PROJECT_ID-DSRI_URL`

```yaml
- kind: "Route"
  apiVersion: v1
  metadata:
    name: "${APPLICATION_NAME}"
    labels:
      app: ${APPLICATION_NAME}
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

## The complete application

Here is a complete file to describe the JupyterLab deployment template, you can add it to your project catalog by going to **+ Add** in the DSRI web UI, then click on the option to add a **YAML** file content, and copy paste the template YAML.

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
    
parameters:
- name: APPLICATION_NAME
  displayName: Name for the application
  description: Must be without spaces (use -), and unique in the project.
  value: jupyterlab
  required: true
- name: PASSWORD
  displayName: JupyterLab UI Password
  description: The password/token to access the JupyterLab web UI
  required: true
- name: APPLICATION_IMAGE
  displayName: Jupyter notebook Docker image
  value: ghcr.io/maastrichtu-ids/jupyterlab:latest
  required: true
  description: You can use any image based on https://github.com/jupyter/docker-stacks
- name: STORAGE_SIZE
  displayName: Storage size
  description: Size of the storage allocated to the notebook persistent storage in `/home/jovyan`.
  value: 5Gi
  required: true
    
objects:
- kind: "PersistentVolumeClaim"
  apiVersion: "v1"
  metadata:
    name: ${APPLICATION_NAME}
    labels:
      app: ${APPLICATION_NAME}
  spec:
    accessModes:
      - "ReadWriteMany"
    resources:
      requests:
        storage: ${STORAGE_SIZE}

- kind: "Secret"
  apiVersion: v1
  metadata:
    name: "${APPLICATION_NAME}"
    labels:
      app: ${APPLICATION_NAME}
  stringData:
    application-password: "${PASSWORD}"

- kind: "DeploymentConfig"
  apiVersion: v1
  metadata:
    name: "${APPLICATION_NAME}"
    labels:
      app: "${APPLICATION_NAME}"
  spec:
    replicas: 1
    strategy:
      type: Recreate
    triggers:
    - type: ConfigChange
    - type: ImageChange
      imageChangeParams:
        automatic: true
        containerNames:
        - jupyter-notebook
        from:
          kind: ImageStreamTag
          name: ${APPLICATION_NAME}:latest
    selector:
      app: "${APPLICATION_NAME}"
      deploymentconfig: "${APPLICATION_NAME}"

    template:
      metadata:
        labels:
          app: "${APPLICATION_NAME}"
          deploymentconfig: "${APPLICATION_NAME}"
      spec:
        serviceAccountName: "anyuid"
        containers:
        - name: jupyter-notebook
          image: "${APPLICATION_NAME}:latest"
          command:
          - "start-notebook.sh"
          - "--no-browser"
          - "--ip=0.0.0.0"
          ports:
          - containerPort: 8888
            protocol: TCP

          env:
          - name: "JUPYTER_TOKEN"
            valueFrom:
              secretKeyRef:
                key: application-password
                name: "${APPLICATION_NAME}"
          - name: JUPYTER_ENABLE_LAB
            value: "yes"
          - name: GRANT_SUDO
            value: "yes"

          volumeMounts:
          - name: data
            mountPath: "/home/jovyan"
        volumes:
        - name: data
          persistentVolumeClaim:
            claimName: "${APPLICATION_NAME}"

        securityContext:
          runAsUser: 0
          supplementalGroups:
          - 100
        automountServiceAccountToken: false

- kind: "Service"
  apiVersion: v1
  metadata:
    name: "${APPLICATION_NAME}"
    labels:
      app: ${APPLICATION_NAME}
  spec:
    ports:
    - name: 8888-tcp
      protocol: TCP
      port: 8888
      targetPort: 8888
    selector:
      app: ${APPLICATION_NAME}
      deploymentconfig: "${APPLICATION_NAME}"
    type: ClusterIP

- kind: "Route"
  apiVersion: v1
  metadata:
    name: "${APPLICATION_NAME}"
    labels:
      app: ${APPLICATION_NAME}
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

## Add a configuration file

This practice is a bit advanced and is not required for most deployments, but you can easily create a **ConfigMap** object to define any file to be provided at runtime to the application. For example here we are going to define a `jupyter_notebook_config.py` which will be run at runtime (to do something with the notebook password)

```yaml
- kind: ConfigMap
  apiVersion: v1
  metadata:
    name: "${APPLICATION_NAME}-cfg"
    labels:
      app: ${APPLICATION_NAME}
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

We will then need to mount this config file like a persistent volume at where we want it to be, change the **volumes** and **volumeMounts** of your **DeploymentConfig**:

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
          - "start-notebook.sh"
          - "--no-browser"
          - "--ip=0.0.0.0"
          - "--config=/etc/jupyter/openshift/jupyter_notebook_config.py"
```

## Define resource limits

You can also define resources request and limits for each **DeploymentConfig**, in `spec:`

```yaml
        spec:
          resources:
            requests: 
              cpu: "1"
              memory: "2Gi"
            limits:
              cpu: "128"
              memory: "300Gi"
```