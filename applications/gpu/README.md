## Create templates in a project

1. Go to the project with `oc project my-project`

2. Run from this folder:

```bash
for template in $( ls *.yml ); do oc apply -f ${template} ; done
```

## Build custom VisualStudio Code images

cf. https://github.com/MaastrichtU-IDS/code-server

## Log to Nvidia NGC repository

To access some Nvidia Docker images you might need to be logged to the NGC repository

https://docs.nvidia.com/ngc/ngc-getting-started-guide/index.html

The list of available Nvidia images can be find here: https://ngc.nvidia.com/catalog/containers

Login to NGC:

```bash
docker login nvcr.io
```

