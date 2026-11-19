import logging

from api.config import settings
from kubernetes import client
from kubernetes.dynamic import DynamicClient

# Instantiate logging utility
log = logging.getLogger("uvicorn.error")
log.propagate = False
log.setLevel(logging.INFO)
console_handler = logging.StreamHandler()
formatter = logging.Formatter(
    "%(asctime)s %(levelname)s: [%(module)s:%(funcName)s] %(message)s"
)
console_handler.setFormatter(formatter)
log.addHandler(console_handler)


# Login to the OpenShift cluster with a bearer token, using the official kubernetes client
def oc_login() -> DynamicClient:
    """Login to the OpenShift cluster"""
    kube_config = client.Configuration()
    kube_config.host = settings.CLUSTER_URL
    kube_config.api_key = {"authorization": "Bearer " + settings.CLUSTER_API_KEY}
    kube_config.verify_ssl = False

    # Disable proxy for this specific client
    kube_config.proxy = None
    kube_config.proxy_headers = None

    k8s_client = client.ApiClient(kube_config)
    
    return DynamicClient(k8s_client)