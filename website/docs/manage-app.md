---
id: manage-app
title: Managing Running Application
---

## Stop your application

When you are not using your application anymore you can stop the pod. If you are using a Dynamic or Persistent storage you can restart the pod and continue working with all your data in the same state as you left it.

:::caution Do not waste resources

Please think of stopping applications you are not using to avoid consuming unnecessary resources.

:::

On the **Topology** page click on the down arrow ⬇️ next to the number of pods deployed.

<img src="/img/screenshot_scaledown_pod.png" alt="Scale down pod" style={{maxWidth: '100%', maxHeight: '100%'}} />

You can then restart the pod by clicking the up arrow ⬆️

Note that starting more than 1 pod will not increase the amount of resources you have access to, most of the time it will only waste resources and might ends up in weird behavior on your side. The web UI will randomly assign you to 1 of the pod started when you access it. This only works for clusters with multiple workers, such as Apache Flink and Spark. Or if you connect directly to each pod with the terminal to run different processes.

## Start your application

When you try to access your workspace and you encounter the page below, usually this indicates that your pod is not running. For example, this will be the case if you stopped your pod, or if there was maintenance on the cluster.

<img src="/img/screenshot_application_unavailable.png" alt="Screenshot of page that says Application is not available" style={{maxWidth: '100%', maxHeight: '100%'}} />

To start the pod, go to the **Topology** page, and click on the up arrow ⬆️ next to the number of pods deployed. Make sure you scale it to 1. Scaling it to more than 1 will not increase the amount of resources you have access to, most of the time it will only waste resources and causes weird behavior on your side.

<img src="/img/screenshot_scaledown_pod.png" alt="Scale down pod" style={{maxWidth: '100%', maxHeight: '100%'}} />

:::caution Do not waste resources

Please only scale up resources you're using, and scale down when you're not using them anymore. Consuming resources consumes unnecessary power and might prevent other users from using the DSRI.

:::



## Optional: define a docker image

Once you have tested your workspace and you know how to set it up it can be helpful to define a `Dockerfile` to build and publish a Docker image with everything directly installed (instead of installing your requirements after starting a generic workspace)

1. Start from an existing generic Docker image, depending on the base technologies you need, such as Debian, Ubuntu, Python, JupyterLab, VisualStudio Code, RStudio...
2. Add your source code in the Docker image using `ADD . .` or `COPY . .`
3. Install dependencies (e.g. `RUN apt-get install gfortran`)
4. Define which command to run when starting the container (e.g. `ENTRYPOINT["jupyter", "lab"]`)

Here is a simple example `Dockerfile` for a python application:

```dockerfile
# The base image to start from, choose the one with everything you need installed
FROM python:3.8

# Change the user and working directory to make sure we are using root
USER root
WORKDIR /root

# Install additional packages
RUN apt-get update && \
	apt-get install build-essentials

# This line will copy all files and folder that are in the same folder as the Dockerfile (usually the code you want to run in the container)
ADD . . 

# This line will install all the python packages described in the requirements.txt of your source code
RUN pip install -r requirements.txt && \
    pip install notebook jupyterlab

# Command to run when the container is started, here it starts JupyterLab as a service
ENTRYPOINT [ "jupyter", "lab" ]
```

Here are some examples of `Dockerfile` for various type of web applications:

* [Custom JupyterLab](https://github.com/MaastrichtU-IDS/jupyterlab/blob/main/Dockerfile) based on the official [jupyter/docker-stacks](https://github.com/jupyter/docker-stacks)
* [Custom RStudio](https://github.com/MaastrichtU-IDS/rstudio/blob/main/Dockerfile)
* [VisualStudio Code server](https://github.com/MaastrichtU-IDS/code-server/blob/main/Dockerfile)
* [Python web app](https://github.com/MaastrichtU-IDS/knowledge-collaboratory-api/blob/master/Dockerfile)

See the guide to [Publish a Docker image](/docs/guide-publish-image) for more details on this topic.
