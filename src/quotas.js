import {endpoints, Requester, schemas} from './resources';

class Quotas {
  constructor(host, token) {
    this.request = new Requester(host, token);
    this.endpoint = endpoints;
    this.schema = schemas;
  }

  async add(namespace, quota) {
    try {
      const url = this.endpoint.get('ResourceQuota', {namespace});
      const json = this.schema.get('ResourceQuota', quota);
      const result = await this.request.post(url, json);
      return result;
    } catch (e) {
      return e;
    }
  }

  async update(namespace, quota) {
    try {
      let url = this.endpoint.get('ResourceQuota', {namespace});
      url += `/${quota.name}`;
      const json = this.schema.get('ResourceQuota', quota);
      const result = await this.request.put(url, json);
      return result;
    } catch (e) {
      return e;
    }
  }

  async remove(namespace, name) {
    try {
      let url = this.endpoint.get('ResourceQuota', {namespace});
      url += `/${name}`;
      const result = await this.request.delete(url);
      return result;
    } catch (e) {
      return e;
    }
  }
}

export default Quotas;
