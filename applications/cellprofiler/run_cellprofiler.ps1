$workflowToRun = $args[0]

run_cellprofiler.ps1 U:\N.Roumans\Toposcreens\Topo_YAP\Nadia_YAP_1h_1

# The CellProfiler template is in the templates/ folder

# Make sure you are in the right project
oc project cellprofiler

# Get the ID of the CellProfiler pod
$POD_ID = (oc get pod --selector app=cellprofiler --no-headers -o=custom-columns=NAME:.metadata.name); 
echo $POD_ID

# Copy the required folders and files to the pod on the DSRI
oc cp $workflowToRun $POD_ID:/usr/local/src/work


# Run the workflow uploaded at the previous step
oc exec $POD_ID -- cellprofiler --help

# oc exec $POD_ID -- cellprofiler --run
oc exec $POD_ID -- cellprofiler --run-headless --pipeline /usr/local/src/work/Analysis --image-directory /usr/local/src/work/TIF --output-directory /usr/local/src/work/Analysis

## Get the output back (a spreadsheet)
# oc cp $POD_ID:/usr/local/src/work/output .