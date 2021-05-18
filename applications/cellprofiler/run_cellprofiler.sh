#!/bin/bash

# This script get the ID of the CellProfiler pod
# Then it copies the required folders and files to the pod on the DSRI
# Then it runs the workflow uploaded at the previous step

# The CellProfiler template is in the templates/ folder

oc project cellprofiler

export POD_ID=$(oc get pod --selector app=cellprofiler --no-headers -o=custom-columns=NAME:.metadata.name)

oc cp workflow_folder $POD_ID:/root

oc exec $POD_ID -- cellprofiler --help

# oc exec $POD_ID -- cellprofiler --run
# oc exec $POD_ID -- cellprofiler --run-headless