---
id: openshift-volume
title: Define volumes
---

![OpenShift](/dsri-documentation/img/openshift-logo.png)

## Define persistent volume

Go to https://app.dsri.unimaas.nl:8443/console/project/argo/create-pvc

* Storage class > `maprfs-dynamic`
* Shared Access (RWX)

> Not working at the moment, [request](/dsri-documentation/help) a static volume.

---

## Mount a filesystem UI on a PVC

[![filebrowser](/dsri-documentation/img/filebrowser_banner.svg)](https://filebrowser.xyz/)

This example details how to deploy the [filebrowser UI](https://hub.docker.com/r/filebrowser/filebrowser) on linked to a MapR Persistent Volume Claim (PVC) to browse files.

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

> Access on http://d2s-filebrowser-argo.app.dsri.unimaas.nl/files/

> Login with `admin` / `admin`

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

---

## Define a temporary volume for a workflow

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