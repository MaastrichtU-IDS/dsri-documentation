import logging

from api.config import settings
from kubernetes import client
from openshift.dynamic import DynamicClient
from openshift.helper.userpassauth import OCPLoginConfiguration

## Instantiate logging utility
log = logging.getLogger("uvicorn.error")
log.propagate = False
log.setLevel(logging.INFO)
console_handler = logging.StreamHandler()
formatter = logging.Formatter(
    "%(asctime)s %(levelname)s: [%(module)s:%(funcName)s] %(message)s"
)
console_handler.setFormatter(formatter)
log.addHandler(console_handler)

## Login to the OpenShift cluster using https://github.com/openshift/openshift-restclient-python
def oc_login():
    """Login to the OpenShift cluster"""
    kubeConfig = OCPLoginConfiguration()

    kubeConfig.api_key = {"authorization": "Bearer " + settings.CLUSTER_API_KEY}
    kubeConfig.host = settings.CLUSTER_URL
    kubeConfig.verify_ssl = False

    # Disable proxy for this specific client
    kubeConfig.proxy = None
    kubeConfig.proxy_headers = None

    k8s_client = client.ApiClient(kubeConfig)
    dyn_client = DynamicClient(k8s_client)

    return dyn_client