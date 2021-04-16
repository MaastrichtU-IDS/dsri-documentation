## PyTorch on GPU

### With JupyterLab

Create the ImageStream in the current project:

```bash
oc project dke-machine-translation
oc create -f pytorch-gpu-imagestream.yml
```

Add the template to the current project catalog::

```bash
oc create -f template-pytorch-gpu-vscode-persistent.yml
```

> This template uses `nvcr.io/nvidia/pytorch:19.12-py3`

To connect to the Pod ID using the `APPLICATION_NAME` provided in the template when creating the pod:

```bash
oc get pod --selector app=<application_name>
oc rsh <pod_id>
```

### With VisualStudio Code

Add template to the current project catalog:

```bash
oc create -f template-pytorch-gpu-vscode-persistent.yml
```

This template uses a custom image based on `nvcr.io/nvidia/pytorch:19.12-py3`

To rebuild the image, run this in the current folder:

```bash
docker build -t ghcr.io/maastrichtu-ids/nvidia-gpu-pytorch-vscode:19.11-py3 .
```

Test to run it locally:

```bash
docker run -it --rm --name vscode --network host -p 8080:8080 -e PASSWORD=password ghcr.io/maastrichtu-ids/nvidia-gpu-pytorch-vscode:19.11-py3
```

Push:

```bash
docker push ghcr.io/maastrichtu-ids/nvidia-gpu-pytorch-vscode:19.11-py3
```

