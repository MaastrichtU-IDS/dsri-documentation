---
id: okd3-openshift-delete-services
title: Delete an application
---



It is recommend to use the `oc` tool to delete an application, as it will allow to properly delete all objects related to the application deployment.

:::caution Project

Make sure you are connected to the right project:

```shell
oc project my-project
```

:::

## From the terminal

The best way to make sure all objects related to your application have been deleted is to use the command line providing your application name:

```shell
oc delete all,secret,configmaps,serviceaccount,rolebinding --selector app=my-application
```

:::info Force deletion

You can force the deletion if the objects are not deleting properly:

```shell
oc delete all,secret,configmaps,serviceaccount,rolebinding --force --grace-period=0 --selector app=my-application
```

:::

## From the web UI

We recommend to use the `oc` CLI to easily delete an application. But in the case you cannot install `oc`  on your computer you can delete the different objects created by the application (easy to find in the **Overview** page):

1. Delete the **Route**
2. Delete the **Service**
3. Delete the **Deployment Config** 

<img src="/dsri-documentation/img/screenshot_delete_application.png" alt="Delete application from the web UI" style={{maxWidth: '100%', maxHeight: '100%'}} />

