const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketIO = require('@feathersjs/socketio');
const topics = require('./topics');
const elements = require('./elements');

/* Settings of the API Handler */
const api = express(feathers());
const port = 4200;
api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.configure(express.rest());
api.configure(socketIO());
api.use(express.errorHandler({
    html: false
}));

/* Publish all events to the `everybody` channel */
api.on('connection', connection => api.channel('everybody').join(connection));
api.publish(() => api.channel('everybody'));

/* Services */
api.use('topics', new topics());
api.use('elements', new elements());

/* Server Listing */
const server = api.listen(port); // Listen on Port
server.on('listening', () => console.log('ToDo Manager Board RESTful-API started at Port ' + port));
