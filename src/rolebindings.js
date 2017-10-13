import {endpoints, Requester, schemas} from './resources';

class RoleBindings {
  constructor(host, token) {
    this.request = new Requester(host, token);
    this.endpoint = endpoints;
    this.schema = schemas;
  }

  async get(namespace) {
    try {
      const url = this.endpoint.get('RoleBinding', {namespace});
      const result = await this.request.get(url);
      return result;
    } catch (e) {
      return e;
    }
  }

  async add(namespace, rolebinding) {
    try {
      const url = this.endpoint.get('RoleBinding', {namespace});
      const json = this.schema.get('RoleBinding', rolebinding);
      const result = await this.request.post(url, json);
      return result;
    } catch (e) {
      return e;
    }
  }

  async update(namespace, rolebinding) {
    try {
      let url = this.endpoint.get('RoleBinding', {namespace});
      url += `/${rolebinding.roleRefName}`;
      const json = this.schema.get('RoleBinding', rolebinding);
      const result = await this.request.put(url, json);
      return result;
    } catch (e) {
      return e;
    }
  }

  async remove(namespace, name) {
    try {
      let url = this.endpoint.get('RoleBinding', {namespace});
      url += `/${name}`;
      const result = await this.request.delete(url);
      return result;
    } catch (e) {
      return e;
    }
  }
}

export default RoleBindings;
