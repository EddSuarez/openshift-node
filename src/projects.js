import {endpoints, Requester, schemas} from './resources';

class Projects {
  constructor(host, token) {
    this.request = new Requester(host, token);
    this.endpoint = endpoints;
    this.schema = schemas;
  }

  async get(namespace) {
    try {
      const url = this.endpoint.get('Projects', {namespace});
      const project = await this.request.get(url);
      return project;
    } catch (e) {
      return e;
    }
  }

  async add(project) {
    try {
      const json = this.schema.get('Projects', project);
      const url = this.endpoint.get('ProjectRequest', {});
      const result = await this.request.post(url, json);
      return result;
    } catch (e) {
      return e;
    }
  }

  async remove(namespace) {
    try {
      const url = this.endpoint.get('Projects', {namespace});
      const project = await this.request.delete(url);
      return project;
    } catch (e) {
      return e;
    }
  }
}

export default Projects;
