import {endpoints, Requester, schemas} from './resources';

class Pods {
  constructor(host, token) {
    this.request = new Requester(host, token);
    this.endpoint = endpoints;
    this.schema = schemas;
  }

  async get(namespace) {
    try {
      const url = this.endpoint.get('Pod', {namespace});
      const result = await this.request.get(url);
      return result;
    } catch (e) {
      return e;
    }
  }

  async scale(namespace, deployment, replicas) {
    try {
      const url = this.endpoint.get('Scale', {namespace, deployment});
      const data = {deployment, namespace, replicas};
      const json = this.schema.get('Scale', data);
      const result = await this.request.put(url, json);
      return result;
    } catch (e) {
      return e;
    }
  }
}

export default Pods;
