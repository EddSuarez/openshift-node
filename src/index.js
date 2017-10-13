import Projects from './projects';
import Quotas from './quotas';
import Limits from './limits';
import RoleBindings from './rolebindings';
import Pods from './pods';
import Resource from './resource';
import Template from './template';

class Openshift {
  constructor(host, token) {
    this.projects = new Projects(host, token);
    this.quotas = new Quotas(host, token);
    this.limits = new Limits(host, token);
    this.rolebindings = new RoleBindings(host, token);
    this.pods = new Pods(host, token);
    this.template = new Template(host, token);
    this.resource = new Resource(host, token);
  }
}

export default Openshift;
