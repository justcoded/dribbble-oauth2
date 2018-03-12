const AbstractApi = require('./abstract');

module.exports = class AttachmentsApi extends AbstractApi {
  create(shotId, settings) {
    return this.request(this.methods.post, `/shots/${shotId}/attachments`, settings);
  }

  delete(shotId, attachmentId) {
    return this.request(this.methods.delete, `/shots/${shotId}/attachments/${attachmentId}`);
  }
};