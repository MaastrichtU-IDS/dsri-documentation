---
id: access-dsri
title: Access the DSRI
---

## Request an account

1. You will need to have an account at Maastricht University with an email ending with `@maastrichtuniversity.nl` or `@student.maastrichtuniversity.nl`.

2. Request access to the DSRI for your account  [to the DSRI support team 📬](mailto:dsri-support-l@maastrichtuniversity.nl).


## Connect to the UM network

You need to be connected to the UM network to access the DSRI.

* Use the **Maastricht University VPN** at **[vpn.maastrichtuniversity.nl](https://vpn.maastrichtuniversity.nl/)**
* Connect to **UMnet** or **eduroam** WiFi at Maastricht University
* For **students**, use the Athena Student Desktop at [athenadesktop.maastrichtuniversity.nl](https://athenadesktop.maastrichtuniversity.nl)

* For **Linux**, use `openconnect` to connect to the UM VPN:

  ```bash
  sudo apt install openconnect
  sudo openconnect -u YOUR.USER --authgroup 01-Employees vpn-rw1.maastrichtuniversity.nl
  ```

  > Provide your UM password when prompted.

## Access the web UI

Access the DSRI web UI at **[https://console-openshift-console.apps.dsri2.unimaas.nl](https://console-openshift-console.apps.dsri2.unimaas.nl)**

:::info Password

Use your general UM password.

:::

If you do not have access to the DSRI [contact us](mailto:dsri-support-l@maastrichtuniversity.nl).

You will be able to login at **[https://console-openshift-console.apps.dsri2.unimaas.nl](https://console-openshift-console.apps.dsri2.unimaas.nl)** either using:

* The **prefix of your UM email address** with the first letter capitalized, e.g. `Firstname.Lastname` or `F.Lastname`
* Or your **employee number** at Maastricht University (a.k.a. P number), e.g. `P7000000`

<img src="/dsri-documentation/img/screenshot_login_screen.png" alt="Login screen" style={{maxWidth: '100%', maxHeight: '100%'}} />

:::info Command line interface

We recommend you to install the `oc` command line interface to perform additional operations on your applications, such as loading large amount of data using `oc cp`, or deploying an application from a local `Dockerfile`.

:::

## Access your project

In the DSRI OpenShift web UI, applications are deployed in projects.

1. Create a new project with a meaningful name describing what you are doing, such as "retail-behavior-analysis".

2. Go to your project (applications are deployed in a project).

:::caution Reuse your project

Only create new projects when it is necessary (for a new project). You can easily clean up your current project instead of creating a new one every time you want to try something.

:::

<!--

<img src="/dsri-documentation/img/screenshot_go_to_project.png" alt="Login screen" style={{maxWidth: '100%', maxHeight: '100%'}} />

-->

## Access permissions for developers to your project

You can use the **Project** view in the **Developer** perspective to grant or revoke access permissions to your project.

To add users to your project and provide **Admin**, **Edit**, or **View** access to them:

1. In the **Developer** perspective, navigate to the **Project** view.

2. In the **Project** page, select the **Project Access** tab.

3. Click **Add Access** to add a new row of permissions to the default ones.

   <img src="/dsri-documentation/img/screenshot_project_access.png" alt="Project Access" style={{maxWidth: '100%', maxHeight: '100%'}} />

4. Enter the user name, click the **Select a role** drop-down list, and select an appropriate role.

5. Click **Save** to add the new permissions.

You can also use:

- The **Select a role** drop-down list, to modify the access permissions of an existing user.

- The **Remove Access** icon, to completely remove the access permissions of an existing user to the project.

:::info 

  Advanced role-based access control is managed in the **Roles** and **Roles Binding** views in the **Administrator** perspective

:::

  