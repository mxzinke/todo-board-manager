const topics = require('./services/topics/topics.service');
const elements = require('./services/elements/elements.service');
const users = require('./services/users/users.services');

module.exports = function(app) {
    app.configure(users);
    app.configure(topics);
    app.configure(elements);
}