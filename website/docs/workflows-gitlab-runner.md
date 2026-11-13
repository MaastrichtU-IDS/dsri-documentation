---
id: workflows-gitlab-runner
title: Deploy GitLab Runners
---

Deploy a GitLab Runner on the DSRI to run your GitLab CI/CD pipeline jobs on the DSRI.

## Why use a DSRI GitLab runner?

- Run your CI/CD jobs on DSRI infrastructure, with your own dedicated runner
- Jobs run directly on DSRI using the Kubernetes executor
- Define your pipeline in a simple `.gitlab-ci.yml` file in your repository
- Use any Docker image as your job environment
- Integrate with your existing GitLab repositories at [gitlab.maastrichtuniversity.nl](https://gitlab.maastrichtuniversity.nl/)

For more information about GitLab CI/CD, go to https://docs.gitlab.com/ee/ci/

## Prerequisites

:::info Request access first

Before deploying a GitLab runner, contact us via the [Topdesk Form](https://servicedesk.icts.maastrichtuniversity.nl/tas/public/ssp/content/serviceflow?unid=09acae9cdf454968bc94ad125b1f8e76&from=436967a9-738c-4112-b3f6-240a9847118e&openedFromService=true) or by emailing the [RCS team](mailto:rcs-ub@maastrichtuniversity.nl). We will prepare your DSRI project for a runner and let you know when it's ready.

:::

- Access to a DSRI project 
- Access to a GitLab project on [gitlab.maastrichtuniversity.nl](https://gitlab.maastrichtuniversity.nl)

## Get a GitLab Runner token

1. Go to your GitLab project on [gitlab.maastrichtuniversity.nl](https://gitlab.maastrichtuniversity.nl)
2. Navigate to **Settings → CI/CD** and expand **Runners**

:::caution CI/CD must be enabled

If you don't see the CI/CD option in Settings, go to **Settings → General → Visibility, project features, permissions** and enable **CI/CD pipelines**.

:::

3. Click **Create project runner**
4. Add the tag `openshift`
5. Click **Create runner**
6. Copy the runner authentication token (it starts with `glrt-`). It is only shown once. You can ignore the `gitlab-runner register` instructions on that page, they are not needed on DSRI.

:::caution Keep your token private

Anyone with this token can run jobs as your runner. Only store it in the secret below.

:::

## Deploy the runner

Make sure you are in the correct project:

```bash
oc project my-project
```

### 1. Create the token secret

```bash
oc create secret generic gitlab-runner-secret \
    --from-literal=runner-token=<your-glrt-token>
```

### 2. Create the runner configuration

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

### 3. Create the GitLab Runner resource

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
  serviceaccount: anyuid
  buildImage: alpine
  podSpec:
    - name: resources
      patchType: strategic
      patch: |
        {"containers":[{"name":"runner","resources":{
          "requests":{"cpu":"100m","memory":"128Mi","ephemeral-storage":"1Gi"},
          "limits":{"cpu":"500m","memory":"512Mi","ephemeral-storage":"2Gi"}}}]}
```

:::info

The `podSpec` section sets CPU, memory and storage limits for the runner itself. This is required on DSRI: without it, the runner will not start.

:::

Apply it:

```bash
oc create -f gitlab-runner.yaml
```

### 4. Verify the deployment

```bash
oc get pods
oc get runner
```

You should see the runner pod running. It can take a minute before it shows as ready (`1/1`). Then confirm the runner registered on GitLab by going to **Settings → CI/CD → Runners** in your GitLab project. The runner should appear with status **Online**.

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

- Every job must have the tag `openshift`. Jobs without it will stay pending, because no runner picks them up.
- Set an `image` for each job. If you don't, the job runs in `alpine`, which may not have the tools you need.

:::

Commit the file and GitLab will automatically trigger a pipeline. Go to **Build → Pipelines** in your project to monitor the job. Once confirmed working, replace the example script with your own commands.

## Clean up

To remove the runner:

```bash
oc delete -f gitlab-runner.yaml
oc delete configmap custom-config-toml
oc delete secret gitlab-runner-secret
```

Then also delete the runner in GitLab under **Settings → CI/CD → Runners**.

## See also

- GitLab Runner operator documentation: https://docs.gitlab.com/runner/install/operator.html
- GitLab CI/CD documentation: https://docs.gitlab.com/ee/ci/
- GitLab CI/CD keyword reference: https://docs.gitlab.com/ee/ci/yaml/
