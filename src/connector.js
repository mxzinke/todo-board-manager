import io from 'socket.io-client';
import feathers from '@feathersjs/client';

// Configuration of the API
const Api = {
    url: "https://api.todo.mxzinke.dev"
};

const socket = io(Api.url);
const client = feathers();

client.configure(feathers.socketio(socket));
/*client.configure(feathers.authentication({
  storage: window.localStorage
}));*/

// Services:
var topicsService = client.service('topics');
var todoService = client.service('elements');

export { todoService, topicsService };
