## Create templates in a project

1. Go to the project with `oc project my-project`

2. Apply Tensorflow and PyTorch templates:

```bash
oc apply -f https://raw.githubusercontent.com/MaastrichtU-IDS/dsri-documentation/master/applications/gpu/template-gpu-jupyterlab.yml
oc apply -f https://raw.githubusercontent.com/MaastrichtU-IDS/dsri-documentation/master/applications/gpu/template-gpu-vscode.yml
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

