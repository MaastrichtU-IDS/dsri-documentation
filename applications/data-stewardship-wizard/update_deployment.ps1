oc project data-stewardship-wizard
Start-Sleep -s 10
# oc delete all,secret,configmaps,serviceaccount,rolebinding --selector app=data-stewardship-wizard
oc delete all,secret --selector app=data-stewardship-wizard
Start-Sleep -s 10
oc apply -f template-data-stewardship-wizard.yml
Start-Sleep -s 10
oc new-app data-stewardship-wizard -p APPLICATION_NAME=data-stewardship-wizard