function quotaOrLimitObject(kind, params) {
  return {
    kind,
    apiVersion: 'v1',
    metadata: {
      name: params.name
    },
    spec: params.specs
  };
}

function projectObject(params) {
  return {
    kind: 'ProjectRequest',
    apiVersion: 'v1',
    description: params.description,
    displayName: params.displayName,
    metadata: {
      name: params.name
    }
  };
}

function rolebindingObject(params) {
  return {
    kind: 'RoleBinding',
    apiVersion: 'v1',
    metadata: {
      name: params.name
    },
    userNames: params.userNames,
    groupNames: null,
    subjects: params.subjects,
    roleRef: {
      name: params.roleRefName
    }
  };
}

function scale(params) {
  return {
    apiVersion: 'extensions/v1beta1',
    kind: 'Scale',
    metadata: {
      name: params.deployment,
      namespace: params.namespace
    },
    spec: {
      replicas: params.replicas
    }
  };
}

const get = (template, params) => {
  const schemas = {
    ResourceQuota: quotaOrLimitObject('ResourceQuota', params),
    LimitRange: quotaOrLimitObject('LimitRange', params),
    Projects: projectObject(params),
    RoleBinding: rolebindingObject(params),
    Scale: scale(params)
  };
  return schemas[template];
};

export default {get};
