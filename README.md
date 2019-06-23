# ToDo Manager Board

ToDo-Board with real-time synchronization, for smooth team work. A demo can be found under [todo.mxzinke.dev](https://todo.mxzinke.dev).

[![CodeFactor](https://www.codefactor.io/repository/github/mxzinke/todo-board-manager/badge)](https://www.codefactor.io/repository/github/mxzinke/todo-board-manager) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![Codeship Status for mxzinke/todo-board-manager](https://app.codeship.com/projects/e1bc05e0-759e-0137-8ca9-3aefec942851/status?branch=master)](https://app.codeship.com/projects/349645)

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

(will be served by default at port _4200_). For permanent hosting the backend it would recommend using [PM2](http://pm2.keymetrics.io).

## Development Roadmap

_Current Version:_ 0.1.1 [15.06.2019]

### @ Version 0.1.0 Realtime changes :heavy_check_mark:

- making changes in realtime (synced up between different devices/browser)
- base RESTful-API structure with endpoints "/topics" and "/elements"
- add/remove topics and todo-elements + change their state

### @ Version 0.2.0: Authentication

- default Sign-In and Sign-Up functionality
- per User Topics
- new project structure (with react-redux concept)

### @ Version 0.3.0: Improved Usability

- better User-Feedback at Connection-Problems
- improved server-algorithms for better responsibility
- progress-bar at the topic-title (to see how far the project/topic is to finally target)

### @ Version 0.4.0: Advanced functionality

- change label of the elements
- add description to a topic
- add files to todo-elements
- add map-points to todo-elements

### @ Version 0.5.0: Team

- add & manage teams
- share topics between different users/teams
- refer an user at todo-element (via @user)
