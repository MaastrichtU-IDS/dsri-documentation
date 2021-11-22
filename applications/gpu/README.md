## Create templates in a project

1. Go to the project with `oc project my-project`

2. Apply Tensorflow and PyTorch templates:

```bash
oc apply -f https://raw.githubusercontent.com/MaastrichtU-IDS/dsri-documentation/master/applications/gpu/template-gpu-jupyterlab.yml
```

To update for dev, from `dsri-documentation` in `applications` folder:

```bash
for template in $( ls *.yml ); do oc apply -f ${template} ; done
```

## Build custom VisualStudio Code images

To build custom VisualStudio Code images: https://github.com/MaastrichtU-IDS/code-server (for tensorflow and pytorch)

## Log to Nvidia NGC repository

To access some Nvidia Docker images you might need to be logged to the NGC repository

https://docs.nvidia.com/ngc/ngc-getting-started-guide/index.html

The list of available Nvidia images can be find here: https://ngc.nvidia.com/catalog/containers

Login to NGC:

```bash
docker login nvcr.io
```

## With Helm

Tensorflow:

```bash
helm install jupyterlab-gpu dsri/jupyterlab \
  --set serviceAccount.name=anyuid \
  --set openshiftRoute.enabled=true \
  --set image.repository=nvcr.io/nvidia/tensorflow \
  --set image.tag=21.08-tf2-py3 \
  --set image.command="{jupyter,lab,--allow-root,--ip=0.0.0.0,--no-browser}" \
  --set storage.mountPath=/workspace \
  --set resources.requests."nvidia\.com/gpu"=1 \
  --set resources.limits."nvidia\.com/gpu"=1 \
  --set password=changeme
```

PyTorch:

```bash
helm install jupyterlab-gpu dsri/jupyterlab \
  --set serviceAccount.name=anyuid \
  --set openshiftRoute.enabled=true \
  --set image.repository=nvcr.io/nvidia/pytorch \
  --set image.tag=21.08-py3 \
  --set image.command="jupyter lab --allow-root --ip=0.0.0.0 --no-browser" \
  --set storage.mountPath=/workspace \
  --set resources.requests."nvidia\.com/gpu"=1 \
  --set resources.limits."nvidia\.com/gpu"=1 \
  --set password=changeme
```

FSL with CUDA 9.1 (cf. `Dockerfile` in the `fsl-gpu` folder):

```bash
helm install jupyterlab-gpu dsri/jupyterlab \
  --set serviceAccount.name=anyuid \
  --set openshiftRoute.enabled=true \
  --set image.repository=ghcr.io/maastrichtu-ids/jupyterlab \
  --set image.tag=fsl-gpu \
  --set storage.mountPath=/workspace \
  --set resources.requests."nvidia\.com/gpu"=1 \
  --set resources.limits."nvidia\.com/gpu"=1 \
  --set password=changeme
```

Debug tensorflow:

```bash
helm install --dry-run --debug ./charts/jupyterlab \
  --set serviceAccount.name=anyuid \
  --set openshiftRoute.enabled=true \
  --set image.repository=nvcr.io/nvidia/tensorflow \
  --set image.tag=21.08-tf2-py3 \
  --set image.command="{jupyter,lab,--allow-root,--ip=0.0.0.0,--no-browser}" \
  --set storage.mountPath=/workspace \
  --set resources.requests."nvidia\.com/gpu"=1 \
  --set resources.limits."nvidia\.com/gpu"=1 \
  --set password=changeme --generate-name
```

