---
id: workflows-gitlab-runner
title: Deploy GitLab Runners
---

Deploy a GitLab Runner on the DSRI to run your GitLab CI/CD pipeline jobs on the DSRI.

## Why use a DSRI GitLab runner?

- Run larger workloads with more CPU and memory than GitLab shared runners
- Jobs run directly on DSRI infrastructure using the Kubernetes executor
- Define your pipeline in a simple `.gitlab-ci.yml` file in your repository
- Use any Docker image as your job environment
- Integrate with your existing GitLab repositories at [gitlab.maastrichtuniversity.nl](https://gitlab.maastrichtuniversity.nl/)

For more information about GitLab CI/CD, go to https://docs.gitlab.com/ee/ci/

## Prerequisites

:::info Request access first

Before deploying a GitLab runner, contact us via the [Topdesk Form](https://servicedesk.icts.maastrichtuniversity.nl/tas/public/ssp/content/serviceflow?unid=1ffa93e9ecd94d938ad46e3cb24c2392) or by emailing the [RCS](mailto:dsri-support-l@maastrichtuniversity.nl) team. 

:::

- Access to a DSRI project (`oc project my-project`)
- Access to a GitLab project on [gitlab.maastrichtuniversity.nl](https://gitlab.maastrichtuniversity.nl)

## Get a GitLab Runner token

1. Go to your GitLab project on [gitlab.maastrichtuniversity.nl](https://gitlab.maastrichtuniversity.nl)
2. Navigate to **Settings → CI/CD** and expand **Runners**

:::caution CI/CD must be enabled

If you don't see the CI/CD option in Settings, go to **Settings → General → Visibility, project features, permissions** and enable **CI/CD pipelines**.

:::

3. Click **"New project runner"**
4. Add the tag `openshift`
5. Click **Create runner**
6. Copy the token (it starts with `glrt-`)

## Deploy the runner

Make sure you are in the correct project:

```bash
oc project my-project
```

### Step 1 — Create the token secret

```bash
oc create secret generic gitlab-runner-secret \
    --from-literal=runner-token=<your-glrt-token>
```

### Step 2 — Create the runner configuration

Create a file called `config.toml`:

```toml
[[runners]]
    executor = "kubernetes"
    [runners.kubernetes]
        [runners.kubernetes.volumes]
            [[runners.kubernetes.volumes.empty_dir]]
                name = "empty-dir"
                mount_path = "/"
                medium = "Memory"
```

Create a ConfigMap from it:

```bash
oc create configmap custom-config-toml --from-file config.toml=config.toml
```

### Step 3 — Create the GitLab Runner resource

Create a file called `gitlab-runner.yaml`:

```yaml
apiVersion: apps.gitlab.com/v1beta2
kind: Runner
metadata:
  name: gitlab-runner
spec:
  gitlabUrl: https://gitlab.maastrichtuniversity.nl
  token: gitlab-runner-secret
  config: custom-config-toml
  tags: openshift
  serviceAccount: gitlab-runner-jobs
```

Apply it:

```bash
oc create -f gitlab-runner.yaml
```

### Step 4 — Verify the deployment

```bash
oc get pods
oc get runner
```

You should see the runner pod running. Then confirm the runner registered on GitLab by going to **Settings → CI/CD → Runners** in your GitLab project. The runner should appear with status **Online**.

## Use the runner in a pipeline

In your GitLab repository, create a `.gitlab-ci.yml` file and set `tags` to target your DSRI runner. Here is a simple example to verify your runner is working:

```yaml
stages:
  - test

test-dsri-runner:
  stage: test
  image: alpine
  tags:
    - openshift
  script:
    - echo "Runner is working on DSRI!"
```

:::tip

Always specify an `image` in your job. The runner requires a Docker image to run jobs in. If no image is specified the job will fail.

:::

Commit the file and GitLab will automatically trigger a pipeline. Go to **CI/CD → Pipelines** in your project to monitor the job. Once confirmed working, replace the example script with your own commands.

## Clean up

To remove the runner:

```bash
oc delete -f gitlab-runner.yaml
oc delete configmap custom-config-toml
oc delete secret gitlab-runner-secret
```

To uninstall the operator, go to **Operators → Installed Operators** in the DSRI web console, find the GitLab Runner operator and click **Uninstall**.

## See also

- GitLab Runner operator documentation: https://docs.gitlab.com/runner/install/operator.html
- GitLab CI/CD documentation: https://docs.gitlab.com/ee/ci/
- GitLab CI/CD keyword reference: https://docs.gitlab.com/ee/ci/yaml/