import io from 'socket.io-client';
import feathers from '@feathersjs/client';

// Configuration of the API
const Api = {
    url: "http://localhost:4200"
};

const socket = io(Api.url);
const client = feathers();

client.configure(feathers.socketio(socket));
/*client.configure(feathers.authentication({
  storage: window.localStorage
}));*/

export default client;