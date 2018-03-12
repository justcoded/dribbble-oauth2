const AbstractApi = require('./abstract');

module.exports = class ShotsApi extends AbstractApi {
  getAll() {
    return this.request(this.methods.get, `user/shots`);
  }

  get(id) {
    return this.request(this.methods.get, `shots/${id}`);
  }

  create(settings) {
    return this.request(this.methods.post, `shots`, settings);
  }

  update(id, settings) {
    return this.request(this.methods.put, `shots/${id}`, settings);
  }

  delete(id) {
    return this.request(this.methods.delete, `shots/${id}`);
  }
};