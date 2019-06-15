const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketIO = require('@feathersjs/socketio');
const topics = require('./services/topics');
const elements = require('./services/elements');
const users = require('./services/users');
const auth = require('@feathersjs/authentication');

/* Settings of the API Handler */
const port = 4200; // port where to serve the API on (default: 4200)
const authOptions = {
    path: '/authentication', // the authentication service path
    header: 'Authorization', // the header to use when using JWT auth
    entity: 'user', // the entity that will be added to the request, socket, and context.params. (ie. req.user, socket.user, context.params.user)
    secret: 'supersecret', // either the secret for HMAC algorithms or the PEM encoded private key for RSA and ECDSA.
    service: 'users', // the service to look up the entity
    passReqToCallback: true, // whether the request object should be passed to the strategies `verify` function
    session: false, // whether to use sessions
    cookie: {
        enabled: true, // whether cookie creation is enabled
        name: 'todo-board-jwt', // the cookie name
        httpOnly: false, // when enabled, prevents the client from reading the cookie.
        secure: true // whether cookies should only be available over HTTPS
    },
    jwt: {
        header: { typ: 'access' }, // by default is an access token but can be any type. This is not a typo!
        audience: 'https://api.todo.mxzinke.dev', // The resource, where to process
        subject: 'anonymous', // Typically the entity id associated with the JWT
        issuer: 'feathers', // The issuing server, application or resource
        algorithm: 'HS512', // the algorithm to use
        expiresIn: '1d' // the access token expiry
    }
};

/* Configure The API */
const api = express(feathers());
api.use(express.json());
api.use(express.urlencoded({ extended: true }));api.configure(express.rest());

api.configure(socketIO());
api.configure(auth(authOptions))
api.use(express.errorHandler({
    html: false
}));


/* Publish all events to the `everybody` channel */
api.on('connection', connection => api.channel('everybody').join(connection));
api.publish(() => api.channel('everybody'));

/* Services */
api.use('users', new users())
api.use('topics', new topics());
api.use('elements', new elements());

/* Server Listing */
const server = api.listen(port); // Listen on Port
server.on('listening', () => console.log('ToDo Manager Board RESTful-API started at Port ' + port));
