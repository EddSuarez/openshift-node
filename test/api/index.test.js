import chai from 'chai';
import Openshift from '../../src';


const nodejsMongoTemplate = require('./nodejs-mongo-ephemeral.json');

const expect = chai.expect;
const token = process.env.OPENSHIFT_API_TOKEN;
const api = new Openshift('https://apps.thedigitalgarage.io:8443', token);

const testProject = {
  name: 'unit-test',
  displayName: 'Unit test',
  description: 'Created by unit test'
};

const limit = {
  name: 'limit-test',
  specs: {
    limits: [
      {
        type: 'Pod',
        max: {
          cpu: '3',
          memory: '11Gi'
        },
        min: {
          cpu: '100m',
          memory: '128Mi'
        }
      }
    ]
  }
};

const quota = {
  name: 'quota-test',
  specs: {
    hard: {
      'limits.cpu': '1',
      'limits.memory': '1Gi'
    },
    scopes: ['Terminating']
  }
};

const rolebinding = {
  name: 'basic-user',
  namespace: 'edd',
  userNames: [
    'eddsuarez+test@bixlabs.com'
  ],
  subjects: [
    {
      kind: 'User',
      name: 'eddsuarez+test@bixlabs.com'
    }
  ],
  roleRefName: 'basic-user'
};

const exampleResource = {
  apiVersion: 'v1',
  kind: 'Secret',
  metadata: {
    name: 'secret-test'
  },
  stringData: {
    user: 'user',
    password: 'pwd'
  }
};

describe('Projects', () => {
  it('should returns object representation of project', async () => {
    const project = await api.projects.get('edd');
    expect(project.statusCode).to.equal(200);
  });

  it('should create/add a new project/workspace', async () => {
    const project = await api.projects.add(testProject);
    expect(project.statusCode).to.equal(201);
  });

  it('should remove/delete the test project/workspace', async () => {
    const project = await api.projects.remove(testProject.name);
    expect(project.statusCode).to.equal(200);
  });
});

describe('Quotas', () => {
  it('should set quotas to project/workspace', async () => {
    const quotas = await api.quotas.add('edd', quota);
    expect(quotas.statusCode).to.equal(201);
  });

  it('should update quota of project/workspace', async () => {
    quota.specs.hard['limits.cpu'] = '2';
    const quotas = await api.quotas.update('edd', quota);
    expect(quotas.statusCode).to.equal(200);
  });

  it('should remove quota to project/workspace', async () => {
    const quotas = await api.quotas.remove('edd', 'quota-test');
    expect(quotas.statusCode).to.equal(200);
  });
});

describe('Limits', () => {
  it('should set limit to project/workspace', async () => {
    const limits = await api.limits.add('edd', limit);
    expect(limits.statusCode).to.equal(201);
  });

  it('should update limit of project/workspace', async () => {
    limit.specs.limits[0].max.cpu = '2';
    const limits = await api.limits.update('edd', limit);
    expect(limits.statusCode).to.equal(200);
  });

  it('should remove limit from project/workspace', async () => {
    const limits = await api.limits.remove('edd', 'limit-test');
    expect(limits.statusCode).to.equal(200);
  });
});

describe('RoleBindings', () => {
  it('should retrieve workspace\'s rolebindings', async () => {
    const rolebindings = await api.rolebindings.get('edd');
    expect(rolebindings.statusCode).to.equal(200);
  });

  it('should create rolebinding', async () => {
    const rolebindings = await api.rolebindings.add('edd', rolebinding);
    expect(rolebindings.statusCode).to.equal(201);
  });

  it('should update rolebinding', async () => {
    const newUser = 'eddsuarez+test2@bixlabs.com';
    rolebinding.userNames.push(newUser);
    rolebinding.subjects.push({kind: 'User', name: newUser});

    const rolebindings = await api.rolebindings.update('edd', rolebinding);
    expect(rolebindings.statusCode).to.equal(200);
  });

  it('should remove rolebindings from project/workspace', async () => {
    const rolebindings = await api.rolebindings.remove('edd', 'basic-user');
    expect(rolebindings.statusCode).to.equal(200);
  });
});

describe('Pods', () => {
  it('should retrieve existing pods from namespace', async () => {
    const pods = await api.pods.get('edd');
    expect(pods.statusCode).to.equal(200);
  });

  it('should scale specific pod from namespace', async () => {
    const pods = await api.pods.scale('edd', 'nodejs-ex', 1);
    expect(pods.statusCode).to.equal(200);
  });
});

describe('Template', () => {
  it('should retrieve processed template', async () => {
    const template = await api.template.process(nodejsMongoTemplate);
    expect(template.statusCode).to.equal(201);
  });
});

describe('Resource', () => {
  it('should retrieve all resources of an specific kind in a namespace', async () => {
    const resource = await api.resource.getAll('edd', 'ServiceAccount');
    expect(resource.statusCode).to.equal(200);
  });

  it('should create given resource', async () => {
    const resource = await api.resource.add('edd', exampleResource);
    expect(resource.statusCode).to.equal(201);
  });

  it('should retrieve one resource in a namespace', async () => {
    const resource = await api.resource.get('edd', exampleResource);
    expect(resource.statusCode).to.equal(200);
  });

  it('should update one resources  in a namespace', async () => {
    exampleResource.stringData.password = 'password';
    const resource = await api.resource.update('edd', exampleResource);
    expect(resource.statusCode).to.equal(200);
  });

  it('should remove one resource in a namespace', async () => {
    const resource = await api.resource.remove('edd', exampleResource);
    expect(resource.statusCode).to.equal(200);
  });
});
