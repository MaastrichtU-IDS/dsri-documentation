---
id: okd3-deploy-from-template
title: Quickstart with templates
---

The easiest to get started with the DSRI is to use the predefined templates to deploy an application.

## Access the catalog

1. **Access the templates catalog** in your project:

<img src="/dsri-documentation/img/screenshot_access_catalog.png" alt="Access catalog" style={{maxWidth: '100%', maxHeight: '100%'}} />

2. **Filter the templates catalog** to only see data science applications:

<img src="/dsri-documentation/img/screenshot_filter_templates.png" alt="Filter templates catalog" style={{maxWidth: '100%', maxHeight: '100%'}} />

:::tip Enable more applications in your catalog

You might wonder why do you see less templates in your project? Because templates need to be earned! 🏆 

Get started with deploying, and using a service on the DSRI, then we will be able to give you access to more advanced uses of the DSRI!

:::

## Start an application using a template

:::caution Root permission required

🔒 You will need root containers (aka. anyuid) to have been enabled by the DSRI team to be able to start applications with the root user.

:::

**Click on the template** of the application you want to start, in this example we will use **RStudio**, but you can easily try the same with **VisualStudio Code** and **JupyterLab**.

You can view this 1 minute video to guide you through the process to get the storage name, then to start, and access a RStudio application:

<div className="container">
    <video width="100%" height="100%" autoplay muted loop controls>
        <source src="/dsri-documentation/img/screencast_dsri_deploy_template.webm" type="video/webm"/>
    </video>
</div>


1. Retrieve the name of the storage you are going to use to host your application data

2. Check the informations about the applications you are going to start (such as the path of the persistent storage in the container application, or if this application run as root)

<img src="/dsri-documentation/img/screenshot_template_information.png" alt="Filter templates catalog" style={{maxWidth: '100%', maxHeight: '100%'}} />

2. Provide a few informations to configure your application:

<img src="/dsri-documentation/img/screenshot_template_configuration.png" alt="Filter templates catalog" style={{maxWidth: '100%', maxHeight: '100%'}} />

3. Click on the **Create** button.

:::tip Application started

Your application is starting on the DSRI! Go back to your project **Overview** page to find it! It can take from a few seconds up to a few minutes to deploy 🕐

:::


## Stop your application

When you are not using your application anymore you can stop the pod. If you are using a Dynamic or Persistent storage you can restart the pod and continue working with all your data in the same state as you left it.

:::caution Do not waste resources

Please think of stopping applications you are not using to avoid consuming unnecessary resources.

:::

On the **Overview** page click on the down arrow ⬇️ next to the number of pods deployed.

<img src="/dsri-documentation/img/screenshot_scaledown_pod.png" alt="Scale down pod" style={{maxWidth: '100%', maxHeight: '100%'}} />

You can then restart the pod by clicking the up arrow ⬆️
