

Generate FSL container with neurodocker )cf. https://maastrichtu-ids.github.io/dsri-documentation/docs/neuroscience) 

```bash
docker run --rm repronim/neurodocker:0.7.0 generate docker \
    --base debian:stretch --pkg-manager apt \
    --fsl version=6.0.3 > Dockerfile
```