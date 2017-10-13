import {endpoints, Requester, schemas} from './resources';

class Resources {
  constructor(host, token) {
    this.request = new Requester(host, token);
    this.endpoint = endpoints;
    this.schema = schemas;
  }

  async getAll(namespace, resourceKind) {
    try {
      const url = this.endpoint.get(resourceKind, {namespace});
      const result = await this.request.get(url);
      return result;
    } catch (e) {
      return e;
    }
  }

  async get(namespace, resource) {
    try {
      let url = this.endpoint.get(resource.kind, {namespace});
      url += `/${resource.metadata.name}`;
      const result = await this.request.get(url);
      return result;
    } catch (e) {
      return e;
    }
  }

  async add(namespace, resource) {
    try {
      const url = this.endpoint.get(resource.kind, {namespace});
      const result = await this.request.post(url, resource);
      return result;
    } catch (e) {
      return e;
    }
  }

  async update(namespace, resource) {
    try {
      let url = this.endpoint.get(resource.kind, {namespace});
      url += `/${resource.metadata.name}`;
      const result = await this.request.put(url, resource);
      return result;
    } catch (e) {
      return e;
    }
  }

  async remove(namespace, resource) {
    try {
      let url = this.endpoint.get(resource.kind, {namespace});
      url += `/${resource.metadata.name}`;
      const result = await this.request.delete(url);
      return result;
    } catch (e) {
      return e;
    }
  }
}

export default Resources;
