oc project data-stewardship-wizard
sleep 10
# oc delete all,secret,configmaps,serviceaccount,rolebinding --selector app=data-stewardship-wizard
oc delete all,secret --selector app=data-stewardship-wizard
oc delete all,secret,template,templateinstance --selector template=data-stewardship-wizard
sleep 10
oc apply -f template-data-stewardship-wizard.yml
sleep 10
oc new-app data-stewardship-wizard -p APPLICATION_NAME=data-stewardship-wizard