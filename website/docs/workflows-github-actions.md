---
id: workflows-github-actions
title: Deploy GitHub Runners
---

Deploy a GitHub Actions runner to run workflows simple to define using YAML, and hosted in your GitHub repository on the DSRI. This allows you to run larger workloads than on GitHub-hosted runners, which are limited to 7G RAM, 1 CPU and 6h per job.

Here are some of the advantage of GitHub Actions:

* A step can be any Bash command, or a reusable Action from the [GitHub Marketplace](https://github.com/marketplace/), which can be easily define from a Docker container, and share with your collaborators
* Parallelization can easily be added manually or dynamically to up to 255 jobs
* It provides a good logging system directly available in your repository on GitHub
* Define triggers (on code push, cron job, manual request), and secrets (such as passwords) easily

For more information about GitHub Actions workflows, go to https://github.com/features/actions

## Install the chart

You will need to have Helm installed on your computer to deploy a GitHub Actions Runner, see the [Helm docs](/docs/helm) for more details.

Install the Helm chart to be able to deploy the GitHub Actions Runner on the DSRI:

```bash
helm repo add openshift-actions-runner https://redhat-actions.github.io/openshift-actions-runner-chart
helm repo update
```

Then create a GitHub Personal Access Token as per the instructions in the [runner image README](https://github.com/redhat-actions/openshift-actions-runner#pat-guidelines).

**tl;dr:** go to your Settings on GitHub: https://github.com/settings/tokens, click the button to create a new token, give it a meaningful name (e.g. `DSRI Runner my-project`), and check the following permissions:

✅️ `repo` (maybe also `workflow`?)

✅️ `admin:org` if the Runner is for an organization

## Deploy a Runner 

Before deploying the runner, make sure you are in the project where you want to deploy it:

```bash
oc project my-project
```

### For an organization

Deploy a runner available for all repositories of an organization (you can fine tune the access via GitHub Settings)

1. Provide the token previously created, and the organization name

```bash
export GITHUB_PAT="TOKEN"
export GITHUB_OWNER=My-Org
```

2. Deploy the runner for the organization:

```bash
helm install actions-runner openshift-actions-runner/actions-runner \
    --set-string githubPat=$GITHUB_PAT \
    --set-string githubOwner=$GITHUB_OWNER \
    --set runnerLabels="{ dsri, $GITHUB_OWNER }" \
    --set replicas=3 \
    --set serviceAccountName=anyuid \
    --set memoryRequest="512Mi" \
    --set memoryLimit="100Gi" \
    --set cpuRequest="100m" \
    --set cpuLimit="64"
```

You can also change the default runner image:

```bash
	--set runnerImage=ghcr.io/vemonet/github-actions-conda-runner \
	--set runnerTag=latest
```

> Checkout [all available parameters here](https://github.com/redhat-actions/openshift-actions-runner-chart/blob/main/values.yaml)

3. Check the deployment:

```bash
helm get manifest actions-runner | kubectl get -f -
```

Go to your organization Settings page on GitHub, then go to the **Actions** tab, and scroll to the bottom. In the list of active runners you should see the runners you just deployed. 

### For a repository

You can also deploy a runner for a specific repository:

```bash
export GITHUB_PAT="TOKEN"
# For an org runner, this is the org.
# For a repo runner, this is the repo owner (org or user).
export GITHUB_OWNER=vemonet
# For an org runner, omit this argument. 
# For a repo runner, the repo name.
export GITHUB_REPO=shapes-of-you
```

Deploy the runner:

```bash
helm install actions-runner openshift-actions-runner/actions-runner \
    --set-string githubPat=$GITHUB_PAT \
    --set-string githubOwner=$GITHUB_OWNER \
    --set-string githubRepository=$GITHUB_REPO \
    --set runnerLabels="{ dsri, anything-helpful }"
```

## Define Actions to run on DSRI

You can now set GitHub Action workflows, in the `.github/workflows` folder, to be run on this runner (the repository needs to be under the organization, or user you added the workflow to). The job will be sent to run on the DSRI:

```yaml
jobs:
    your-job:
      runs-on: ["self-hosted", "dsri", "my-org" ]
      steps: ...
```

## Uninstall the runner

```bash
helm uninstall actions-runner
```

## Deploy using GitHub Actions workflows

:::warning Experimental

Experimental: this deployment workflow is still experimental, let us know on Slack if you are interested in using it.

:::

Alternatively you can also build and deploy your application using a GitHub Actions workflow.

You will need to connect to the UM VPN in your workflow by defining 2 secrets for `VPN_USER` and `VPN_PASSWORD`, this is done by this step:

```yaml
- name: Connect to the VPN
  run: |
    sudo apt-get install -y openconnect network-manager-openconnect
    echo '${{ secrets.VPN_PASSWORD }}' | sudo openconnect --passwd-on-stdin --no-xmlpost --non-inter --background --authgroup 01-Employees --user ${{ secrets.VPN_USER }} vpn.maastrichtuniversity.nl
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
        echo '${{ secrets.VPN_PASSWORD }}' | sudo openconnect --passwd-on-stdin --no-xmlpost --non-inter --background --authgroup 01-Employees --user ${{ secrets.VPN_USER }} vpn.maastrichtuniversity.nl
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

## See also

* GitHub runner chart repository: https://github.com/redhat-actions/openshift-actions-runner-chart

* Image for the runner: https://github.com/redhat-actions/openshift-actions-runner

* An action to automatically deploy a runner on a cluster (require to run openconnect to VPN first): https://github.com/redhat-actions/openshift-actions-runner