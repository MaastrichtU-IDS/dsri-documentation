First, obtain gitlab runner registration token via the gitlab webinterface

TODO: add screenshot

Add "GitLab Runner" operator to your project from the Operators --> OperatorHub page. 
Make sure you choose the "certified" GitLab Runner (v1.4.0) The community runner (v1.10.0) is a bit more up to date, but currently does not work.

Install in a specific namespace on the cluster. Choose your namespace in the dropdown.

Create registration token secret:

```yaml
---
apiVersion: v1
kind: Secret
metadata:
  name: gitlab-runner-secret
type: Opaque
stringData:
  runner-registration-token: <insert your registration token>
```

```
oc create -f gitlab-runner-secret.yaml
```

Although, this should also work:
```
oc create secret generic gitlab-runner-secret --from-literal=runner-registration-token=<insert your registration token>
```

Add the following to the ConfigMap of the GitLab Runner operator:
``` yaml
[[runners]]
    executor = "kubernetes"
    [runners.kubernetes]
        [runners.kubernetes.volumes]
            [[runners.kubernetes.volumes.empty_dir]]
                name = "empty-dir"
                mount_path = "/"
                medium = "Memory"
```
Create the configmap:
```
oc create configmap custom-config-toml --from-file config.toml=/tmp/customconfig   
```

Create the gitlab runner Custom Resource Definition:
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
```

```yaml
--- other stuff dont use!
apiVersion: apps.gitlab.com/v1beta2
kind: Runner
metadata:
 name: gitlab-runner
spec:
 gitlabUrl: https://gitlab.maastrichtuniversity.nl
 buildImage: alpine
 token: gitlab-runner-secret
 tags: openshift
```