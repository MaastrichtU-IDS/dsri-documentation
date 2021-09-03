Official Volcano tutorial: https://volcano.sh/en/docs/tutorials/

Examples of jobs: https://github.com/volcano-sh/volcano/tree/master/example

Start queue:

```bash
oc create -f queue.yaml
```

Start job:

```bash
oc create -f vcjob.yaml
```

More docs:

* On queue: https://github.com/volcano-sh/volcano/blob/master/docs/design/queue/queue-state-management.md

## Check jobs

Check job:

```bash
oc get vcjob job-1 -oyaml
```

Describe job:

```bash
oc describe vcjob job-1
```

Check job group:

```bash
oc get podgroup job-1 -oyaml
```

Check queue:

```bash
oc get queue test -oyaml

-o jsonpath="{range .items[*]}{.metadata.namespace}{' : '}{.spec.hard['requests\.nvidia\.com/gpu']}{'\n'}{end}"
```

## Delete queue

https://volcano.sh/en/docs/queue/

Not working

```bash
oc patch queue test --patch '{"status":{"state": "closed"}}'
```

```bash
oc delete -f queue.yaml
```

