---
id: workflows-nextflow
title: Run Nextflow Workflows
---

[Nextflow](https://www.nextflow.io/) enables scalable and reproducible scientific workflows using software containers. It allows the adaptation of pipelines written in the most common scripting languages.

Nextflow has been developed by the genomic research scientific community and is built to run bioinformatics pipeline.

:::info Official documentation

See the [Nextflow documentation](https://docs.seqera.io/nextflow/) and the [Kubernetes executor documentation](https://docs.seqera.io/nextflow/reference/executor/kubernetes).

:::

## How it works on the DSRI

A Nextflow run consists of two parts:
 
- **The head job**: the Nextflow process itself, which reads your pipeline and submits the tasks. You run it as a Kubernetes **Job** in your project.
- **The task pods**: one pod per pipeline task, created by the head job through a service account.

:::caution Do not use `nextflow kuberun`
 
`kuberun` is deprecated by Nextflow and does not allow certain settings to be set to be able to run on the DSRI. Submissions made with `kuberun` will be rejected.

:::

## Prerequisites
 
You only need the `oc` CLI, logged in to the DSRI. You do **not** need to install Nextflow on your local device anymore.

## Log into the DSRI with OC CLI

See our [CLI documentation](https://dsri.maastrichtuniversity.nl/docs/openshift-install) to read about how to install the CLI and log into the DSRI with it.

## Create the correct Persistent Volume Claim

To use Nexflow, you will need a Persistent Volume Claim (PVC) with ReadWriteMany (RWX) permissions set in your project you are going to use for your Nextflow workflow. To read more about how to set up an PVC on the DSRI, please refer to our [documentation](https://dsri.maastrichtuniversity.nl/docs/openshift-storage#create-the-persistent-storage). 

Make sure when creating an PVC with RWX permissions to use the storageClass `ocs-storagecluster-cephfs`! This storageClass is needed to be able to set the RWX permissions.

## Create Nextflow serviceaccount

To run a Nextflow pipeline you will need a serviceaccount with specific priviliges in your project. You will need to use this service account in your Nextflow configuration described in the next step.

First you will need to creaste the correct role. Note that the namespace field is left empty,and you will need to fill in your project name. Save this file as `nextflow-pod-manager-role.yaml`.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: nextflow-pod-manager
  namespace: <project name>
rules:
  - apiGroups: [""]
    resources: ["pods"]
    verbs: ["get", "list", "watch", "create", "delete", "patch"]
  - apiGroups: [""]
    resources: ["pods/log", "pods/status"]
    verbs: ["get", "list", "watch"]
  - apiGroups: [""]
    resources: ["configmaps", "persistentvolumeclaims"]
    verbs: ["get", "list", "create", "delete"]
```

Next, you will need to create the correct rolebinding. Note that again you will need to fill in the project you want to use in the namespace fields! Save this file as nextflow-rolebinding.yaml

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: nextflow-pod-manager-binding
  namespace: <project name>
subjects:
  - kind: ServiceAccount
    name: nextflow-sa
    namespace: <project name>
roleRef:
  kind: Role
  name: nextflow-pod-manager
  apiGroup: rbac.authorization.k8s.io
```

Then you will need to create the actual service account. Run the following CLI command to do so, again you will need to specific the correct project name:

```bash
oc create serviceaccount nextflow-sa -n <project name>
```

When everything is created and the files are saved, you will need to apply the role and rolebinding to your project. Run the following CLI commands to do so: 

```bash
oc apply -f nextflow-pod-manager-role.yaml -n <project name>
```

and

```bash
oc apply -f nextflow-rolebinding.yaml -n <project name>
```

## Create Nextflow configuration file

In the directory where you have installed Nextflow on your local computer, you will need to create a file named `nextflow.config`.

In this configuration file you will need to state the correct serviceaccount which we created in the previous step. Additionally for the namespace fill in the project you want to run your Nextflow pipeline in.

:::info Setting 'computeResourceType'

If you do not set 'computeResourceType' to 'Pod', Nextflow will default to 'Job'! Please read the documentation at the end of the page if you would like to use 'Jobs' instead of 'Pods'. We always advise to explicitly state either 'Pod' or 'Job' for 'computeResourceType'!

:::

```bash
process {
    executor = 'k8s'
 
    // Default resources for every task. Pipelines may override cpus/memory per process.
    cpus   = 1
    memory = '2 GB'
    disk   = '10 GB'                        // sets the ephemeral-storage request and limit.
}
 
k8s {
    computeResourceType = 'Pod'             // For 'Job' please read the documentation at the end of this page!
    namespace           = '<project name>'
    serviceAccount      = 'nextflow-sa'
    storageClaimName    = '<pvc name>'
    storageMountPath    = '/data'
    cpuLimits           = true              // required: also sets a CPU limit, not only a request
}
```

Make sure to set the serviceaccount to you created in the previous step, as this is the correct serviceaccount to use! Change the `project name` accordingly to match your project you want to run your Nextflow workflow in.

Store it in your project as a ConfigMap, so the head job can read it.
 
```bash
oc create configmap nextflow-config --from-file=nextflow.config -n <project name>
```

To change the configuration later, delete, edit, and recreate the ConfigMap:
 
```bash
oc delete configmap nextflow-config -n <project name>
oc create configmap nextflow-config --from-file=nextflow.config -n <project name>
```

### Tourbleshooting the config. 

Note that sometimes you will need to set more configuration options to make the Nextflow pipeline work. 

For example it might be needed to specify the home and nextflow home directories for task pods which run with a random user ID, resulting in their home directory not being writable. If a pipeline step fails with "permission denied" errors pointing at the home
directory, add the following to your `nextflow.config`:

```bash
process {
...
    pod = [[env: 'HOME', value: '/tmp']]
...
}
```

Note that setting the HOME to /tmp counts against the task pod's ephemeral-storage limit. A tool that caches heavily in HOME can get the pod evicted, so raise disk for that process if it happens.

## Create the head job
 
Save the following as `nextflow-job.yaml`. Fill in your PVC name and the correct `version` of Nextflow you would like to use. The available tags are on [Docker Hub](https://hub.docker.com/r/nextflow/nextflow/tags). Choose either the latest or one of the latest versions to pin a version number for reproducibility!
 
```yaml
apiVersion: batch/v1
kind: Job
metadata:
  generateName: nextflow-
spec:
  ttlSecondsAfterFinished: 172800   # remove the finished job after 2 days.
  backoffLimit: 0
  template:
    spec:
      serviceAccountName: nextflow-sa
      restartPolicy: Never
      containers:
        - name: nextflow
          image: docker.io/nextflow/nextflow:<version>
          command: ["bash", "-c"]
          args:
            - |
              mkdir -p /data/runs/hello && cd /data/runs/hello
              nextflow run nextflow-io/hello \
                -c /config/nextflow.config \
                -w /data/work
          env:
            - name: HOME
              value: /data
            - name: NXF_HOME
              value: /data/.nextflow
          resources:
            requests:
              cpu: "1"
              memory: 4Gi
              ephemeral-storage: 1Gi
            limits:
              cpu: "2"
              memory: 4Gi
              ephemeral-storage: 5Gi
          volumeMounts:
            - name: data
              mountPath: /data
            - name: config
              mountPath: /config
      volumes:
        - name: data
          persistentVolumeClaim:
            claimName: <pvc name>
        - name: config
          configMap:
            name: nextflow-config
```

Use a separate launch directory per analysis, such as /data/runs/hello above, when running two sequantial runs within the same job. Nextflow keeps its cache and logs there. Two runs cannot run in the same directory at the same time.

## Run the workflow
 
Submit the head job:
 
```bash
oc create -f nextflow-job.yaml -n <project name>
```

Follow the pipeline output with:
 
```bash
oc get jobs -n <project name>

oc logs -f job/<job-name> -n <project name>
```
 
You can close the terminal at any time. The pipeline keeps running in the cluster.
 
To resume a failed or interrupted run, add `-resume` to the `nextflow run` line and submit the job again. Keep the same launch directory.
 
To stop a running pipeline, delete the job:
 
```bash
oc delete job <job-name> -n <project name>
```
 
Check afterwards with `oc get pods` for any task pods that were left behind.
 
The pipeline log `.nextflow.log` and the results are kept on your PVC under the launch directory.

To read more about how to use Nextflow on a Kubernetes cluster please refer to their [documentation](https://www.nextflow.io/docs/latest/kubernetes.html).

## Using Nextflow at scale - using Jobs

When using Nextflow on a larger scale it is important to note that it might be of benefit to use `Jobs` instead of `Pods`. As of Nextflow version 26.10, the default resource used is a Job when nothing is specified in the Nextflow configuration file.

To make `Jobs` work on the DSRI you need to include permissions to the `nextflow-pod-manager` role for the serviceaccount to be able to deploy `Jobs` on the cluster.

To do so, add the following to the role underneath the `rules` section:

```yaml
  - apiGroups: ["batch"]
    resources: ["jobs"]
    verbs: ["get", "list", "watch", "create", "delete"]
```

Note that in the Nextflow configuration file shown earlier in this documentation we specify the `computeResourceType` as `Pod`. It is important to change this to `Job`
Additionally, a TTL should be set as it is mandatory on the DSRI for the resource type `Jobs`.

In the Nextflow configuration file add the following line `pod = [[ttlSecondsAfterFinished: 86400]]` to the `process` section:

```bash
process {
...
    pod = [[ttlSecondsAfterFinished: 86400]]
}
```