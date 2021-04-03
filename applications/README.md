Templates and deployments for the Data Science Research Infrastructure (DSRI).

## Useful resources

[Browse the list of Icons](https://rawgit.com/openshift/openshift-logos-icon/master/demo.html) for Templates in the Catalog.

Convert JSON to YAML: https://www.json2yaml.com

**See also**:

* [OpenShift documentation to generate Template](https://docs.openshift.com/container-platform/3.11/dev_guide/templates.html#export-as-template) from deployed service
* Deployment from Jupyter

  * https://github.com/jupyter/docker-stacks/tree/master/examples/source-to-image 

  * See [their template](https://raw.githubusercontent.com/jupyter/docker-stacks/master/examples/source-to-image/templates.json)

* JupyterHub with GitHub OAuth template based on [jackfrost373/jupyter-root](https://github.com/jackfrost373/jupyter-root) and https://github.com/jupyter-on-openshift/jupyterhub-quickstart

## Upload templates to your project

Clone this repository and go in the `applications` folder:

```bash
git clone https://github.com/MaastrichtU-IDS/dsri-documentation.git
cd applications
```

### Data science templates

Use a bash terminal to upload popular all data science templates with privileged user:

```bash
for template in $( ls templates/*.yml ); do oc apply -f ${template} ; done
```

Upload templates of popular applications with restricted user (jupyterlab, vscode, rstudio):

```bash
for template in $( ls templates/restricted/*.yml ); do oc apply -f ${template} ; done
```

### GPU templates

Tensorflow and PyTorch templates to run on GPU:

```bash
for template in $( ls templates/gpu/*/*.yml ); do oc apply -f ${template} ; done
```

## Create custom Docker image

For **VSCode server** or filebrowser: check their respective folders.

For **JupyterLab**: check https://github.com/MaastrichtU-IDS/jupyterlab

## Create app from template using command

Create app from template file using the CLI:

```bash
oc new-app -f templates/template-jupyterlab-root.yml -p APPLICATION_NAME=jupyterlab,PASSWORD=PASSWORD
```

Create app from existing template in your DSRI project using the CLI:

```bash
oc new-app jupyterlab-root -p APPLICATION_NAME=jupyterlab,PASSWORD=PASSWORD
```

Delete your application:

```bash
oc delete all --selector app=jupyterlab
```

> Replace `jupyterlab` by your **APPLICATION_NAME**

Delete all applications from a template:

```bash
oc delete all,secret,configmaps,serviceaccount,rolebinding --selector template=jupyterlab
```

