---
id: best-practices
title: Best Practices
---

<details><summary>⚠️ If This list of <b>best practices</b> revolves all around making safe and efficient use of DSRI.</summary></details>

:::info 

Accept that any resource is temporary. Be prepared to start a new working environment, eventually.

Clean up old resources like services, routes, secrets and deployments regularly.

You can create multiple projects for difference researh tracks.

Being prepared will make this easy. But it will also make your research more reproducible!

:::

### Configuration

**If you spend hours or even days on setting up your working environment, make sure that the setup is reproducible. This is a small investment of time compared to starting over the hard way.**

* When setting up your environment, use single terminal-commands for experimenting only. Keep your setup-commands in shell scripts or Ansible playbooks. You will need them again.
* Keep track of your configuration-files and setup-scripts. A version control system like git is a great way to enable yourself to start a new workspace at any time.

### Code

* Keep track of your code development. This should go without saying, but again, git is your best friend. Do not be intimidated by the power and versatility of this tool. Keep the usage as simple as you can and decide together with your team-mates how you want to use it.

### Storage

* If in doubt: do add an [persistent volume](/docs/openshift-storage) to your application. Put your data there and it will still be there when your pod get restarted.
* Make sure that you can restore the data from elsewhere if something should go wrong. (It rarely does, but still ...)