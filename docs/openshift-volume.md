---
id: openshift-volume
title: Define volumes
---

## Define a dynamic persistent volume

Dynamic persistent volumes can be created outside an application and can be mounted on any application run in the project the PVC has been created. 

* Go to `Storage` on the left sidebar in a project
  * Click`Create Storage` top right of the Storage page.

* Storage class
  * `dynamic-maprfs`
* Access Mode
  * `Single User (RWO)`: only the user who created this volume can read/write to this volume.
  * `Shared Access (RWX)`: all users with access to the projects can read/write this volume.
  * `Read Only (ROX)`: all users with access to the projects can read this volume.

> Dynamic PVCs are only accessible in the project they have been created.

> Not working on project with Root access enabled at the moment, request a static volume.

## Request a static persistent volumes

Static persistent volumes are mounted in a specific directory on the MapR storage, and provides a more sustainable storage over time. Static persistent volumes are not bind to a specific project, and can be accessed by different projects.

It is recommended to use dynamic persistent volumes in priority, you can [request a static persistent volume](mailto:dsri-support-l@maastrichtuniversity.nl) if necessary.

## Use the default ephemeral storage

When creating a pod, OpenShift will by default use ephemeral storage. It creates a volumes bind to the pod. So the volume will be deleted.

It is recommended to use dynamic provisioning for a more sustainable storage solution. But ephemeral storage can be sufficient for testing.

## Mount a filesystem UI on a PVC

[![filebrowser](/dsri-documentation/img/filebrowser_banner.svg)](https://filebrowser.xyz/)

This example details how to deploy the [filebrowser UI](https://hub.docker.com/r/filebrowser/filebrowser) on linked to a MapR Persistent Volume Claim (PVC) to browse files stored in this volume.

Go to https://app.dsri.unimaas.nl:8443/console/catalog > click `Deploy image`

* Image Name:

  ```
  filebrowser/filebrowser 
  ```

* Give a name to your image: `my-filebrowser`

* Click `Deploy`.

* Click on the `my-filebrowser` deployment > `Configuration` tab

* Remove the automatically mounted volume `my-filebrowser-1` (type: `empty dir`)

* Click `Add Storage`

  - Mount path: `/srv`
  - Add the persistent volume (`my-storage`). Should be on `/srv`

  * You can also define the `subpath` from the persistent volume that will be shared with the pod.

* `Create Route` from the application details in the Overview page.

> Access the filebrowser at the URL provided on the pod details.

> Login with `admin` / `admin` (password can be changed in the filebrowser web UI)

You can also set the mounted volumes via `Edit YAML` to define the pod in `Actions` top right of the filebrowser application page and edit the `DeploymentConfig` (don't go to `#1`, but its parent).

It should look like this:

```yaml
spec:
      containers:
        - image: [...]
          name: my-filebrowser
          ports:
            - containerPort: 80
              protocol: TCP
          volumeMounts:
            - mountPath: /srv		# REMOVE, if present
              name: filebrowser-1	# REMOVE, if present
            - mountPath: /srv		# Sharing on /srv for filebrowser
              name: d2s-filebrowser-pvc
              subPath: path/in/pvc

volumes:
  - emptyDir: {}			# REMOVE, if present
    name: filebrowser-1	# REMOVE, if present
  - name: d2s-filebrowser-pvc
    persistentVolumeClaim:
      claimName: my-pvc
```

## Define a temporary volume for a workflow

> TODO: not applicable anymore? Temporary volumes are `emptyDir: {}` ?

Temporary volumes can be defined in Argo at runtime and are removed when the workflow terminates.

```yaml
volumeClaimTemplates:            # define volume, same syntax as k8s Pod spec
  - metadata:
      name: workdir              # name of volume claim
      annotations:
        volume.beta.kubernetes.io/storage-class: maprfs-dynamic
        volume.beta.kubernetes.io/storage-provisioner: mapr.com/maprfs
    spec:
      accessModes: [ "ReadWriteOnce" ]
      resources:
        requests:
          storage: 100Gi 
```