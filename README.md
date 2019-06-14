# ToDo Manager Board

ToDo-Board with real-time synchronization, for smooth team work. A demo can be found under [todo.mxzinke.dev](https://todo.mxzinke.dev).

## What can I do with this

If you want, you're allowed to fork this repository. Also your allowed to host this [React.js](https://reactjs.org)-WebApp by yourself. You will find the [Feathers.js API](https://feathersjs.com) backend in the folder `api`.

If you want to use the project, please install Node.js and npm. To install all required packages you have to go into your folder via command-line and type in:
```
$ npm install
```

After successfully installing all needed packages, you will be able to start the development server with `npm start` or build a productive site with `npm run build`.

The site is using by default the RESTful-Websocket API (could be find under [api.todo.mxzinke.dev](https://api.todo.mxzinke.dev)). If your planing to use the site by yourself, you can change the url in the file `src/connector.js`. You can host your own API with the command
```
npm run-script api
```
or
```
node ./src/server.js
```
(will be served by default at port *4200*). For permanent hosting the backend it would recommend using [PM2](http://pm2.keymetrics.io).
