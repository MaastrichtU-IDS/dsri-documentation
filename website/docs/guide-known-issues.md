---
id: guide-known-issues
title: Known Issues
---

:::warning

⚠️ remote: HTTP Basic: Access denied fatal: Authentication failed for

:::

> It happen every time when we forced to change the Windows password.
>
> <img class="screenshot" src="/dsri-documentation/img/authentication-issue.png" style={{zoom: '100%', maxHeight: '500px', maxWidth: '500px'}} />
> 

1. Apply command from cmd **(run as administrator)**

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