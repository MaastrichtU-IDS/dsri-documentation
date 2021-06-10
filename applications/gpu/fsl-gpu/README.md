## FSL on GPU

Generate FSL container with neurodocker (cf. [DSRI docs about Neurodocker](https://maastrichtu-ids.github.io/dsri-documentation/docs/neuroscience)) 

```bash
docker run --rm repronim/neurodocker:0.7.0 generate docker \
    --base debian:stretch --pkg-manager apt \
    --fsl version=6.0.3 > Dockerfile
```

Build the FSL for GPU container, based on Nvidia container for tensorflow on GPU with JupyterLab, from the `Dockerfile` in this folder:

```bash
docker build -t ghcr.io/maastrichtu-ids/jupyterlab:fsl-gpu .
```

Test it on http://localhost:8888

```bash
docker run it -p 8888:8888 -e JUPYTER_TOKEN=password ghcr.io/maastrichtu-ids/jupyterlab:fsl-gpu
```

Push it:

```bash
docker push ghcr.io/maastrichtu-ids/jupyterlab:fsl-gpu
```

