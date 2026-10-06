---
id: guide-jobs-on-openshift
title: Guidelines for running jobs
---

Assume you want to run a job 60 times (runs 0 to 59). You don't want 60 separate jobs, because each job creates a pod which leaves a sandbox behind on the node if not deleted. These will pile up in your project and count towards the max number of allowed pods/jobs in your project. 

So instead:

* You put the 60 tasks into 6 indices of 10 runs each.
* Index 0 holds tasks 0–9, index 1 holds 10–19, … etc, index 5 holds 50–59.
* You have one pod per index, so 6 pods in total in this example.
* You set that at most 2 pods may be deployed at the same time.
* In this example we wrote a bash script which will do 10 runs one after another, then the script is finished and the pod is done.
* The job will automatically be deleted 5 minutes after completion (of all 6 pods), while results are saved.

Look at the full yaml file below. Before running it we will go over how it works step-by-step.

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: results
spec:
  accessModes: [ReadWriteMany]
  storageClassName: ocs-storagecluster-cephfs
  resources:
    requests:
      storage: 1Gi
---
apiVersion: batch/v1
kind: Job
metadata:
  name: indexed-test
spec:
  completionMode: Indexed
  completions: 6               # 6 pods × 10 runs = 60 runs
  parallelism: 2
  backoffLimitPerIndex: 2
  maxFailedIndexes: 2
  ttlSecondsAfterFinished: 300 # 5 min after completion, job and pods get deleted.
  template:
    spec:
      restartPolicy: Never
      containers:
      - name: run
        image: registry.access.redhat.com/ubi9/ubi-minimal
        command: ["/bin/bash", "-c"]
        args:
        - |
          set -e
          BATCH=10
          START=$((JOB_COMPLETION_INDEX * BATCH))
          END=$((START + BATCH - 1))
          mkdir -p /results/done /results/logs
          echo "Pod index $JOB_COMPLETION_INDEX: runs $START-$END"
          for i in $(seq $START $END); do
            if [ -f /results/done/$i ]; then
              echo "run $i already done, skipping"; continue
            fi
            # Test retry: run 25 fails the first time
            if [ $i -eq 25 ] && [ ! -f /results/failed-once ]; then
              touch /results/failed-once
              echo "run $i: deliberate failure"; exit 1
            fi
            echo "run $i start" > /results/logs/$i.log
            sleep 2
            echo "run $i done"  >> /results/logs/$i.log
            touch /results/done/$i
            echo "run $i ok"
          done
        resources:
          requests: {cpu: 100m, ephemeral-storage: 256Mi, memory: 64Mi}
          limits:   {cpu: 500m, ephemeral-storage: 1Gi, memory: 64Mi}
        volumeMounts:
        - {name: results, mountPath: /results}
      volumes:
      - name: results
        persistentVolumeClaim: {claimName: results}     
```

### The Job settings

We start with specifying we have an indexed job. In other words, we want to deploy multiple pods through this job.

```yaml
completionMode: Indexed
```

Each pod gets a fixed number (0, 1, 2, …), its index number. This number is placed in the environment variable JOB_COMPLETION_INDEX inside the pod.

There are 6 indices, so the Job is finished once 6 pods (index 0 to 5) have completed successfully.

```yaml
completions: 6
```

At most 2 pods run at the same time. As soon as one finishes, the next index is handed out.

```yaml
parallelism: 2
```

If a pod fails, the Job retries that specific index again, up to 2 times. If more than 2 envelopes fail completely, the whole Job stops.

```yaml
backoffLimitPerIndex: 2
maxFailedIndexes: 2
```

Once all indices are done, the Job waits 5 minutes and then deletes itself along with all its pods. The PVC with results stays.

:::caution

We enforce every job to include `ttlSecondsAfterFinished` to prevent completed jobs and therefore pods piling up in projects!

:::

```yaml
ttlSecondsAfterFinished: 300
```

If the container fails, the same pod is not restarted. The Job creates a fresh pod for that index instead.

```yaml
restartPolicy: Never
```

The PVC results is a shared CephFS folder that all pods mount at `/results`. It is where they write what they have done, so that information survives even after the pods are gone.

### The script, line by line

Stop immediately if any command fails, so the pod ends with an error and the Job knows something went wrong.

```bash
set -e
```

Compute which tasks are in my envelope. For index 2: START = 2 × 10 = 20, END = 20 + 10 − 1 = 29. So this pod does runs 20 to 29.

```bash
BATCH=10
START=$((JOB_COMPLETION_INDEX * BATCH))
END=$((START + BATCH - 1))
```
Create two folders on the shared PVC, if they don't exist yet:
* `done/` gets an empty file per completed run, used as a checkmark.
* `logs/` gets a log file per run.

```bash
mkdir -p /results/done /results/logs
```

Prints which envelope this pod has, so you can see it in oc logs.

```bash
echo "Pod index $JOB_COMPLETION_INDEX: runs $START-$END"
```

Loop over my tasks. seq 20 29 produces 20, 21, …, 29, and i takes each value in turn.

```bash
for i in $(seq $START $END); do
```

Is the checkmark for this run already there? Then it was done in an earlier attempt, so skip it. This makes a retry efficient: it doesn't start over from scratch.

```bash
  if [ -f /results/done/$i ]; then
    echo "run $i already done, skipping"; continue
  fi
```

This exists only for testing. When we reach run 25 and haven't failed before, it leaves a note (failed-once) and stops with an error. On the retry the note exists, so run 25 goes through normally. This lets you see the retry behaviour happen.

```bash
  if [ $i -eq 25 ] && [ ! -f /results/failed-once ]; then
    touch /results/failed-once
    echo "run $i: deliberate failure"; exit 1
  fi
```

We can see that run 25 fails via running the following OC CLI command (this is not in the script but in your terminal!):

```bash
$ oc logs -f -l batch.kubernetes.io/job-completion-index=2 --prefix --tail=-1
[pod/indexed-test-2-zdjvm/run] Pod index 2: runs 20-29
[pod/indexed-test-2-zdjvm/run] run 20 ok
[pod/indexed-test-2-zdjvm/run] run 21 ok
[pod/indexed-test-2-zdjvm/run] run 22 ok
[pod/indexed-test-2-zdjvm/run] run 23 ok
[pod/indexed-test-2-zdjvm/run] run 24 ok
[pod/indexed-test-2-zdjvm/run] run 25: deliberate failure
```

This is the actual "work", which here is simulated with 2 seconds of waiting. In a real workload you would put something like python `run.py --run-id $i > /results/logs/$i.log 2>&1` here.

```bash
  echo "run $i start" > /results/logs/$i.log
  sleep 2
  echo "run $i done"  >> /results/logs/$i.log
```

Place the checkmark for this run and move on to the next one. After the last run, the loop ends, the script ends successfully, and the pod gets status Completed.

```bash
  touch /results/done/$i
  echo "run $i ok"
done
```

In conclusion, we have two things here that enables us run our script 60 times. We have the indices, 0-5, 6 in total. And in each pod (index) we run the script 10 times. This jobs only deploys 6 pods which in the end gives you 60 results. This is more effictive compared to running 60 separate jobs. Additionally the job is removed automatically after finishing, which cleans up your project, while your results are saved for later.

### Running the test job

To start the job in your namespace run the following OC CLI command from your terminal:

```bash
oc apply -f indexed-test.yml -n <namespace>
```

Follow along:

```bash
oc get job indexed-test -w
```

and:

```bash
oc get pods -l job-name=indexed-test -w
```

You can verify the number of 60 completed runs through counting the files created in the `/results/done` and `/results/logs` directories.

This OC CLI command will create a temporary pod, which connects to the PVC to count the number of files in the `/results/done` and `/results/logs` directories. After that the pod is automatically deleted.

```bash
oc run check --rm -it --restart=Never --image=registry.access.redhat.com/ubi9/ubi-minimal \
  --overrides='{"spec":{"containers":[{"name":"check","image":"registry.access.redhat.com/ubi9/ubi-minimal","command":["sh","-c","ls /results/done | wc -l; echo ---; ls /results/logs | wc -l"],"resources":{"requests":{"cpu":"100m","ephemeral-storage":"128Mi","memory":"64Mi"},"limits":{"cpu":"500m","ephemeral-storage":"256Mi","memory":"64Mi"}},"volumeMounts":[{"name":"r","mountPath":"/results"}]}],"volumes":[{"name":"r","persistentVolumeClaim":{"claimName":"results"}}]}}'
  ```