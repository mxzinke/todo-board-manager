import io from 'socket.io-client';
import feathers from '@feathersjs/client';

// Configuration of the API
const API = {
  url: 'https://api.todo.mxzinke.dev'
};

const socket = io(API.url);
const client = feathers();

client.configure(feathers.socketio(socket));
client.configure(
  feathers.authentication({
    storage: window.localStorage
  })
);

// Services:
export const topicsService = client.service('topics');
export const todoService = client.service('elements');
