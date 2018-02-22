const AbstractApi = require('./abstract');

module.exports = class ProjectApi extends AbstractApi {
  getAll() {
    return this.request('get', `user/projects`);
  }

  create(settings) {
    return this.request('post', `projects`, settings);
  }

  update(id, settings) {
    return this.request('put', `projects/${id}`, settings);
  }

  delete(id) {
    return this.request('delete', `projects/${id}`);
  }
};