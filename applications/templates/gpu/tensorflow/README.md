## Tensorflow on GPU

### With JupyterLab

Add template to the current project catalog:

```bash
oc create -f template-tf-gpu-jupyter-persistent.yml
```

> This template uses `nvcr.io/nvidia/tensorflow:19.11-tf2-py3`

### With VisualStudio Code

Add template to the current project catalog:

```bash
oc create -f template-tf-gpu-vscode-persistent.yml
```

This template uses a custom image based on `nvcr.io/nvidia/tensorflow:19.11-tf2-py3`

To rebuild the image, run this in the current folder:

```bash
docker build -t ghcr.io/maastrichtu-ids/nvidia-gpu-tf2-vscode:19.11-tf2-py3 .
```

Test to run it locally:

```bash
docker run -it --rm --name vscode --network host -p 8080:8080 -e PASSWORD=password ghcr.io/maastrichtu-ids/nvidia-gpu-tf2-vscode:19.11-tf2-py3
```

Push:

```bash
docker push ghcr.io/maastrichtu-ids/nvidia-gpu-tf2-vscode:19.11-tf2-py3
```

