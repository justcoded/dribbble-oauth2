const AbstractApi = require('./abstract');

module.exports = class UserApi extends AbstractApi {
  get() {
    return this.request(this.methods.get, 'user');
  }
};