const AbstractApi = require('./abstract');

module.exports = class AttachmentsApi extends AbstractApi {
  create(settings, shotId) {
    return this.request('post', `/shots/${shotId}/attachments`, settings);
  }

  delete(attachmentId, shotId) {
    return this.request('delete', `/shots/${shotId}/attachments/${attachmentId}`);
  }
};