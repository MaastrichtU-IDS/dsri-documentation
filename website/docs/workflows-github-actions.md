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

For more informations about GitHub Actions workflows, go to https://github.com/features/actions

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

## See also

* GitHub runner chart repository: https://github.com/redhat-actions/openshift-actions-runner-chart

* Image for the runner: https://github.com/redhat-actions/openshift-actions-runner

* An action to automatically deploy a runner on a cluster (require to run openconnect to VPN first): https://github.com/redhat-actions/openshift-actions-runner