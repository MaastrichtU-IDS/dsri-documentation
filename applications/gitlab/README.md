Install with Helm: https://docs.gitlab.com/runner/install/kubernetes.html

Add the GitLab Helm repository:

```bash
helm repo add gitlab https://charts.gitlab.io
```

Once you [have configured](https://docs.gitlab.com/runner/install/kubernetes.html#configuring-gitlab-runner-using-the-helm-chart) GitLab Runner in your `values.yaml` file, run the following:

```bash
helm install --namespace test-vincent gitlab-runner -f values.yaml gitlab/gitlab-runner
```