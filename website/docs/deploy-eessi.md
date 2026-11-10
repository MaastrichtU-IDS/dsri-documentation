---
id: eessi-software-stack
title: Scientific software with EESSI
---

[EESSI](https://www.eessi.io/docs/) (the European Environment for Scientific Software Installations, pronounced "easy") is a shared, read-only collection of thousands of scientific applications, built and optimised by a collaboration of European HPC centres. On the DSRI it is mounted straight into your pod, so the software is simply there: you load what you need with `module load` and start working.

The software is compiled for several CPU architectures, and the right version for the node your pod lands on is selected automatically. You are not running a generic build.

There are two ways to use it:

* **The EESSI Terminal** — a shell in your browser, for exploring, testing commands and inspecting results.
* **A batch job** — for analyses that run for hours and should not depend on your laptop staying awake.

Best practice on how to use it would be to work out the command in the terminal, then submit the real workload as a job.

## The EESSI Terminal

### Deploy

Search the catalogue in the web UI for `EESSI Terminal` and instantiate the template. 

### Opening the terminal

Get the route URL via the CLI:

```bash
oc get route eessi-terminal -o jsonpath='{.spec.host}{"\n"}'
```

You can also choose to navigate to the route URL via the DSRI console.

### What is in the pod

| Path | What it is |
| --- | --- |
| `/data/persistent` | Your home directory. Lives on CephFS and survives restarts. |
| `/cvmfs/software.eessi.io` | The EESSI software stack. Read-only. |

Everything you want to keep must be under `/home/persistent`. Files written anywhere else are lost when the pod restarts.

:::caution

The terminal is for interactive work. Anything that runs for more than a few minutes belongs in a job, which survives pod restarts and node maintenance. See [running a batch job](#running-a-batch-job) below.

:::

### Finding and loading software

EESSI is already initialised when your shell opens. To see what is available:

```bash
module avail
```

The first time you run this it is slow, because the software catalogue is being fetched and cached on the node. Afterwards it is fast.

The list is long, so search for what you need. For example, search for the `gzip` module:

```bash
module avail gzip
```

Load for example the `GCC` module, and test it:

```bash
module load GCC

gcc --version | head -1
```

Some other useful commands:

```bash
module list             # what you have loaded right now
module unload GCC       # unload specific module
module purge            # unload everything
```

:::caution

`module load` only affects your current shell session. It is not remembered after a restart, and it does not carry over into a job. Put your `module load` lines in your script.

:::

### Your session survives a closed browser

The terminal runs inside a `tmux` session, so closing the tab, dropping off VPN or closing your laptop does not kill what you are running. When you open the terminal again you are reattached to the same session, with your command still running.

The usual tmux keys work:

```
Ctrl-b c      new window
Ctrl-b n      next window
Ctrl-b [      scroll back through output (q to leave scroll mode)
```

:::warning

tmux protects you against losing your connection. It does **not** protect you against the pod being restarted or the node being drained for maintenance, which can happen at any time. Work that takes hours belongs in a job.

:::

## Running a batch job

A job runs without anyone connected to it. It gets its own resources, keeps its logs, and is removed automatically when it finishes. This is the right way to run anything substantial.

Below is a complete job you can copy and adapt. Save it as `eessi-job.yaml`.

```yaml
# Persistent directory for your data and results. It stays when the job is
# deleted. If you already have a workspace, remove this part and point
# claimName further down at your own PVC.
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: eessi-job-pvc
spec:
  accessModes: [ReadWriteMany]
  storageClassName: ocs-storagecluster-cephfs
  resources:
    requests:
      storage: 10Gi
---
apiVersion: batch/v1
kind: Job
metadata:
  name: eessi-job
spec:
  backoffLimit: 1
  ttlSecondsAfterFinished: 86400
  template:
    spec:
      restartPolicy: Never
      containers:
        - name: job
          image: ghcr.io/maastrichtu-library/eessi-terminal:latest
          command: ["/bin/bash", "-c"]
          args:
            - |
              set -eo pipefail

              # unset 'u' flag as it results in abortion of the script due to EESSI's init script.
              # only set it after initializing EESSI.
              set +u
              source /cvmfs/software.eessi.io/versions/2026.06/init/bash
              set -u

              # ----- your work starts here -----------------------------
              echo "Loading module GCC..." 

              module load GCC

              module list

              echo "Creating directory /data/persistent/my-analysis"

              mkdir -p "$HOME/my-analysis"
              cd "$HOME/my-analysis"

              echo "Saving results..." 

              echo "$(date -Is) $(gcc --version | head -1)" >> results.txt

              echo "Finished saving results..." 
              # ----- your work ends here -------------------------------
          env:
            - name: HOME
              value: /data/persistent
            - name: OMP_NUM_THREADS
              value: "8"
          resources:
            requests: {cpu: "8", memory: 16Gi, ephemeral-storage: 1Gi}
            limits:   {cpu: "8", memory: 16Gi, ephemeral-storage: 4Gi}
          securityContext:
            allowPrivilegeEscalation: false
            capabilities:
              drop: [ALL]
          volumeMounts:
            - name: cvmfs
              mountPath: /cvmfs/software.eessi.io
              mountPropagation: HostToContainer
              readOnly: true
            - name: data
              mountPath: /data/persistent
      volumes:
        - name: cvmfs
          ephemeral:
            volumeClaimTemplate:
              spec:
                accessModes: [ReadOnlyMany]
                storageClassName: software-eessi-io
                resources:
                  requests:
                    storage: 1Gi
        - name: data
          persistentVolumeClaim:
            claimName: eessi-workspace
```

### What to change

Three things, in practice.

**Your script.** Everything between the two comment lines. Note that the job starts with a clean shell, so the `module load` lines you used interactively have to be repeated here.

**The resources.** `requests` is what the scheduler reserves for you and `limits` is the ceiling. Exceeding the memory limit kills the job, so give it headroom. Keep `OMP_NUM_THREADS` equal to the CPU limit, otherwise your software will try to use more cores than it has been given and run slower, not faster.

**The workspace.** If you also run the EESSI Terminal, delete the PVC part at the top and set `claimName` to your terminal's home PVC (`eessi-terminal-home` by default). The job then reads and writes the same files you see in the terminal.

### The parts to leave alone

```yaml
              mountPath: /cvmfs/software.eessi.io
```

The software stack must be mounted at exactly this path. EESSI's internal references are absolute, so mounting it anywhere else produces a confusing `EESSI repository ... not found!` error even though the files are clearly there.

```yaml
        - name: cvmfs
          ephemeral:
            volumeClaimTemplate:
```

This is how the pod gets access to EESSI. It is created with the pod and removed with it, so submitting the same job repeatedly leaves nothing behind. Nothing is stored in it: the requested `1Gi` is ignored and is only there to satisfy project policies.

### Submitting and following along

```bash
oc apply -f eessi-job.yaml
```

Watch it:

```bash
oc get job eessi-job -w
```

Follow the output:

```bash
oc logs -f job/eessi-job
```

To run it again, delete the old job first. The name has to be free:

```bash
oc delete job eessi-job
oc apply -f eessi-job.yaml
```

Your results stay in the workspace PVC, so deleting the job does not delete your output.

### Using a GPU

Find out how to [enable](https://dsri.maastrichtuniversity.nl/docs/deploy-on-gpu#enable-the-gpu) a GPU in your project.
CUDA-enabled modules in EESSI are marked with `(gpu)` in the output of `module avail`.

### Running the same analysis many times

If you need to run something tens or hundreds of times, do not submit tens or hundreds of individual jobs. Use an indexed job, which packs several runs into each pod. See [Guidelines for running jobs](https://dsri.maastrichtuniversity.nl/docs/guide-jobs-on-openshift) for how to set that up; combine it with the EESSI volume and image shown above.

## Troubleshooting

**`EESSI repository ... not found!`**

The software stack is mounted at the wrong path. Check that `mountPath` is exactly `/cvmfs/software.eessi.io`.

**`module: command not found`**

The initialisation line is missing from your script, or it ran before the mount was ready. Make sure your script starts with:

```bash
source /cvmfs/software.eessi.io/versions/2026.06/init/bash
```

**`cvmfs transport endpoint is not connected`**

The mount was interrupted, usually after cluster maintenance. Restart your deployment, or resubmit your job:

```bash
oc rollout restart deployment/eessi-terminal
```

**Everything is slow the first time**

Expected. Software is fetched and cached on the node on first use. The second run of the same application is much faster.

**My software is not in EESSI**

Check [the list of available software](https://www.eessi.io/docs/available_software/) first, since the names are not always what you expect. If it genuinely is not there, you can still install your own software into your workspace on top of EESSI, or contact us.

## Getting help

If you have questions about EESSI on the DSRI [contact](https://dsri.maastrichtuniversity.nl/contact) the RCS team.

Questions about the software stack itself, or a request to have an application added: see [EESSI support](https://www.eessi.io/docs/support/).