---
id: deleting-a-project
title: Deleting a project
---

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