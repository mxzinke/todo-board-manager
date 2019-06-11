const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketIO = require('@feathersjs/socketio');
//const memory = require('feathers-memory');
const topics = require('./topics');

/* Settings of the API Handler */
const api = express(feathers());
const port = 4200;
api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.configure(express.rest());
api.configure(socketIO());
api.use(express.errorHandler());

/* Publish all events to the `everybody` channel */
api.on('connection', connection => api.channel('everybody').join(connection));
api.publish(() => api.channel('everybody'));


/* Message Service */
api.use('topics', new topics());

//api.use('messages', new message.Messages());

/* Server Listing */
const server = api.listen(port); // Listen on Port 3000
server.on('listening', () => console.log('ToDo Manager Board RESTful-API started at Port ' + port));
