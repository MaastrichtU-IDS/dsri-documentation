---
id: operators
title: Installing from Operators
---

The [Operator Framework](https://operatorframework.io/)  is an open source toolkit to manage Kubernetes native applications, called Operators, in an effective, automated, and scalable way.

:::tip Use existing Operators

You can explore published Operators at https://operatorhub.io

:::

## Install existing Operators

:::info Contact us

Contact us using the [Topdesk Form ](https://servicedesk.icts.maastrichtuniversity.nl/tas/public/ssp/content/serviceflow?unid=1ffa93e9ecd94d938ad46e3cb24c2392), if you want to install a new Operator on the DSRI.

:::

## Build Operators

Install the `operator-sdk` tool. See the [official documentation](https://sdk.operatorframework.io/docs/installation/).

Operators can be built using 3 different approaches:

* **Helm**: a framework to define the deployment logic based on regular kubernetes YAML, but less capabilities for complete auto-update and insights. 
* **Ansible**: define the deployment logic with Ansible, provide maximum capabilities.
* **Golang**: define the deployment logic in Golang, provide maximum capabilities, but require more code.

### External resources

Documentation:

* [Official docs](https://sdk.operatorframework.io) to build Operators
  * Official docs to build Operator from Helm charts: https://sdk.operatorframework.io/docs/building-operators/helm/tutorial
  * Official docs to build Operator with Ansible: https://sdk.operatorframework.io/docs/building-operators/ansible/quickstart
* RedHat Certified Operator guide
  * Make an operator use `anyuid`: https://redhat-connect.gitbook.io/certified-operator-guide/what-if-ive-already-published-a-community-operator/applying-security-context-constraints
  * Submit community Operators: https://redhat-connect.gitbook.io/certified-operator-guide/troubleshooting-and-resources/submitting-a-community-operator-to-operatorhub.io

Examples:

* Deployment example: https://github.com/microcks/microcks-ansible-operator/blob/master/roles/microcks/tasks/main.yml

* Older OpenShift guide: https://docs.openshift.com/container-platform/4.1/applications/operator_sdk/osdk-ansible.html

* Simple older example with route: https://github.com/djzager/ansible-role-hello-world-k8s