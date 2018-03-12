const AbstractApi = require('./abstract');

module.exports = class ProjectApi extends AbstractApi {
  getAll() {
    return this.request(this.methods.get, `user/projects`);
  }

  create(settings) {
    return this.request(this.methods.post, `projects`, settings);
  }

  update(id, settings) {
    return this.request(this.methods.put, `projects/${id}`, settings);
  }

  delete(id) {
    return this.request(this.methods.delete, `projects/${id}`);
  }
};