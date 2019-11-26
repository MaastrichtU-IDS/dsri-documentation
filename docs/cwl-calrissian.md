---
id: cwl-calrissian
title: Run CWL workflows
---

![CWL workflows](/dsri-documentation/img/CWL_logo.png)

## Clone the repository

Git clone in `/calrissian` from a terminal. E.g. from [Jupyterlab](https://app.dsri.unimaas.nl:8443/console/project/test-vincent/browse/pods/jupyterlab-root-2-8w472?tab=terminal), shared in `/data/calrissian`.

```shell
cd /data/calrissian
git clone --recursive https://github.com/MaastrichtU-IDS/d2s-transform-template.git
cd d2s-transform-template
```

You will need to create the folder for the workflow output data, in our example it is `output-data`

```shell
mkdir /data/calrissian/output-data
```

You might need to give permissions (CWL execution will fail due to permissions issues otherwise).

```shell
chmod -R 777 /data/calrissian
```

---

## Start pod

Start the CWL execution from your computer using the `oc` client. Define the CWL command arguments to run in [run-cwl-calrissian.yaml](https://github.com/MaastrichtU-IDS/d2s-cwl-workflows/blob/master/support/run-cwl-calrissian.yaml) (be careful to properly define the paths to the CWL files in the pod storage).

```shell
oc create -f d2s-cwl-workflows/support/run-cwl-calrissian.yaml
```

> Browse running pods [here](https://app.dsri.unimaas.nl:8443/console/project/test-vincent/browse/pods).

> You will need to delete the pod if you want to re-create it.

> Make sure you are [on the right project](https://maastrichtu-ids.github.io/dsri-documentation/docs/openshift-commands#list-projects): `oc projects`

## Delete created pod

```shell
oc delete -f d2s-cwl-workflows/support/run-cwl-calrissian.yaml
```
