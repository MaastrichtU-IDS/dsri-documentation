---
id: workflows-github-actions
title: Deploy GitHub Runners
---

Deploy a GitHub Actions runner to run workflows simple to define using YAML, and hosted in your GitHub repository on the DSRI.

This allows you to run larger workloads than on GitHub-hosted runners, which are limited to 7G RAM, 1 CPU and 6h per job.

For more informations about GitHub Actions workflows: https://github.com/features/actions

Here are some of the advantage of GitHub Actions:

* A step can be any Bash command, or a reusable Action from [GitHub Marketplace](https://github.com/marketplace/), which can be easily define from a Docker container, and share with your collaborators
* Parallelization can easily be added manually or dynamically to up to 255 jobs
* It provides a good logging system directly available in your repository on GitHub
* Easy to define triggers (on code push, cron job, manual request), and secrets (such as passwords)

## Install

Install the Helm repository to be able to deploy the GitHub Actions Runner:

```bash
helm repo add openshift-actions-runner https://redhat-actions.github.io/openshift-actions-runner-chart
helm repo update
```

Then create a GitHub Personal Access Token as per the instructions in the [runner image README](https://github.com/redhat-actions/openshift-actions-runner#pat-guidelines).

**tl;dr:** Go to your Settings: https://github.com/settings/tokens and check:

* `repo` (maybe also `workflow`?)
* `admin:org` if the Runner is for an organization

### Runner for organization

Provide the token previously created and the organization name

```bash
export GITHUB_PAT="TOKEN"
export GITHUB_OWNER=MaastrichtU-IDS
```

Deploy the runner for MaastrichtU-IDS organization:

```bash
helm install actions-runner openshift-actions-runner/actions-runner \
    --set-string githubPat=$GITHUB_PAT \
    --set-string githubOwner=$GITHUB_OWNER \
    --set runnerLabels="{ dsri, bio2rdf }" \
    --set replicas=3 \
    --set privileged=true \
    --set memoryRequest="512Mi" \
    --set memoryLimit="1Gi" \
    --set cpuRequest="100m" \
    --set cpuLimit="250m"
```

> Checkout [all available parameters here](https://github.com/redhat-actions/openshift-actions-runner-chart/blob/main/values.yaml)

Check the deployment:

```bash
helm get manifest actions-runner | kubectl get -f -
```

Go to your organization Settings page on GitHub, then go to the **Actions** tab, and scroll to the bottom. In the list of active runners you should see the runners you just deployed. 

### Runner for repository

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
    --set runnerLabels="{ dsri, bio2rdf }"
```

### Uninstall the runner

```bash
helm uninstall actions-runner
```

## See also

* GitHub runner chart repository: https://github.com/redhat-actions/openshift-actions-runner-chart

* Image for the runner: https://github.com/redhat-actions/openshift-actions-runner

* An action to automatically deploy a runner on a cluster (require to run openconnect to VPN first): https://github.com/redhat-actions/openshift-actions-runner