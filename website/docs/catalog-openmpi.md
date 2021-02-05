---
id: catalog-openmpi
title: OpenMPI
---

OpenMPI can be deployed and run on the DSRI. We use the [MPI Operator from Kubeflow](https://github.com/kubeflow/mpi-operator).

See the [Kubeflow documentation to create a MPI job](https://www.kubeflow.org/docs/components/training/mpi/#creating-an-mpi-job) on OpenShift.

Create Tensorflow Benchmark:

```bash
git clone https://github.com/kubeflow/mpi-operator.git && cd mpi-operator
oc create -f examples/v1alpha2/tensorflow-benchmarks.yaml
```

See the GPU benchmarks for examples of MPI job definitions:

* [MPI TensorFlow benchmark](https://github.com/kubeflow/mpi-operator/blob/master/examples/v1alpha2/tensorflow-benchmarks.yaml)
* [MPI TensorFlow ImageNet benchmark](https://github.com/kubeflow/mpi-operator/blob/master/examples/v1alpha2/tensorflow-benchmarks-imagenet.yaml)

:::info Contact us

Contact us on  the DSRI Slack **#helpdesk** channel to discuss the deployment of OpenMPI on the DSRI.

:::

