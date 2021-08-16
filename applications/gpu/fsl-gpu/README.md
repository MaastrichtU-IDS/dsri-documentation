## FSL on GPU

Generate FSL container with neurodocker (cf. [DSRI docs about Neurodocker](https://maastrichtu-ids.github.io/dsri-documentation/docs/neuroscience)) 

```bash
docker run --rm repronim/neurodocker:0.7.0 generate docker \
    --base debian:stretch --pkg-manager apt \
    --fsl version=6.0.3 > Dockerfile
```

Build the FSL for GPU container, based on Nvidia container for CUDA with JupyterLab, from the `Dockerfile` in this folder (cf. https://ngc.nvidia.com/catalog/containers/nvidia:cuda). Use CUDA version `9.1-devel-ubuntu16.04` (or `10.2-devel-ubuntu18.04` starting from FSL `6.0.5`)

```bash
docker build --build-arg CUDA_VERSION=nvcr.io/nvidia/cuda:10.2-devel-ubuntu18.04 -t ghcr.io/maastrichtu-ids/jupyterlab:fsl-gpu .
```

Test it on http://localhost:8888

```bash
docker run it -p 8888:8888 -e JUPYTER_TOKEN=password ghcr.io/maastrichtu-ids/jupyterlab:fsl-gpu
```

Push it:

```bash
docker push ghcr.io/maastrichtu-ids/jupyterlab:fsl-gpu
```

