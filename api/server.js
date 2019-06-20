const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketIO = require('@feathersjs/socketio');
const compress = require('compression');

const logger = require('./hooks/logger');
const services = require('./services/index');
const authentication = require('./authentication');
const serverHooks = require('./server.hooks');

/* Settings of the API Handler */
const port = 4200; // port where to serve the API on (default: 4200)

/* Configure The API */
const api = express(feathers());
api.use(express.json());
api.use(compress());
api.use(express.urlencoded({ extended: true }));
api.configure(express.rest());
api.configure(socketIO());

api.use(express.notFound());
api.use(
  express.errorHandler({
    html: false
  })
);

api.configure(authentication);
api.configure(services);

api.hooks(serverHooks);

/* Publish all events to the `everybody` channel */
api.on('connection', (connection) => api.channel('everybody').join(connection));
api.publish(() => api.channel('everybody'));

/* If some unhandled rejections occurred */
process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

/* Server Listing */
const server = api.listen(port); // Listen on Port
server.on('listening', () => {
  logger.info(
    'Feathers application started on http://%s:%d',
    api.get('host'),
    port
  );
});
