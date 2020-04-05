---
id: openshift-delete-services
title: Delete services
---

[![OpenShift](/dsri-documentation/img/openshift-logo.png)](https://www.openshift.com/)

Connect to your project

```shell
oc project my-project
```

## Delete deployed service

Delete all objects related to a deployment using a selector

```shell
oc delete all --selector app=my-deployment

# Force deletion
oc delete all --force --grace-period=0 --selector app=my-deployment
```

---

## Delete pod

Get the ID of the specific pod you want to delete

```shell
oc get pod

# Use the ID obtained 
oc delete pod --force --grace-period=0 <pod_id>
```

---

## Fix stuck service

If the provisioned service is stuck on `Marked for deletion` you might need to set finalizers to null in the YAML:

```shell
oc get serviceinstance
oc edit serviceinstance <service_instance_id>

# Delete the following lines in metadata:
finalizers: null 	# add null
  - kubernetes-incubator/service-catalog   # Delete this line
```
