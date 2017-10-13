import {endpoints, Requester, schemas} from './resources';

class Limits {
  constructor(host, token) {
    this.request = new Requester(host, token);
    this.endpoint = endpoints;
    this.schema = schemas;
  }

  async add(namespace, limit) {
    try {
      const url = this.endpoint.get('LimitRange', {namespace});
      const json = this.schema.get('LimitRange', limit);
      const result = await this.request.post(url, json);
      return result;
    } catch (e) {
      return e;
    }
  }

  async update(namespace, limit) {
    try {
      let url = this.endpoint.get('LimitRange', {namespace});
      url += `/${limit.name}`;
      const json = this.schema.get('LimitRange', limit);
      const result = await this.request.put(url, json);
      return result;
    } catch (e) {
      return e;
    }
  }

  async remove(namespace, name) {
    try {
      let url = this.endpoint.get('LimitRange', {namespace});
      url += `/${name}`;
      const result = await this.request.delete(url);
      return result;
    } catch (e) {
      return e;
    }
  }
}

export default Limits;
