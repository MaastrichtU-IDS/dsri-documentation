---
id: okd3-guide-known-issues
title: Known Issues
---

## DockerHub pull limitations

:::warning Spot the issue

If the **Events** tab show this error:

```
--> Scaling filebrowser-case-1 to 1
error: update acceptor rejected my-app-1: pods for rc 'my-project/my-app-1' took longer than 600 seconds to become available
```

Then check for the application ImageStream in **Build** > **Images**, and you might see this for your application image:

```
Internal error occurred: toomanyrequests: You have reached your pull rate limit. 
You may increase the limit by authenticating and upgrading: https://www.docker.com/increase-rate-limit.
```

:::

You can solve this by creating a secret to login to DockerHub in your project:

```bash
oc -n <project> create secret docker-registry <secret-name> --docker-server=docker.io --docker-username=<dockerhub-username> --docker-password=<dockerhub-password> --docker-email=<email-address>
```

Linking the login secret to the default service account:

```bash
oc secrets link default <secret-name> --for=pull
```

:::tip

Login to DockerHub should raise the limitations

:::

To definitely solve this issue you can publish the DockerHub image to the [GitHub Container Registry](https://docs.github.com/en/packages/guides/about-github-container-registry).

Follow those instructions on your laptop:

1. [Login to the GitHub Container Registry](https://maastrichtu-ids.github.io/dsri-documentation/docs/guide-publish-image#login-to-github-container-registry) with `docker login`.

2. Pull the docker image from 

   ```bash
   docker pull myorg/myimage:latest
   ```

3. Change its tag

   ```bash
   docker tag myorg/myimage:latest ghcr.io/maastrichtu-ids/myimage:latest
   ```

4. Push it back to the GitHub Container Registry:

   ```bash
   docker push ghcr.io/maastrichtu-ids/myimage:latest
   ```

:::tip Image created automatically

If the image does not exist, GitHub will create automatically when you push it for the first time! You can then head to your [organization **Packages** tab](https://github.com/orgs/MaastrichtU-IDS/packages) to see the package.

:::

:::info Make it public

By default new images are set as `Private`, go to your **Package Settings**, and click **Change Visibility** to set it as `Public`, this avoids the need to login to pull the image.

:::

You can update the image if you want access to the latest version, you can set a GitHub Actions workflow to do so.

Finally you will need to update your DSRI deployment, or template, to use the newly created image on `ghcr.io`, and redeploy the application with the new template.

---

## Git authentication issue

:::warning

⚠️ remote: HTTP Basic: Access denied fatal: Authentication failed for

:::

> It happen every time when we forced to change the Windows password.
>
> <img class="screenshot" src="/dsri-documentation/img/authentication-issue.png" style={{zoom: '100%', maxHeight: '500px', maxWidth: '500px'}} />
>
> <img class="screenshot" src="/dsri-documentation/img/git-authentication-issue.png" style={{zoom: '100%', maxHeight: '500px', maxWidth: '500px'}} />

1. Apply command from powershell **(run as administrator)**

   **`git config --system --unset credential.helper`**

2. And then remove **gitconfig** file from **C:\Program Files\Git\mingw64/etc/** location (Note: this path will be different in MAC like "/Users/username")

3. After that use git command like **`git pull` or `git push`**, it asked me for username and password. applying valid username and password and git command working.

##### Windows: 

1. Go to Windows **Credential Manager**. This is done in a EN-US Windows by pressing the Windows Key and typing 'credential'. In other localized Windows variants you need to use the localized term.

<img class="screenshot" src="/dsri-documentation/img/windows-credentials.png" alt="Windows Credentials" style={{zoom: '100%', maxHeight: '500px', maxWidth: '500px'}} />

   *alternatively* you can use the shortcut `control /name Microsoft.CredentialManager` in the run dialog (WIN+R)

2. Edit the git entry under Windows Credentials, replacing old password with the new one.

##### Mac: 

1. cmd+space and type "KeyChain Access",

2. You should find a key with the name like "gitlab.*.com Access Key for user". You can order by date modified to find it more easily.

<img class="screenshot" src="/dsri-documentation/img/Mac-git-autentication.png" alt="Mac GIT Autentication" style={{zoom: '100%', maxHeight: '500px', maxWidth: '500px'}} />

3. Right click and delete.

---
## Filebrowser 403 forbidden

:::warning Spot the issue

If you get 403 forbidden issue while try to upload folders / files or creating new folder / file 

```
403 forbidden 
```

:::

<img class="screenshot" src="/dsri-documentation/img/forbidden-issue.png" alt="Forbidden Issue" style={{zoom: '100%', maxHeight: '500px', maxWidth: '500px'}} />

Above issue will occur if you are not using the **persistent storage**.

A persistent storage can be created by the DSRI team for a persistent storage of the data. [Contact the DSRI team](http://localhost:3000/dsri-documentation/help) to request a persistent storage.

You can find the persistent storage name as below

<img class="screenshot" src="/dsri-documentation/img/storage.png" alt="Storage" style={{zoom: '100%', maxHeight: '500px', maxWidth: '500px'}} />