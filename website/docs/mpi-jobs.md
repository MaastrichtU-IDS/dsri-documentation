---
id: mpi-jobs
title: Run MPI jobs
---

We deployed the [MPI Operator](https://github.com/kubeflow/mpi-operator) from Kubeflow to run MPI jobs on the DSRI.

> The MPI Operator makes it easy to run allreduce-style distributed training on Kubernetes. Please check out [this blog post](https://medium.com/kubeflow/introduction-to-kubeflow-mpi-operator-and-industry-adoption-296d5f2e6edc) for an introduction to MPI Operator and its industry adoption.

## Run MPI jobs on CPU

Checkout the [repository of the CPU benchmark](https://github.com/kubeflow/mpi-operator/tree/master/examples/horovod) for a complete example of an MPI job: python script, `Dockerfile`, and the job deployment YAML.

Clone the repository, and go to the example folder:

```bash
git clone https://github.com/kubeflow/mpi-operator.git
cd mpi-operator/examples/horovod
```

Open the `tensorflow-mnist.yaml` file, and fix the `apiVersion` on the first line:

```yaml
# From
apiVersion: kubeflow.org/v1
# To
apiVersion: kubeflow.org/v1alpha2
```

You will also need to specify those containers can run with the `root` user by adding the `serviceAccountName` between `spec:` and `container:` for the launcher and the runners:

```yaml
      template:
        spec:
          serviceAccountName: anyuid
          containers:
          - image: docker.io/kubeflow/mpi-horovod-mnist
```

Once this has been set, run the job in the current project on the DSRI:

```bash
oc create -f tensorflow-mnist.yaml
```

You should see the 2 workers and the main job running in your project **Topology** page in the DSRI web UI (cf. [this comment](https://github.com/kubeflow/mpi-operator/blob/master/examples/horovod/tensorflow_mnist.py#L92) if you are facing issue with `.keras/datasets` when it runs).

You can now take a look at, and edit, the different files to run your custom MPI job on the DSRI:

🐍 [`tensorflow_mnist.py`](https://github.com/kubeflow/mpi-operator/blob/master/examples/horovod/tensorflow_mnist.py): the python script with the actual job to run

🐳 [`Dockerfile.cpu`](https://github.com/kubeflow/mpi-operator/blob/master/examples/horovod/Dockerfile.cpu): the Dockerfile to define the image of the containers in which your job will run (install dependencies)

⛵️ [`tensorflow-mnist.yaml`](https://github.com/kubeflow/mpi-operator/blob/master/examples/horovod/tensorflow-mnist.yaml): the YAML file to define the MPI deployment on Kubernetes (number and limits of workers, `mpirun` command, etc)

See the [Kubeflow documentation to create a MPI job](https://www.kubeflow.org/docs/components/training/mpi/#creating-an-mpi-job) for more details.

:::info Contact us

Feel free to contact us on  the DSRI Slack **#helpdesk** channel to discuss the use of MPI on the DSRI.

:::

