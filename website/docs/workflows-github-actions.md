---
id: workflows-github-actions
title: Deploy GitHub Runners
---

Deploy a GitHub Actions runner on the DSRI to run your GitHub Actions workflows with more resources than GitHub-hosted runners, which are limited to 7GB RAM, 1 CPU and 6 hours per job.

## Why use a GitHub runner?

- Run larger workloads with more CPU, memory and no time restrictions
- A step can be any Bash command, or a reusable Action from the [GitHub Marketplace](https://github.com/marketplace/)
- Parallelization up to 255 jobs
- Good logging system directly available in your GitHub repository
- Define triggers (on code push, cron job, manual request) and secrets easily

For more information about GitHub Actions, go to https://github.com/features/actions

## Prerequisites

- [Helm installed](/docs/helm) on your computer
- Access to a DSRI project (`oc project my-project`)
- A GitHub Personal Access Token (classic) - see below

## Create a GitHub Personal Access Token

:::caution
Use a **classic token**. Fine-grained tokens are not supported by the runner chart.
:::

1. Go to https://github.com/settings/tokens
2. Click **Generate new token → Generate new token (classic)**
3. Give it a meaningful name (e.g. `DSRI Runner my-project`)
4. Select the following scopes:
   - ✅ `repo`
   - ✅ `workflow`
   - ✅ `admin:org` - only if deploying for a GitHub organization
5. Click **Generate token** and copy it immediately

## Install the Helm chart

```bash
helm repo add openshift-actions-runner https://redhat-actions.github.io/openshift-actions-runner-chart
helm repo update
```

## Deploy a Runner

Make sure you are in the correct DSRI project before deploying:

```bash
oc project my-project
```

There are two types of runners: one for a **specific repository**, or one for an entire **GitHub organization**. Choose the one that fits your use case.

### For a repository

Deploy a runner that only picks up jobs from one specific GitHub repository.

**1. Set your credentials and repository details:**

```bash
export GITHUB_PAT="TOKEN"
export GITHUB_OWNER=your-github-username
export GITHUB_REPO=your-repo-name
```

**2. Deploy the runner:**

```bash
helm install actions-runner openshift-actions-runner/actions-runner \
    --set-string githubPat=$GITHUB_PAT \
    --set-string githubOwner=$GITHUB_OWNER \
    --set-string githubRepository=$GITHUB_REPO \
    --set runnerLabels="{ dsri, $GITHUB_OWNER }"
```

**3. Verify the deployment:**

```bash
oc get pods
helm get manifest actions-runner | oc get -f -
```

The pod should show `1/1 Running`. Then confirm the runner registered on GitHub:

Go to `https://github.com/<your-username>/<your-repo>/settings/actions/runners`. The runner should appear with status **Idle**.

---

### For an organization

Deploy a runner available to all repositories in a GitHub organization. Requires `admin:org` scope on your PAT.

**1. Set your credentials and organization name:**

```bash
export GITHUB_PAT="TOKEN"
export GITHUB_OWNER=My-Org
```

**2. Deploy the runner:**

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

**3. Verify the deployment:**

```bash
oc get pods
helm get manifest actions-runner | oc get -f -
```

Then confirm the runners registered on GitHub by going to your organization's **Settings** → **Actions** → **Runners**. You should see 3 runners listed with status **Idle**.

> See [all available parameters](https://github.com/redhat-actions/openshift-actions-runner-chart/blob/main/values.yaml) for further customization.

---

## Use the runner in a workflow

In your repository, create a workflow file under `.github/workflows/` and set `runs-on` to target your DSRI runner:

```yaml
jobs:
  your-job:
    runs-on: ["self-hosted", "dsri", "your-github-username-or-org"]
    steps:
      - name: Hello from DSRI
        run: echo "Running on DSRI!"
```

## Uninstall the runner

```bash
helm uninstall actions-runner
```

## See also

- GitHub runner chart repository: https://github.com/redhat-actions/openshift-actions-runner-chart
- Runner image: https://github.com/redhat-actions/openshift-actions-runner