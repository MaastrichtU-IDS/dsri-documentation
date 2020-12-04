---
id: openshift-debug
title: Debug an application
---

If your application is facing issues when deployed:

1. If the pod is not building, or not deploying properly, take a look at the **Events** tab of the deployment. It shows a log of all events faced by the deployment (assign to node, pull image, build, etc).

<img src="/dsri-documentation/img/screenshot_debug_event.png" alt="Filter templates catalog" style={{maxWidth: '100%', maxHeight: '100%'}} />

:::tip Various ways to check the events

You can also check the `Monitoring` page in the left side menu to see all events in a project.

Or use the terminal:

```bash
oc get events
```

:::

2. When a pod is running you can check its logs in the **Logs** tab ( after going to the pod page).

:::info

If you cannot figure out the issue by yourself:

1. **Gather relevant informations to help the DSRI team** to solve your issue: URL to the faulty application, which error was shown in the **Events** tab? Or in the **Logs** tab?
2. Seek help on the `#helpdesk` DSRI Slack channel
3. Checkout if an issue have already been created for this problem, or create a new one: [https://github.com/MaastrichtU-IDS/dsri-documentation/issues](https://github.com/MaastrichtU-IDS/dsri-documentation/issues)

:::