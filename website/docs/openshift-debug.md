---
id: openshift-debug
title: Debug an application
---

## Debug an application deployment

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

:::info Get help

If you cannot figure out the issue by yourself:

1. **Gather relevant informations to help the DSRI team** to solve your issue: URL to the faulty application, which error was shown in the **Events** tab? Or in the **Logs** tab?
2. Seek help on the `#helpdesk` DSRI Slack channel
3. Checkout if an issue have already been created for this problem, or create a new one: [https://github.com/MaastrichtU-IDS/dsri-documentation/issues](https://github.com/MaastrichtU-IDS/dsri-documentation/issues)

:::

## Monitor your application resources use

Check the CPU and memory usage

1. Go to your application terminal, and run:

   ```bash
   top
   ```

2. Check the number of Cpu(s) used at the top:

   > %Cpu(s):  **3,3** us,

3. Check the memory usage with the `used` column:

   > MiB Mem : **515543.2** total,   **403486.8** free,  **98612.0** used,  **13444.5** buff/cache

## Known issues

### DockerHub pull limitations

:::warning Spot the issue

If the **Events** tab show this error:

```
--> Scaling filebrowser-case-1 to 1
error: update acceptor rejected filebrowser-case-1: pods for rc 'case-law-explorer/filebrowser-case-1' took longer than 600 seconds to become available
```

Then check for the application ImageStream in **Build** > **Images**, and you might see this for your application image:

```
Internal error occurred: toomanyrequests: You have reached your pull rate limit. 
You may increase the limit by authenticating and upgrading: https://www.docker.com/increase-rate-limit.
```

:::

The easiest way to solve this issue is to publish the DockerHub image to the GitHub Container Registry.

:::info Adapt the instructions

Just change `filebrowser/filebrowser:v2.11.0` to your image ID and tag on DockerHub

:::

1. [Login to the GitHub Container Registry](https://maastrichtu-ids.github.io/dsri-documentation/docs/guide-publish-image#login-to-github-container-registry) with `docker login`.

2. pull the docker image from 

    ```bash
    docker pull filebrowser/filebrowser:v2.11.0
    ```

3. change its tag

    ```bash
    docker tag filebrowser/filebrowser:v2.11.0 ghcr.io/maastrichu-ids/filebrowser:v2.11.10
    ```

4. Push it back to the GitHub Container Registry:

    ```bash
    docker push ghcr.io/maastrichu-ids/filebrowser:v2.11.10
    ```

:::tip

If the image does not exist, GitHub will create automatically when you push it for the first time! You can then head to your organization **Packages** tab to see the package.

:::

:::caution Update the image

You will need to update the image if you want access to the latest version, you can set a GitHub Actions workflow to do so.

:::