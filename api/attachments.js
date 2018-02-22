const AbstractApi = require('./abstract');

module.exports = class AttachmentsApi extends AbstractApi {
  create(shotId, settings) {
    return this.request('post', `/shots/${shotId}/attachments`, settings);
  }

  delete(shotId, attachmentId) {
    return this.request('delete', `/shots/${shotId}/attachments/${attachmentId}`);
  }
};