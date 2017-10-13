import request from 'request-promise';
import requestDefaults from './requestDefaults';

class Requester {
  constructor(host, token) {
    this.request = request.defaults(requestDefaults(host, token));
  }

  get(url) {
    return this.request.get(url);
  }

  post(url, json) {
    return this.request.post({url, json});
  }

  put(url, json) {
    return this.request.put({url, json});
  }

  delete(url) {
    return this.request.delete(url);
  }
}

export default Requester;
