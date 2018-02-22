const request = require('../request');
const API_BASE = 'https://api.dribbble.com/v2';

module.exports = class AbstractApi {
  constructor(token) {
    this.accessToken = token;
  }

  request(method, path, params) {
    return request(method, `${API_BASE}/${path}?access_token=${this.accessToken}`, params);
  }
};