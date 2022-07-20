import datetime
import os

from kubernetes import client
from openshift.dynamic import DynamicClient
from openshift.helper.userpassauth import OCPLoginConfiguration


def log(msg)-> None:
    msg = '[' + str(datetime.now().strftime("%Y-%m-%dT%H:%M:%S")) + '] ' + str(msg)
    print(msg)


# https://github.com/openshift/openshift-restclient-python
def oc_login():
    cluster_user = os.getenv('CLUSTER_USER')
    cluster_password = os.getenv('CLUSTER_PASSWORD')
    cluster_url = 'https://api.dsri2.unimaas.nl:6443'
    # os.system(f"oc login {cluster_url} --insecure-skip-tls-verify -u {cluster_user} -p {cluster_password}")

    kubeConfig = OCPLoginConfiguration(ocp_username=cluster_user, ocp_password=cluster_password)
    kubeConfig.host = cluster_url
    kubeConfig.verify_ssl = False
    # kubeConfig.ssl_ca_cert = '/app/dsri.pem' # use a certificate bundle for the TLS validation
    
    # Retrieve the auth token
    kubeConfig.get_token()
    # print('Auth token: {0}'.format(kubeConfig.api_key))
    # print('Token expires: {0}'.format(kubeConfig.api_key_expires))
    
    k8s_client = client.ApiClient(kubeConfig)
    dyn_client = DynamicClient(k8s_client)

    return dyn_client, k8s_client, kubeConfig
