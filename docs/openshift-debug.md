---
id: openshift-debug
title: Debug an application
---

If your application is facing issues when deployed:

1. If the pod is not building, or not deploying properly, take a look at the **Events** tab of the deployment. It shows a log of all events faced by the deployment (assign to node, pull image, build, etc).

<img src="/dsri-documentation/img/screenshot_debug_event.png" alt="Filter templates catalog" style="max-width: 100%; max-height: 100%;" />

> You can also check the `Monitoring` page in the left side menu to see all events in a project, or use the terminal:
>
> ```bash
> oc get events
> ```

2. When a pod is running you can check its logs in the **Logs** tab ( after going to the pod page).