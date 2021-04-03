https://ds-wizard.org

https://github.com/ds-wizard

Template to deploy on DSRI in `template-data-stewardship-wizard.yml`

Check the project `data-stewardship-wizard`

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

See `template-data-stewardship-wizard.yml` for the **ConfigMap** Object definition

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

