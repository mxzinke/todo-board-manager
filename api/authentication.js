const auth = require('@feathersjs/authentication');
const jwt = require('@feathersjs/authentication-jwt');
const local = require('@feathersjs/authentication-local');

module.exports = function(app) {
  const config = app.get('authentication');

  app.configure(auth(config));
  app.configure(jwt());
  app.configure(local());

  app.service('authentication').hooks({
    before: {
      create: [auth.hooks.authenticate(config.strategies)],
      remove: [auth.hooks.authenticate('jwt')]
    }
  });
};
