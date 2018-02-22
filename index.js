const DOMAIN = 'https://dribbble.com';
const TOKEN_URL = DOMAIN + '/oauth/token';
const request = require('./request');
let dribbleInstance;

const apiFactory = require('./api/index');

module.exports = (settings) => {
  if (!dribbleInstance && settings) {
    dribbleInstance = new Dribble(settings);
    return dribbleInstance
  } else {
    return dribbleInstance;
  }
};

class Dribble {
  constructor(settings) {
    if (!settings || typeof settings !== 'object') {
      throw new Error('miss settings or settings must be an object');
    }

    if (settings['client_id'] && settings['client_secret']) {
      this.clientId = settings['client_id'];
      this.clientSecret = settings['client_secret']; // return instance
    } else if (settings['access_token']) {
      this.accessToken = settings['access_token']
    }

    this._api = null;
  }

  authorize(redirectUrl, scope = 'public') {
    if (!redirectUrl || typeof redirectUrl !== 'string') {
      throw new Error('Redirect Url not found or invalid Redirect Url');
    } else if (!this.clientId) {
      throw new Error('Please set your client Id');
    }

    return `${DOMAIN}/oauth/authorize?client_id=${this.clientId}&redirect_uri=${redirectUrl}&scope=${scope}`;
  }

  async getAccessToken(code) {
    if (!code || typeof code !== 'string') {
      throw new Error('code not found or invalid code');
    }

    this.code = code;
    try {
      const {data} = await request('post', TOKEN_URL, {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        code: code
      });

      this.setAccessToken(data.access_token);
      this.tokenType = data.token_type;
      this.scope = data.scope;
      this.createdAt = data.created_at;

      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;

    this._api = apiFactory(accessToken);
  }

  sendRequest(method, incomeUrl, params) {
    if (!params) {
      params = {
        access_token: this.accessToken
      }
    }
    if (!params.access_token) {
      params.access_token = this.accessToken;
    }
    return request(method, incomeUrl, params)
  }

  get api() {
    if (!this._api) {
      throw new Error('API is not initialized, apply access token before api requests');
    }

    return this._api;
  }
}