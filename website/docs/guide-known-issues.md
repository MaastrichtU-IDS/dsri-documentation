---
id: guide-known-issues
title: Known Issues
---

## Cannot access your data in the persistent folder

Sometimes you cannot access anymore the data you put in the persistent folder of your container. It can be due to a node going down, if the persistent volume your pod is connected to is on this node, then it cannot access it anymore.

You can easily fix this issue by restarting the pod of your application, it will make it properly connect to resources on nodes that are up.

To restart the pod, go in topology, click on your application, go to the details tab, and decrease the pod count to 0, then put it back up to 1.

## Large volumes

:::warning Pod or Deployment will not start
You could run into a following message in the **Events** tab that looks similar to this

```
Error: kubelet may be retrying requests that are timing out in CRI-O due to system load. Currently at stage container volume configuration: context deadline exceeded: error reserving ctr name
```

:::

The issue above will occur if you are using a **large persistent volume**. It can be resolved by adding the following to your Deployment(Config):
```
spec:
  template:
    metadata:
      annotations:
        io.kubernetes.cri-o.TrySkipVolumeSELinuxLabel: 'true'
    spec:
      runtimeClassName: selinux
```
Take note of the **indentation** and the place in the file!

An example of this can be found here:
<img class="screenshot" src="/img/screenshot_large_volume_issue.png" alt="Storage" style={{zoom: '100%', maxHeight: '500px', maxWidth: '500px'}} />

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
oc create secret docker-registry dockerhub-login --docker-server=docker.io --docker-username=dockerhub_username --docker-password=dockerhub_password --docker-email=example@mail.com
```

Linking the login secret to the default service account:

```bash
oc secrets link default dockerhub-login --for=pull
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
git@github.com:MaastrichtU-IDS/dsri-documentation.gitgit@github.com:MaastrichtU-IDS/dsri-documentation.gitgit@github.com:MaastrichtU-IDS/dsri-documentation.git
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

## How to run function within a container ''in the background'

:::warning Spot the issue

If the **Events** tab show this error:

```
--> cd /usr/local/src/work2/aerius-sample-sequencing/CD4K4ANXX

Trinity --seqType fq --max_memory 100G --CPU 64 --samples_file samples.txt --output /usr/local/src/work2/Trinity_output_zip_090221
error: The function starts but at some points just exits without warnings or errors to Windows folder
```

```
DSRI in the container's terminal keep running fine but never finishes. At some point a red label ''disconnected'' appears and the terminal stops and the analysis never continues.
```

:::

Those two issues are due to the process running attach to the terminal

Should be able to easily run it using the "Bash way": add `nohup` at the beginning and `&` at the end
It will run in the back and all output that should have gone to the terminal will go to a file `nohup.out` in the repo

```
nohup Trinity --seqType fq --max_memory 100G --CPU 64 --samples_file samples.txt --output /usr/local/src/work2/Trinity_output_zip_090221 &
```

To check if it is still running:

```
ps aux | grep Trinity
```

Be careful make sure the terminal uses bash and not shell ("sh")

To use bash just type bash in the terminal:

```
bash
```

## Git authentication issue

:::warning

⚠️ remote: HTTP Basic: Access denied fatal: Authentication failed for

:::

> It happen every time when we forced to change the Windows password.
>
> <img class="screenshot" src="/img/authentication-issue.png" style={{zoom: '100%', maxHeight: '500px', maxWidth: '500px'}} />
>
> <img class="screenshot" src="/img/git-authentication-issue.png" style={{zoom: '100%', maxHeight: '500px', maxWidth: '500px'}} />

1. Apply command from powershell **(run as administrator)**

   **`git config --system --unset credential.helper`**

2. And then remove **gitconfig** file from **C:\Program Files\Git\mingw64/etc/** location (Note: this path will be different in MAC like "/Users/username")

3. After that use git command like **`git pull` or `git push`**, it asked me for username and password. applying valid username and password and git command working.

##### Windows:

1. Go to Windows **Credential Manager**. This is done in a EN-US Windows by pressing the Windows Key and typing 'credential'. In other localized Windows variants you need to use the localized term.

<img class="screenshot" src="/img/windows-credentials.png" alt="Windows Credentials" style={{zoom: '100%', maxHeight: '500px', maxWidth: '500px'}} />

   *alternatively* you can use the shortcut `control /name Microsoft.CredentialManager` in the run dialog (WIN+R)

2. Edit the git entry under Windows Credentials, replacing old password with the new one.

##### Mac:

1. cmd+space and type "KeyChain Access",

2. You should find a key with the name like "gitlab.*.com Access Key for user". You can order by date modified to find it more easily.

<img class="screenshot" src="/img/Mac-git-autentication.png" alt="Mac GIT Autentication" style={{zoom: '100%', maxHeight: '500px', maxWidth: '500px'}} />

3. Right click and delete.

---
## Filebrowser 403 forbidden

:::warning Spot the issue

If you get 403 forbidden issue while try to upload folders / files or creating new folder / file

```
403 forbidden
```

:::

<img class="screenshot" src="/img/forbidden-issue.png" alt="Forbidden Issue" style={{zoom: '100%', maxHeight: '500px', maxWidth: '500px'}} />

Above issue will occur if you are not using the **persistent storage**.

A persistent storage can be created by the RCS team for a persistent storage of the data. [Contact the RCS team](http://localhost:3000/dsri-documentation/help) to request a persistent storage.

You can find the persistent storage name as below

<img class="screenshot" src="/img/persistent_storage.png" alt="Storage" style={{zoom: '100%', maxHeight: '500px', maxWidth: '500px'}} />
