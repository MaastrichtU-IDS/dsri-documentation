---
id: mpi-jobs
title: MPI Jobs
---

[MPI (Message Passing Interface)](https://en.wikipedia.org/wiki/Message_Passing_Interface) is a standard for running parallel computing jobs across multiple processes or machines. It is widely used in scientific computing, high performance computing (HPC), and distributed machine learning training.

The [MPI Operator](https://github.com/kubeflow/mpi-operator) from Kubeflow makes it easy to run MPI jobs on DSRI. It manages the **launcher** (the main process that coordinates the work) and the **workers** (the processes that do the actual computation) as Kubernetes pods running in parallel.

:::warning Request access to the MPI Operator

To be able to deploy MPI jobs you will need to ask the [RCS](mailto:rcs-ub@maastrichtuniversity.nl) team to enable the MPI Operator in your project. Once enabled you will be able to submit MPI jobs to the cluster.

:::

## Test your setup

Before running your own code, verify that MPI works in your project by running the example pi calculation job. This job uses 2 workers to calculate the value of pi in parallel.

### 1. Clone the MPI operator repository

```bash
git clone https://github.com/kubeflow/mpi-operator.git
cd mpi-operator/examples/v2beta1/pi
```

### 2. Submit the job

Make sure you are in the correct project:

```bash
oc project my-project
```

Then create the job:

```bash
oc create -f pi.yaml
```


### 3. Monitor the job

Check the job status:

```bash
oc get mpijob pi
```

Check the pods (you should see 1 launcher and 2 workers):

```bash
oc get pods
```

### 4. Check the results

Once the launcher pod shows `Completed`, check the output:

```bash
oc logs pi-launcher-<id>
```

You should see:

```
Workers: 2
Rank 0 on host pi-launcher
Rank 1 on host pi-launcher
pi is approximately 3.1410376000000002
```

The job completed successfully. Workers will terminate automatically after the launcher finishes.

### 5. Clean up

```bash
oc delete mpijob pi
```

---

## Run your own MPI job

The pi example above is just a sanity check. To run your own code on DSRI as an MPI job you need to:

1. Package your code and MPI dependencies in a Docker image — see the [DSRI guide for building Docker images](/docs/guide-dockerfile-to-openshift)
2. Use the pi example YAML as a starting point and replace:
   - `image` - your Docker image containing your code
   - `command` and `args` under the launcher - your executable or script
   - `replicas` under Worker - number of workers you need
   - `resources` - CPU and memory based on your workload

:::caution Required for DSRI
Always keep `serviceAccountName: anyuid` and `runAsUser: 1000` in both the Launcher and Worker specs — these are required for MPI jobs to run correctly on DSRI.
:::

## Monitor and debug jobs

Check job status:

```bash
oc get mpijob
oc describe mpijob my-mpi-job
```

Check launcher logs (where your output will appear):

```bash
oc logs <launcher-pod-name>
```

Check worker logs:

```bash
oc logs <worker-pod-name>
```

## See also

- [MPI Operator GitHub](https://github.com/kubeflow/mpi-operator)
- [Kubeflow MPI documentation](https://www.kubeflow.org/docs/components/training/mpi/)
- [MPI Operator examples](https://github.com/kubeflow/mpi-operator/tree/master/examples)

:::info Contact us

Feel free to contact us using the [Topdesk Form](https://servicedesk.icts.maastrichtuniversity.nl/tas/public/ssp/content/serviceflow?unid=1ffa93e9ecd94d938ad46e3cb24c2392) to discuss the use of MPI on the DSRI or if you need help adapting your code to run as an MPI job.

:::