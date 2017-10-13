# openshift-node
> NodeJs library for Openshift origin v3


## Install

```
npm install --save openshift-node
```

## Usage

You need a secret token from some service account with cluster privileges.

```javascript
const Openshift = require('openshift-node');
const api = new Openshift('OPENSHIFT_HOST', 'OPENSHIFT_API_TOKEN');

...
const project = await api.projects.get('edd');
console.log(project.body); // { "kind": "Project", "apiVersion": "v1" ... }
...

}
```

## Functions 

### Resources 
- **resource.getAll(namespace, resourceKind)**
- **resource.get(namespace, resourceObject)**
- **resource.add(namespace, resourceObject)**
- **resource.update(namespace, resourceObject)**
- **resource.remove(namespace, resourceObject)** 

### Projects
- **projects.get(namespace)**
- **projects.add(project)** - [Project object](#project-object)
- **projects.remove(namespace)** 

### RoleBindings
- **rolebindings.get(namespace)**
- **rolebindings.add(project)** - [Rolebinding object](#rolebinding-object)
- **rolebindings.update(project)** - [Rolebinding object](#rolebinding-object)
- **rolebindings.remove(namespace, rolebindingName)** 

### Limits
- **limits.add(project)** - [Limit object](#limit-object)
- **limits.update(project)** - [Limit object](#limit-object)
- **limits.remove(namespace, limitName)** 

### Quotas
- **quotas.add(project)** - [Quota object](#quota-object)
- **quotas.update(project)** - [Quota object](#quota-object)
- **quotas.remove(namespace, quotaName)** 

### Pods
- **pods.get(namespace)**
- **pods.scale(project)** - [Scale object](#scale-object)

### Templates
- **template.process(templateObject)**

#### Project object
```JSON
{
 "name": "-",
 "description": "-",
 "displayName": "-"
}
```

#### Rolebinding object
```JSON
{
 "name": "-",
 "userNames": [],
 "subjects": [],
 "rolRefName": "-"
}
```

#### Limit object
```JSON
{
 "name": "-",
 "specs": {}
}
```

#### Quota object
```JSON
{
 "name": "-",
 "specs": {}
}
```

#### Scale object
```JSON
{
 "deployment": "-",
 "namespace": "-",
 "replicas": 0
}
```

## License

See the [LICENSE](https://github.com/eddsuarez/node-openshift/blob/master/LICENSE) file for license rights and limitations (MIT).

Contributing
------------

If you'd like to suggest an improvement, please raise an issue to discuss it before making your pull request.
Pull requests for bugs are more than welcome - please explain the bug you're trying to fix in the message.

