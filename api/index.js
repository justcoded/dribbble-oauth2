const Shot = require('./shots');
const User = require('./user');
const Project = require('./project');
const Attachments = require('./attachments');

module.exports = (token) => ({
  shot: new Shot(token),
  user: new User(token),
  project: new Project(token),
  attachment: new Attachments(token)
});