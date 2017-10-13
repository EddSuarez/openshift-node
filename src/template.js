import {endpoints, Requester, schemas} from './resources';

class Template {
  constructor(host, token) {
    this.request = new Requester(host, token);
    this.endpoint = endpoints;
    this.schema = schemas;
  }

  async process(template) {
    try {
      const url = this.endpoint.get('Template', { });
      const result = await this.request.post(url, template);
      return result;
    } catch (e) {
      return e;
    }
  }
}

export default Template;
