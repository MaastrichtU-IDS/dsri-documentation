---
id: anatomy-of-an-application
title: Anatomy of a DSRI Application
---

:::info Check out existing templates
Browse the RCS team's ready-to-use templates at [https://github.com/MaastrichtU-IDS/dsri-documentation/tree/master/applications/templates](https://github.com/MaastrichtU-IDS/dsri-documentation/tree/master/applications/templates)
:::

This page shows you how applications are built using **OpenShift templates** and helps you understand the different objects needed when deploying an application on a Kubernetes cluster. While OpenShift templates can only be deployed to OpenShift, the objects they define are the same as in Kubernetes (apart from Route which becomes Ingress).

OpenShift templates are the easiest way to build an application that can be deployed from the DSRI web UI catalog in a few clicks by providing a few parameters. We'll use the VSCode template as an example, but the same structure applies to all DSRI applications.

:::info Do you got what it takes?
The amount of objects might seem overwhelming at first, but this is what it takes to automatically deploy a complex application on a large cluster, available through a generated URL with `HTTPS` encryption!
:::


## The Backbone Template Structure

All DSRI application templates follow a standardized **backbone structure** with these essential components:

1. **ImageStream** - Docker image management
2. **PersistentVolumeClaim** - Data storage
3. **Service** - Internal network exposure
4. **Route** - External HTTPS access
5. **Secret** - Secure password storage
6. **Deployment** - Container orchestration

This structure makes it easy to create new templates by starting with the backbone and customizing only what's needed.


## Template Components

### Template Metadata

The Template object contains all components and provides the description shown in the DSRI web UI catalog:

```yaml
kind: Template
apiVersion: template.openshift.io/v1
metadata:
  name: vscode-root
  annotations:
    openshift.io/display-name: VisualStudio Code server
    description: |-
      Start VisualStudio Code server with the coder user which has sudo permissions
      📂 Use the /home/coder/project folder to store your data in persistent storage
    iconClass: icon-kubevirt
    tags: visualstudio,vscode,root,persistent
labels:
  template: vscode-root
```

### Parameters

Define user-configurable values. The backbone provides four standard parameters:

```yaml
parameters:
  - name: APPLICATION_NAME
    displayName: Application name
    description: Must be without spaces (use -), and unique in the project.
    value: vscode
    required: true
  - name: APPLICATION_IMAGE
    displayName: Docker image for the application
    value: ghcr.io/maastrichtu-ids/code-server
    required: true
  - name: STORAGE_SIZE
    displayName: Storage size
    value: 10Gi
    required: true
  - name: PASSWORD
    displayName: Password
    required: true
```

Reference parameters using `${APPLICATION_NAME}` syntax throughout the template.

You can add custom parameters specific to your application below these standard ones.

**Objects deployed when instantiate this template (to start an application):**

### 1. ImageStream

Imports and manages the Docker image. Setting `importPolicy: scheduled: true` auto-checks for new versions (use cautiously to avoid DockerHub rate limits):

```yaml
objects:
  - kind: ImageStream
    apiVersion: image.openshift.io/v1
    metadata:
      name: "${APPLICATION_NAME}"
      labels:
        app: "${APPLICATION_NAME}"
    spec:
      lookupPolicy:
        local: true
      tags:
        - name: latest
          from:
            kind: DockerImage
            name: ${APPLICATION_IMAGE}
          importPolicy:
            scheduled: false
```

### 2. PersistentVolumeClaim

Creates persistent storage to preserve data across restarts. Files outside persistent volumes are lost when pods restart.

The backbone uses `ocs-storagecluster-cephfs` as the storage class.

```yaml
  - kind: PersistentVolumeClaim
    apiVersion: v1
    metadata:
      name: "${APPLICATION_NAME}"
      labels:
        app: "${APPLICATION_NAME}"
    spec:
      accessModes:
        - ReadWriteMany
      resources:
        requests:
          storage: ${STORAGE_SIZE}
      storageClassName: ocs-storagecluster-cephfs
```

### 3. Service

Exposes the application port on the project network. **Important:** Ensure `port` and `targetPort` match the `containerPort` in your Deployment.

```yaml
  - kind: Service
    apiVersion: v1
    metadata:
      name: "${APPLICATION_NAME}"
      labels:
        app: "${APPLICATION_NAME}"
    spec:
      selector:
        app: "${APPLICATION_NAME}" 
      ports:
        - name: "8080-tcp"
          protocol: TCP
          port: 8080
          targetPort: 8080
```

### 4. Route

Generates a public URL (`APPLICATION_NAME-PROJECT_ID.dsri.maastrichtuniversity.nl`) with automatic HTTPS.

```yaml
  - kind: Route
    apiVersion: route.openshift.io/v1
    metadata:
      name: "${APPLICATION_NAME}"
      labels:
        app: "${APPLICATION_NAME}"
    spec:
      to:
        kind: Service
        name: "${APPLICATION_NAME}"
      port:
        targetPort: "8080-tcp"
      tls:
        termination: edge
        insecureEdgeTerminationPolicy: Redirect
```

### 5. Secret

Stores sensitive data like passwords.

```yaml
  - kind: Secret
    apiVersion: v1
    metadata:
      name: "${APPLICATION_NAME}"
      labels:
        app: "${APPLICATION_NAME}"
    stringData:
      application-password: "${PASSWORD}"
```

### 6. Deployment

Defines how to run the application. Uses `Recreate` strategy to properly restart containers (or `RollingUpdate` for zero-downtime updates).

```yaml
  - kind: Deployment
    apiVersion: apps/v1
    metadata:
      name: "${APPLICATION_NAME}"
      labels:
        app: "${APPLICATION_NAME}"
    spec:
      replicas: 1
      strategy:
        type: Recreate
      selector:
        matchLabels:
          app: "${APPLICATION_NAME}"
```

#### Pod Template Spec

The pod template defines the actual container that will run your application.

```yaml
      template:
        metadata:
          annotations:
            io.kubernetes.cri-o.TrySkipVolumeSELinuxLabel: 'true'
          labels:
            app: "${APPLICATION_NAME}"
            deployment: "${APPLICATION_NAME}"
        spec:
          runtimeClassName: selinux
          serviceAccountName: anyuid
          automountServiceAccountToken: false
```

Setting `serviceAccountName: anyuid` is required for most Docker containers as it allows running a container using any user ID (e.g., root). Otherwise OpenShift expects to use a random user ID, which requires building the Docker image especially to work with random user IDs.

#### Volumes

Define the volumes that will be available to the pod. The `data` volume references our PersistentVolumeClaim, and `dshm` provides shared memory.

```yaml
          volumes:
            - name: data 
              persistentVolumeClaim:
                claimName: "${APPLICATION_NAME}"
            - name: dshm 
              emptyDir:
                medium: Memory
```

#### Container Definition

Define the container(s) that will run in the pod. It's recommended to deploy 1 container per pod for better separation and management.

```yaml
          containers:
            - name: vscode-container 
              image: "${APPLICATION_IMAGE}" 
              imagePullPolicy: IfNotPresent
              workingDir: /home/coder/project
              ports:
                - containerPort: 8080
                  protocol: TCP
```

#### Volume Mounts

Mount the volumes into the container filesystem. The `data` volume is mounted at the application's workspace path.

```yaml
              volumeMounts:
                - name: data 
                  mountPath: "/home/coder/project" 
                - name: dshm 
                  mountPath: /dev/shm
```

#### Environment Variables

Define environment variables for the container. Here we inject the password from the Secret.

```yaml
              env:
                - name: PASSWORD
                  valueFrom:
                    secretKeyRef:
                      name: "${APPLICATION_NAME}"
                      key: application-password
```

#### Resource Limits

Define resource requests and limits. Requests are the minimum resources guaranteed to the container, while limits are the maximum it can use.

```yaml
              resources:
                requests:
                  cpu: "200m"
                  memory: "256Mi"
                limits:
                  cpu: '32'
                  memory: "200Gi"
```

## The complete application

<details>
<summary>Click to expand full template</summary>

```yaml
---
kind: Template
apiVersion: template.openshift.io/v1
metadata:
  name: vscode-root
  annotations:
    openshift.io/display-name: VisualStudio Code server
    description: |-
      Start VisualStudio Code server with the coder user which has sudo permissions

      📦 We recommend you to use `conda install` to install new packages, but you can also use `sudo apt-get install` or `pip install`

      📂 Use the /home/coder/project folder (workspace of the VSCode UI) to store your data in the existing persistent storage
      You can find the persistent storage in the DSRI web UI, go to Administrator view > Storage > Persistent Volume Claims
      
      Python 3 and Java 11 already installed. You can install packages with 'apt-get' after starting the server.

      Visit https://github.com/MaastrichtU-IDS/code-server for more details and to customize the image
    iconClass: icon-kubevirt
    tags: visualstudio,vscode,root,persistent
    openshift.io/provider-display-name: Institute of Data Science, UM
    openshift.io/documentation-url: https://maastrichtu-ids.github.io/dsri-documentation/docs/deploy-vscode
    openshift.io/support-url: https://maastrichtu-ids.github.io/dsri-documentation/help
labels:
  template: vscode-root

parameters:
  - name: APPLICATION_NAME
    displayName: Application name
    description: Must be without spaces (use -), and unique in the project.
    value: vscode
    required: true
  - name: APPLICATION_IMAGE
    displayName: Docker image for the application
    description: See https://github.com/MaastrichtU-IDS/code-server for more details and to customize the image
    value: ghcr.io/maastrichtu-ids/code-server
    required: true
  - name: STORAGE_SIZE
    displayName: Storage size
    description: Size of the storage used for the notebook workspace.
    value: 10Gi
    required: true
  - name: PASSWORD
    displayName: Password
    description: The password to access the VSCode application
    required: true

objects:

  - kind: ImageStream
    apiVersion: image.openshift.io/v1
    metadata:
      name: "${APPLICATION_NAME}"
      labels:
        app: "${APPLICATION_NAME}"
        template: vscode-root-dynamic
    spec:
      lookupPolicy:
        local: true
      tags:
        - name: latest
          from:
            kind: DockerImage
            name: ${APPLICATION_IMAGE}
          importPolicy:
            scheduled: false

  - kind: PersistentVolumeClaim
    apiVersion: v1
    metadata:
      name: "${APPLICATION_NAME}"
      labels:
        app: "${APPLICATION_NAME}"
    spec:
      accessModes:
        - ReadWriteMany
      resources:
        requests:
          storage: ${STORAGE_SIZE}
      storageClassName: ocs-storagecluster-cephfs

  - kind: Service
    apiVersion: v1
    metadata:
      name: "${APPLICATION_NAME}"
      labels:
        app: "${APPLICATION_NAME}"
    spec:
      selector:
        app: "${APPLICATION_NAME}" 
      ports:
        - name: "8080-tcp"
          protocol: TCP
          port: 8080
          targetPort: 8080

  - kind: Route
    apiVersion: route.openshift.io/v1
    metadata:
      name: "${APPLICATION_NAME}"
      labels:
        app: "${APPLICATION_NAME}"
    spec:
      to:
        kind: Service
        name: "${APPLICATION_NAME}"
      port:
        targetPort: "8080-tcp"
      tls:
        termination: edge
        insecureEdgeTerminationPolicy: Redirect

  - kind: Secret
    apiVersion: v1
    metadata:
      name: "${APPLICATION_NAME}"
      labels:
        app: "${APPLICATION_NAME}"
    stringData:
      application-password: "${PASSWORD}" 

  - kind: Deployment
    apiVersion: apps/v1
    metadata:
      name: "${APPLICATION_NAME}"
      labels:
        app: "${APPLICATION_NAME}"
    spec:
      replicas: 1
      strategy:
        type: Recreate
      selector:
        matchLabels:
          app: "${APPLICATION_NAME}" 
      template:
        metadata:
          annotations:
            io.kubernetes.cri-o.TrySkipVolumeSELinuxLabel: 'true'
          labels:
            app: "${APPLICATION_NAME}"
            deployment: "${APPLICATION_NAME}"
        spec:
          runtimeClassName: selinux
          serviceAccountName: anyuid
          automountServiceAccountToken: false
          volumes:
            - name: data 
              persistentVolumeClaim:
                claimName: "${APPLICATION_NAME}"
            - name: dshm 
              emptyDir:
                medium: Memory
          containers:
            - name: vscode-container 
              image: "${APPLICATION_IMAGE}" 
              imagePullPolicy: IfNotPresent
              workingDir: /home/coder/project
              ports:
                - containerPort: 8080
                  protocol: TCP
              volumeMounts:
                - name: data 
                  mountPath: "/home/coder/project" 
                - name: dshm 
                  mountPath: /dev/shm
              env:
                - name: PASSWORD
                  valueFrom:
                    secretKeyRef:
                      name: "${APPLICATION_NAME}"
                      key: application-password 
              resources:
                requests:
                  cpu: "200m"
                  memory: "256Mi"
                limits:
                  cpu: '32'
                  memory: "200Gi"
```
</details>

You can add this to your project catalog via **+Add** > **YAML** in the DSRI web UI.

## Build Your Own Template

To create a template for a new application:

1. **Start with the backbone template** from the repository
2. **Update metadata**: Change `name`, `display-name`, `description`, `iconClass`, and `tags`
3. **Adjust port numbers**: Replace `8080` with your application's port in Service, Route, and Deployment
4. **Update volume mounts**: Change `mountPath` and `workingDir` to match your application's workspace
5. **Add custom parameters**: Include any application-specific variables
6. **Customize environment variables**: Add any additional env vars your application needs
7. **Set resource limits**: Adjust CPU and memory based on your application's requirements

### Quick Customization Checklist

- [ ] Template name and display name
- [ ] Port number (containerPort, port, targetPort)
- [ ] Mount path for persistent storage
- [ ] Default parameter values
- [ ] Application-specific environment variables
- [ ] Resource requests and limits
- [ ] Remove unused components (e.g., `dshm` volume if not needed)

## Advanced Features

### Health Checks

Add probes to verify application readiness:

```yaml
containers:
  - name: vscode-container
    readinessProbe: 
      tcpSocket:
        port: 8080
      initialDelaySeconds: 15
      periodSeconds: 10
    livenessProbe: 
      tcpSocket:  
        port: 8080
      initialDelaySeconds: 30
      periodSeconds: 10
      failureThreshold: 3
```

See [OpenShift Application Health docs](https://docs.openshift.com/container-platform/4.6/applications/application-health.html) for details.

### Configuration Files

Use ConfigMaps to add configuration files or scripts:

```yaml
  - kind: ConfigMap
    apiVersion: v1
    metadata:
      name: "${APPLICATION_NAME}-config"
      labels:
        app: "${APPLICATION_NAME}"
    data:
      startup.sh: |
        #!/bin/bash
        echo "Custom startup script"
```

Mount in deployment:

```yaml
volumeMounts:
  - name: config
    mountPath: "/etc/config"
volumes:
  - name: config
    configMap:
      name: "${APPLICATION_NAME}-config"
```
