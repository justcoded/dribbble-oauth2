const axios = require('axios');

module.exports = (method, requestUrl, params) => {
  if (method === 'get') {
    return axios[method](requestUrl, {
      params
    });
  }
  return axios[method](requestUrl, params);
};