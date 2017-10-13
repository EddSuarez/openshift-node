const get = (template, params) => {
  const resources = {
    Projects: `/oapi/v1/projects/${params.namespace}`,
    ProjectRequest: '/oapi/v1/projectrequests',
    RoleBinding: `/oapi/v1/namespaces/${params.namespace}/rolebindings`,
    Template: '/oapi/v1/processedtemplates',
    Service: `/api/v1/namespaces/${params.namespace}/services`,
    Route: `/oapi/v1/namespaces/${params.namespace}/routes`,
    ImageStream: `/oapi/v1/namespaces/${params.namespace}/imagestreams`,
    BuildConfig: `/oapi/v1/namespaces/${params.namespace}/buildconfigs`,
    DeploymentConfig: `/oapi/v1/namespaces/${params.namespace}/deploymentconfigs`,
    Secret: `/api/v1/namespaces/${params.namespace}/secrets`,
    Pod: `/api/v1/namespaces/${params.namespace}/pods`,
    Scale: `/oapi/v1/namespaces/${params.namespace}/deploymentconfigs/${params.deployment}/scale`,
    ServiceAccount: `/api/v1/namespaces/${params.namespace}/serviceaccounts`,
    PersistentVolumeClaim: `/api/v1/namespaces/${params.namespace}/persistentvolumeclaims`,
    ResourceQuota: `/api/v1/namespaces/${params.namespace}/resourcequotas`,
    LimitRange: `/api/v1/namespaces/${params.namespace}/limitranges`,
    Endpoints: `/api/v1/namespaces/${params.namespace}/endpoints`,
    Users: `/oapi/v1/users/${params.email}`
  };
  return resources[template];
};

export default {get};
