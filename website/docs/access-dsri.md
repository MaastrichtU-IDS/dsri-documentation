---
id: access-dsri
title: Access the DSRI
---

## Request an account

1. You will need to have an account at Maastricht University with an email ending with `@maastrichtuniversity.nl` or `@student.maastrichtuniversity.nl`.

2. Request access to the DSRI for your account Please fill this [form 📬](/register) to provide us some information on what you plan to do with the DSRI. Once you fill the form, you will receive an email with detailed instructions on how to log in.


## Connect to the UM network

You need to be connected to the UM network to access the DSRI.

**🐧 On Linux**: use `openconnect` to connect to the UM VPN. You can easily install it on Ubuntu and Debian distributions with `apt`:

```bash
sudo apt install openconnect
sudo openconnect -u YOUR.USER --authgroup 01-Employees vpn.maastrichtuniversity.nl
```

**🍎 On MacOS and Windows**: download and install the **Maastricht University VPN** client available at **[vpn.maastrichtuniversity.nl](https://vpn.maastrichtuniversity.nl/)**


<details><summary>⚠️ If your are a <b>student</b> you will need to request access to the UM VPN first</summary>

<ul>
<li>You can try to use the Athena Student Desktop at <a href="https://athenadesktop.maastrichtuniversity.nl">athenadesktop.maastrichtuniversity.nl</a>, to access the VPN through a virtual desktop</li>
<li>Or ask one of your teachers to request VPN access for you. You will need to send an email to the IT helpdesk of your department with the following informations: </li>
<ul>
<li>Email of the student who will get VPN</li>
<li> for which course (provide the course ID) or project does the student need the VPN</li>
<li>until which date the student will need the VPN.</li>
</ul>
</ul>
</details>


## Access the web UI

Access the DSRI web UI at **[https://console-openshift-console.apps.dsri2.unimaas.nl](https://console-openshift-console.apps.dsri2.unimaas.nl)**

:::info Password

Use your general UM password.

:::

If you do not have access to the DSRI [contact us](mailto:dsri-support-l@maastrichtuniversity.nl).

You will be able to login at **[https://console-openshift-console.apps.dsri2.unimaas.nl](https://console-openshift-console.apps.dsri2.unimaas.nl)** either using:

* The **prefix of your UM email address** with the first letter capitalized, e.g. `Firstname.Lastname` or `F.Lastname`
* Or your **employee number** at Maastricht University (a.k.a. P number), e.g. `P7000000`

<img src="/img/screenshot_login_screen.png" alt="Login screen" style={{maxWidth: '100%', maxHeight: '100%'}} />

:::info Command line interface

We recommend you to install the `oc` command line interface to perform additional operations on your applications, such as loading large amount of data using `oc cp`, or deploying an application from a local `Dockerfile`.

:::

## Access your project

In the DSRI OpenShift web UI, applications are deployed in projects.

1. Create a new project with a meaningful name describing what you are doing, such as `workspace-yourname`.

2. Go to your project (applications are deployed in a project).

:::caution Reuse your project

Only create new projects when it is necessary (for a new project). You can easily [clean up your current project](https://maastrichtu-ids.github.io/dsri-documentation/docs/project-management#delete-a-project-using-the-web-ui) instead of creating a new one every time you want to try something.

:::

<img src="/img/screenshot_go_to_project.png" alt="Login screen" style={{maxWidth: '100%', maxHeight: '100%'}} />

:::info Access permissions for developers to your project

You can use the **Project** view in the **Developer** perspective to grant or revoke access permissions to your project collaborators. For More Info: [Access permissions for developers to your project](https://maastrichtu-ids.github.io/dsri-documentation/docs/project-management/#access-permissions-for-developers-to-your-project)

:::

## About the web UI

Developers can use the web console to **visualize**, **browse**, and **manage** the contents of projects in new version of OKD4. 

The [OpenShift Container Platform web console](https://docs.openshift.com/container-platform/4.6/web_console/odc-about-developer-perspective.html) provides two perspectives; 

* the **Administrator** perspective 
* the **Developer** perspective.

The Developer perspective provides workflows specific to developer use cases, such as the ability to:

* Create and deploy applications on OpenShift Container Platform by importing existing codebases, images, and dockerfiles.

* Visually interact with applications, components, and services associated with them within a project and monitor their deployment and build status.

* Group components within an application and connect the components within and across applications.

### Accessing the Developer perspective

You can access the **Developer** perspective from the web console as follows:

1. Log in to the OpenShift Container Platform web console using your login credentials. 

   * The default view for the OpenShift Container Platform web console is the **Administrator** perspective.

2. Use the perspective switcher to switch to the **Developer** perspective. The **Topology** view with a list of all the projects in your cluster is displayed.

   <img src="/img/screenshot_developer_perspective.png" alt="Developer Perspective" style={{maxWidth: '100%', maxHeight: '100%'}} />

3. Select an existing project from the list or use the **Project** drop-down list to create a new project.

:::info

If you have no workloads or applications in the project, the **Topology** view displays the available options to create applications. If you have existing workloads, the **Topology** view graphically displays your workload nodes.

:::

<img src="/img/screenshot_topology_view.png" alt="Topology View" style={{maxWidth: '100%', maxHeight: '100%'}} />