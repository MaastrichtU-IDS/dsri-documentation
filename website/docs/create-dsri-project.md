---
id: project-management
title: Create a new Project
---

## Create a project using the web UI

:::caution Avoid creating multiple projects

Try to avoid to create multiple projects for nothing please. Be responsible and delete applications you are not using anymore in your project to free resources, instead of creating a new project with a different number at the end.

It is also easier to connect your different applications containers and storages when you create them in the same project.

:::

You can create a project using the **Developer** perspective, as follows:

1. Click the **Project** drop-down menu to see a list of all available projects. Select **Create Project**.

2. In the **Create Project** dialog box, enter a unique name in the **Name** field. Use a short and meaningful name for your project as the project identifier is unique across all projects, such as `workspace-yourname` or `ml-covid-pathways`

3. Add the **Display Name** ` DSR Workshop`and **Description** ` DSRI Community Workshop Projects`details for the project.

4. Click **Create**.

5. Use the left navigation panel to navigate to the **Project** view and see the dashboard for your project.

<img src="/img/screenshot_create_project.png" alt="Create Project" style={{maxWidth: '100%', maxHeight: '100%'}} />


6. Optional:

   - Use the **Project** drop-down menu at the top of the screen and select **all projects** to list all of the projects in your cluster.
   - Use the **Details** tab to see the project details.
   - If you have adequate permissions for a project, you can use the **Project Access** tab to provide or revoke *administrator*, *edit*, and *view* privileges for the project.

## Create a project using the CLI

You need to be logged in to the DSRI and [copy the login command](https://maastrichtu-ids.github.io/dsri-documentation/docs/openshift-install#login-in-the-terminal-with-oc).

* Run

  ```bash
  oc new-project <project_name> --description="<description>" --display-name="<display_name>"
  ```
  
* Example

  ```bash
  oc new-project dsri-workshop --description="DSRI Workshop" \
      --display-name="DSRI Community Workshop Projects"
  ```

:::caution Reuse your project

Only create new projects when it is necessary (for a new project). You can easily [clean up your current project](https://maastrichtu-ids.github.io/dsri-documentation/docs/project-management#delete-a-project-using-the-web-ui) instead of creating a new one every time you want to try something.

:::

## Access permissions for developers to your project

You can use the **Project** view in the **Developer** perspective to grant or revoke access permissions to your project.

To add users to your project and provide **Admin**, **Edit**, or **View** access to them:

1. In the **Developer** perspective, navigate to the **Project** view.

2. In the **Project** page, select the **Project Access** tab.

3. Click **Add Access** to add a new row of permissions to the default ones.

 <img src="/img/screenshot_project_access.png" alt="Project Access" style={{maxWidth: '100%', maxHeight: '100%'}} />


4. Enter the user name, click the **Select a role** drop-down list, and select an appropriate role.

5. Click **Save** to add the new permissions.

You can also use:

- The **Select a role** drop-down list, to modify the access permissions of an existing user.

- The **Remove Access** icon, to completely remove the access permissions of an existing user to the project.

:::info 

  Advanced role-based access control is managed in the **Roles** and **Roles Binding** views in the **Administrator** perspective

::: 

## Delete a project using the web UI

1. Navigate to **Home** → **Projects**.

2. Locate the project that you want to delete from the list of projects.

3. On the far right side of the project listing, select **Delete Project** from the Options menu ![kebab](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAjCAIAAADqn+bCAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA+0lEQVRIie2WMQqEMBBFJ47gUXRBLyBYqbUXULCx9CR2XsAb6AlUEM9kpckW7obdZhwWYWHXX/3i8TPJZEKEUgpOlXFu3JX4V4kmB2qaZhgGKSUiZlkWxzEBC84N9zxv27bdO47Tti0Bs3at4wBgXVca/lJnfN/XPggCGmadIwAsywIAiGhZFk1ydy2EYJKgGCqK4vZUVVU0zKpxnmftp2mi4S/1GhG1N82DMWNNYVmW4zgqpRAxTVMa5t4evlg11nXd9/1eY57nSZIQMKtG13WllLu3bbvrOgJmdUbHwfur8Xniqw6Hh5UYRdGDNowwDA+WvP4UV+JPJ94B1gKUWcTOCT0AAAAASUVORK5CYII=).

4. When the **Delete Project** pane opens, enter the name of the project that you want to delete in the field.

5. Click **Delete**.

  <img src="/img/screenshot_delete_project.png" alt="Delete Project" style={{maxWidth: '100%', maxHeight: '100%'}} />


## Delete a project using the CLI

:::caution Delete Project

When you delete a project, the server updates the project status to **Terminating** from **Active**. Then, the server clears all content from a project that is in the **Terminating** state before finally removing the project. While a project is in **Terminating** status, you cannot add new content to the project. Projects can be deleted from the CLI or the web console.

:::

You need to be logged in to the DSRI and [copy the login command](https://maastrichtu-ids.github.io/dsri-documentation/docs/openshift-install#login-in-the-terminal-with-oc).

* Run

  ```bash
  oc delete project <project_name>
  ```

  

* Example

  ```bash
  oc delete project dsri-workshop
  ```

  

