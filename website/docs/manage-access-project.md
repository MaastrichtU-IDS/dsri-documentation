---
id: manage-access-project
title: Managing Access to Your Project
---

## Add or remove users from your project

You can grant or revoke access to your project from the **Project** view in the **Developer** perspective.

To add a user:

1. In the **Developer** perspective, navigate to the **Project** view.
2. Select the **Project Access** tab.
3. Click **Add Access** to add a new row of permissions.
4. Enter the username, click **Select a role**, and choose **Admin**, **Edit**, or **View**.
  - **Admin**: full management rights within the project, including creating, modifying, and viewing resources. Admins can manage role bindings for other users but cannot alter project quotas.
  - **Edit**: can create, modify, and delete most objects within the project, but cannot view or modify role bindings.
  - **View**: read-only access to most objects in the project. Users with this role cannot make any modifications, nor can they view or modify role bindings.
5. Click **Save**.

To modify or remove an existing user, use the **Select a role** dropdown to change their role, or click the **Remove Access** icon to revoke access entirely.

:::info

Advanced role-based access control is managed under **Roles** and **Role Bindings** in the **Administrator** perspective.

:::