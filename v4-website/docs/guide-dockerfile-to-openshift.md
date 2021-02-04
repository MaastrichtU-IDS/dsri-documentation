---
id: guide-dockerfile-to-openshift
title: Deploy from a Dockerfile
---

## Build from local Dockerfile

This manual shows you an example of how to convert a dockerfile from your local machine to a running container on DSRI (openshift / okd). Start by cloning the example repository to your local machine.

```shell
git clone git@gitlab.maastrichtuniversity.nl:dsri-examples/dockerfile-to-okd.git
```
After cloning you now have a local folder containing a Dockerfile and index.html file. Inspect both files.

Login with the openshift client:
```shell
oc login https://console-openshift-console.apps.dsri2.unimaas.nl
```

Create a new project if you don't have a project yet you can work with (change myproject to a project name of your choice:
```shell 
oc new-project myproject
```

---

### Create new build configuration.

```shell
oc new-build --name dockerfile-to-okd --binary
```

---

### Build image

Start a new build with the example files we provided.

```shell
cd dockerfile-to-okd
oc start-build dockerfile-to-okd --from-dir=. --follow --wait
```

---

### Create app

Create a new app using the build we just created:

```shell
oc new-app dockerfile-to-okd
```

To properly deploy your app on OpenShift you will need to define a few more parameters:

- Enable root user access (with `serviceAccountName`)
- Add persistent storage (with `volumes` and `containers: volumeMounts` )

  - `${STORAGE_NAME}`: Name of your persistent volume claim in the **Storage** page of your project in the web UI
  - `${STORAGE_FOLDER}` : Name of the folder inside the persistent volume claim to store the application data (so you can store multiple applications on the same persistent volume claim)

- Make sure the container will run on the right nodes (with the `nodeSelector`)

Open the configuration of the started app:

```shell
oc edit dockerfile-to-okd
```

Add the following lines (replace the variables, such as `${STORAGE_NAME}` by your values):

```yaml
    template:
      spec:
        serviceAccountName: anyuid
        nodeSelector:
          dsri.unimaas.nl/cpu: 'true'
        volumes:
        - name: data
          persistentVolumeClaim:
            claimName: "${STORAGE_NAME}"
        containers:
        - image: rstudio-root:latest
          volumeMounts:
          - name: data
            mountPath: "/home/rstudio"
            subPath: "${STORAGE_FOLDER}"
```

:::info Generate deployment file in YAML

You can also generate the app deployment in a YAML file to edit it before start:

```shell
oc new-app dockerfile-to-okd -o yaml > myapp.yml
# Edit myapp.yml
oc create -f myapp.yml
```

:::

---

### Expose app

Expose the application so you can reach it from your browser and check the route that was created

```shell
oc expose svc/dockerfile-to-okd
oc get route
```

You can now visit the route shown in the HOST/PORT output of the 'oc get route' command and see if you have successfully converted the docker file. 

---

### Delete the created build

```shell
oc delete build dockerfile-to-okd
```

> See [oc delete documentation](https://docs.openshift.com/enterprise/3.0/cli_reference/basic_cli_operations.html#application-modification-cli-operations).

---

## Deploy from a local docker image

You can also deploy a local docker image from your machine. 

First build the docker image:

```shell
docker build -t my-docker-image:latest .
```

Check you have the image locally on your system:

```shell
docker images ls
```

You should have a docker image for your application:

```bash
REPOSITORY                                   TAG                 
my-docker-image                              latest
```

You can then deploy providing the docker image name and the name of the application to be deployed:

```abash
oc new-app my-docker-image --name app-name-on-openshift
```

---

## Deploy using GitHub Actions workflows

You can also build and deploy your application using a GitHub Actions workflow.

You will need to connect to the UM VPN in your workflow by defining 2 secrets for `VPN_USER` and `VPN_PASSWORD`, this is done by this step:

```yaml
- name: Connect to the VPN
  run: |
    sudo apt-get install -y openconnect network-manager-openconnect
    echo '${{ secrets.VPN_PASSWORD }}' | sudo openconnect --passwd-on-stdin --no-xmlpost --non-inter --background --authgroup 01-Employees --user ${{ secrets.VPN_USER }} vpn-rw1.maastrichtuniversity.nl
    sleep 10
```

:::info RedHat documentation

RedHat provides the following instructions and template to deploy an application on OpenShift

:::

The OpenShift Starter workflow will:

- Checkout your repository
- Perform a Docker build
- Push the built image to an image registry
- Log in to your OpenShift cluster
- Create an OpenShift app from the image and expose it to the internet.

Before you begin:
- Have write access to a container image registry such as quay.io or Dockerhub.
- Have access to an OpenShift cluster.
  - For instructions to get started with OpenShift see https://www.openshift.com/try
- The project you wish to add this workflow to should have a Dockerfile.
  - If you don't have a Dockerfile at the repository root, see the buildah-build step.
  - Builds from scratch are also available, but require more configuration.

To get the workflow running:
1. Add this workflow to your repository.
2. Edit the top-level 'env' section, which contains a list of environment variables that must be configured.
3. Create the secrets referenced in the 'env' section under your repository Settings.
4. Edit the 'branches' in the 'on' section to trigger the workflow on a push to your branch.
5. Commit and push your changes.

For a more sophisticated example, see https://github.com/redhat-actions/spring-petclinic/blob/main/.github/workflows/petclinic-sample.yaml
Also see our GitHub organization, https://github.com/redhat-actions/

```yaml
name: Deploy to OpenShift

# ⬇️  Modify the fields marked with ⬇️ to fit your project, and create any secrets that are referenced.
# https://docs.github.com/en/free-pro-team@latest/actions/reference/encrypted-secrets
env:
  # ⬇️ EDIT with your registry and registry path.
  REGISTRY: ghcr.io/maastrichtu-ids
  # ⬇️ EDIT with your registry username.
  REGISTRY_USER: <username>
  REGISTRY_PASSWORD: ${{ secrets.REGISTRY_PASSWORD }}

  # ⬇️ EDIT to log into your OpenShift cluster and set up the context.
  # See https://github.com/redhat-actions/oc-login#readme for how to retrieve these values.
  OPENSHIFT_SERVER: ${{ secrets.OPENSHIFT_SERVER }}
  OPENSHIFT_TOKEN: ${{ secrets.OPENSHIFT_TOKEN }}

  # ⬇️ EDIT with the port your application should be accessible on.
  APP_PORT: 8080

  # ⬇️ EDIT if you wish to set the kube context's namespace after login. Leave blank to use the default namespace.
  OPENSHIFT_NAMESPACE: ""

  # If you wish to manually provide the APP_NAME and TAG, set them here, otherwise they will be auto-detected.
  APP_NAME: "my-app"
  TAG: ""

on:
  # https://docs.github.com/en/free-pro-team@latest/actions/reference/events-that-trigger-workflows
  push:
    # Edit to the branch(es) you want to build and deploy on each push.
    branches: [ main ]

jobs:
  openshift-ci-cd:
    name: Build and deploy to OpenShift
    runs-on: ubuntu-20.04

    steps:
    - uses: actions/checkout@v2

    - name: Determine app name
      if: env.APP_NAME == ''
      run: |
        echo "APP_NAME=$(basename $PWD)" | tee -a $GITHUB_ENV

    - name: Determine tag
      if: env.TAG == ''
      run: |
        echo "TAG=${GITHUB_SHA::7}" | tee -a $GITHUB_ENV

    # https://github.com/redhat-actions/buildah-build#readme
    - name: Build from Dockerfile
      uses: redhat-actions/buildah-build@v1
      with:
        image: ${{ env.APP_NAME }}
        tag: ${{ env.TAG }}
        # If you don't have a dockerfile, see:
        # https://github.com/redhat-actions/buildah-build#building-from-scratch
        # Otherwise, point this to your Dockerfile relative to the repository root.
        dockerfiles: |
          ./Dockerfile

    # https://github.com/redhat-actions/push-to-registry#readme
    - name: Push to registry
      id: push-to-registry
      uses: redhat-actions/push-to-registry@v1
      with:
        image: ${{ env.APP_NAME }}
        tag: ${{ env.TAG }}
        registry: ${{ env.REGISTRY }}
        username: ${{ env.REGISTRY_USER }}
        password: ${{ env.REGISTRY_PASSWORD }}

    # The path the image was pushed to is now stored in ${{ steps.push-to-registry.outputs.registry-path }}

	- name: Connect to the VPN
      run: |
        sudo apt-get install -y openconnect network-manager-openconnect
        echo '${{ secrets.VPN_PASSWORD }}' | sudo openconnect --passwd-on-stdin --no-xmlpost --non-inter --background --authgroup 01-Employees --user ${{ secrets.VPN_USER }} vpn-rw1.maastrichtuniversity.nl
        sleep 10

    # oc-login works on all platforms, but oc must be installed first.
    # The GitHub Ubuntu runner already includes oc.
    # https://github.com/redhat-actions/oc-login#readme
    - name: Log in to OpenShift
      uses: redhat-actions/oc-login@v1
      with:
        openshift_server_url: ${{ env.OPENSHIFT_SERVER }}
        openshift_token: ${{ env.OPENSHIFT_TOKEN }}
        insecure_skip_tls_verify: true
        namespace: ${{ env.OPENSHIFT_NAMESPACE }}

    # This step should create a deployment, service, and route to run your app and expose it to the internet.
    # Feel free to replace this with 'oc apply', 'helm install', or however you like to deploy your app.
    - name: Create and expose app
      run: |
        export IMAGE="${{ steps.push-to-registry.outputs.registry-path }}"
        export PORT=${{ env.APP_PORT }}

        export SELECTOR="app=${{ env.APP_NAME }}"
        echo "SELECTOR=$SELECTOR" >> $GITHUB_ENV

        set -x
        # Take down any old deployment
        oc delete all --selector="$SELECTOR"
        oc new-app --name $APP_NAME --docker-image="$IMAGE"

        # Make sure the app port is exposed
        oc patch svc $APP_NAME -p "{ \"spec\": { \"ports\": [{ \"name\": \"$PORT-tcp\", \"port\": $PORT }] } }"
        oc expose service $APP_NAME --port=$PORT

        oc get all --selector="$SELECTOR"
        set +x

        export ROUTE="$(oc get route $APP_NAME -o jsonpath='{.spec.host}')"
        echo "$APP_NAME is exposed at $ROUTE"
        echo "ROUTE=$ROUTE" >> $GITHUB_ENV

    - name: View application route
      run: |
        [[ -n ${{ env.ROUTE }} ]] || (echo "Determining application route failed in previous step"; exit 1)
        echo "======================== Your application is available at: ========================"
        echo ${{ env.ROUTE }}
        echo "==================================================================================="
        echo
        echo "Your app can be taken down with: \"oc delete all --selector='${{ env.SELECTOR }}'\""
```

