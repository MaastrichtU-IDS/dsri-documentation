---
id: operators
title: Install from Operators
---

The [Operator Framework](https://operatorframework.io/)  is an open source toolkit to manage Kubernetes native applications, called Operators, in an effective, automated, and scalable way.

:::tip Use existing Operators

You can explore published Operators at https://operatorhub.io

:::

## Install existing Operators

:::info Contact us

Contact us on the DSRI Slack **#helpdesk** channel, if you want to install a new Operator on the DSRI.

:::

## Build Operators

Install the `operator-sdk` tool. See the [official documentation](https://sdk.operatorframework.io/docs/installation/).

Operators can be built using 3 different approaches:

* **Helm**: simpler to define, but less capabilities.
* **Ansible**: simple to define, with great capabilities.
* **Golang**: harder to define, with great capabilities.

### See examples

* More complex deployment: https://github.com/microcks/microcks-ansible-operator/blob/master/roles/microcks/tasks/main.yml

* Older OpenShift guide: https://docs.openshift.com/container-platform/4.1/applications/operator_sdk/osdk-ansible.html

* Simple older example with route: https://github.com/djzager/ansible-role-hello-world-k8s