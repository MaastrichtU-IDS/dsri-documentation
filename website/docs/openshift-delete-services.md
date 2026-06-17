---
id: openshift-delete-services
title: Deleting an Application
---

It is recommended to use the `oc` CLI to delete an application, as it will properly remove all objects related to the deployment.

:::caution

Make sure you are connected to the right project before deleting anything:

```bash
oc project my-project
```

:::

## From the terminal

Delete all objects related to your application by providing the application name:

```bash
oc delete all,secret,configmaps,serviceaccount,rolebinding --selector app=my-application
```

:::info Force deletion

If objects are not deleting properly, you can force the deletion:

```bash
oc delete all,secret,configmaps,serviceaccount,rolebinding --force --grace-period=0 --selector app=my-application
```

:::

## From the web UI

If you cannot use the `oc` CLI, you can manually delete the objects created by the application from the **Topology** view:

1. Delete the **Route**
2. Delete the **Service**
3. Delete the **Deployment**