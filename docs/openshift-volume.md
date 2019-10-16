---
id: openshift-volume
title: Define volumes
---

![OpenShift](/dsri-documentation/img/openshift-logo.png)

## Define persistent volume

Go to https://app.dsri.unimaas.nl:8443/console/project/argo/create-pvc

* Storage class > `maprfs-dynamic`
* Shared Access (RWX)

---

## Mount a filesystem UI

[![filebrowser](/dsri-documentation/img/filebrowser_banner.svg)](https://filebrowser.xyz/)

Deploy [filebrowser](https://hub.docker.com/r/filebrowser/filebrowser) on MapR to access volumes

Go to https://app.dsri.unimaas.nl:8443/console/catalog > click `Deploy image`

* Add to Project: `argo`
* Image Name: `filebrowser/filebrowser` 
* Give a name to your image: `filebrowser`
* Click `Deploy`
* Go to `argo` project > Click on latest deployment of the `filebrowser`
* Delete the automatically mounted volume, and add the persistent volume (`my-storage`). Should be on `/srv`

You can `Edit YAML` to define the pod in `Actions` top right of the filebrowser application page and edit the `DeploymentConfig` (don't go to `#1`, but its parent).

```yaml
spec:
      containers:
        - image: [...]
          imagePullPolicy: Always
          name: filebrowser3
          ports:
            - containerPort: 80
              protocol: TCP
          resources: {}
          terminationMessagePath: /dev/termination-log
          terminationMessagePolicy: File
          volumeMounts:
            - mountPath: /srv		# REMOVE
              name: filebrowser3-1	# REMOVE
            - mountPath: /data		# Change to /srv
              name: volume-f1z33

volumes:
  - emptyDir: {}			# REMOVE
    name: filebrowser3-1	# REMOVE
  - name: volume-f1z33
    persistentVolumeClaim:
      claimName: d2s-filebrowser
```



* Add route

> Access on http://d2s-filebrowser-argo.app.dsri.unimaas.nl/files/

> Login with `admin` / `admin`

---

## Define a temporary volume for a workflow

Temporary volumes can be defined in Argo at runtime and are removed when the workflow terminates.

```yaml
volumeClaimTemplates:            # define volume, same syntax as k8s Pod spec
  - metadata:
      name: workdir              # name of volume claim
      annotations:
        volume.beta.kubernetes.io/storage-class: maprfs-ephemeral
        volume.beta.kubernetes.io/storage-provisioner: mapr.com/maprfs
    spec:
      accessModes: [ "ReadWriteOnce" ]
      resources:
        requests:
          storage: 100Gi 
```