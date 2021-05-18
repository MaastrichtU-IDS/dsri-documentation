#!/bin/bash

# The CellProfiler template is in the templates/ folder

# Make sure you are in the right project
oc project cellprofiler

# Get the ID of the CellProfiler pod
export POD_ID=$(oc get pod --selector app=cellprofiler --no-headers -o=custom-columns=NAME:.metadata.name)
echo $POD_ID

# Copy the required folders and files to the pod on the DSRI
oc cp workflow_folder $POD_ID:/usr/local/src/work

# Run the workflow uploaded at the previous step
oc exec $POD_ID -- cellprofiler --help
 
# oc exec $POD_ID -- cellprofiler --run
# oc exec $POD_ID -- cellprofiler --run-headless
