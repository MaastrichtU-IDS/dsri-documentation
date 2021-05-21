[Report bug](https://ds-wizard.org/contact.html) by email [info@ds-wizard.org](mailto:info@ds-wizard.org)

Or GitHub https://github.com/ds-wizard/ds-wizard/issues

## Bug report 

**Describe the bug**
We are trying to deploy the Data Stewardship Wizard on a Kubernetes cluster using the existing docker images and docker instructions, mostly from https://github.com/ds-wizard/dsw-deployment-example and https://docs.ds-wizard.org/en/latest/admin/installation.html#public-instances 

**How to reproduce**
Steps to reproduce the problem:

1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**DS Wizard deployment:**
 - Instance [e.g. demo.ds-wizard.org, local, or our custom]
 - Browser [e.g. chrome, safari] (inc. version, if relevant)

In case of your own instance, describe the setup, i.e., if you are using Docker or build DSW from source, what version are you using, etc.

**Additional context**
Add any other context about the problem here.

## Some details

https://ds-wizard.org

https://github.com/ds-wizard

Contact: https://ds-wizard.org/contact.html

Template to deploy on DSRI in `template-data-stewardship-wizard.yml`

Check the project `data-stewardship-wizard`

Docs to deploy our own public Wizard:

* https://docs.ds-wizard.org/en/latest/admin/installation.html#public-instances

> See also: old docs to deploy rabbitmq on OpenShift: https://stackoverflow.com/questions/45569931/how-to-correctly-setup-rabbitmq-on-openshift

## Data Wizard config

https://docs.ds-wizard.org/en/latest/

https://docs.ds-wizard.org/en/latest/admin/installation.html#default-users

Data Wizard server require a config file, use a ConfigMap:

```
"Config load failed"
"Server can't load 'engine-wizard/config/application.yml'. Maybe the file is missing or not well-formatted"
GeneralServerError "AesonException \"Error in $.general.serviceToken: expected String, but encountered Null\""
```

https://github.com/ds-wizard/dsw-deployment-example/blob/master/server/application.yml

See `template-data-stewardship-wizard.yml` for the **ConfigMap** Object definition+

Then mount the ConfigMap where the `application.yml` should be in the **Server pod**:

```yaml
	    volumeMounts:
            - name: config
              mountPath: "engine-wizard/config/application.yml"
      volumes:
        - name: config
          configMap:
            name: "${APPLICATION_NAME}-cfg"
            defaultMode: 420
```

ConfigMap used:

```yaml
TODO
```

### RabbitMQ setup

https://www.rabbitmq.com/kubernetes/operator/install-operator.html#openshift

Error: `Failed to create thread: Resource temporarily unavailable (11)`

* Create the SCC at the cluster level

```bash
oc apply -f rabbitmq-scc.yml
```

You can see it in the cluster this way:

```bash
oc edit scc rabbitmq-cluster
```

* Fix the SCC of the project

Create service account and add SCC in the project:

```bash
oc create sa rabbitmq -n data-stewardship-wizard
oc adm policy add-scc-to-user rabbitmq-cluster system:serviceaccount:data-stewardship-wizard:rabbitmq
```

* Fix the service account of the RabbitMQ pod

```yaml
spec:
	serviceAccountName: rabbitmq
```

