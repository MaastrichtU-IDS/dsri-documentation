---
id: argo-commands
title: Argo commands
---

![Argo project](/dsri-documentation/img/argo-logo.png)



## Argo commands

### List running Argo workflows

```shell
argo list
```

### Stop a workflow

```shell
argo terminate my-workflow
```

> This might not stop the workflow, in this case use `argo delete`

### Delete a workflow

```shell
argo delete my-workflow
```
