/* @author Maximilian Zinke */

import React from 'react';
import './assets/styles/App.css';
import './assets/styles/Forms.css';
import Header from './components/Header';
import TopicHandler from './components/TopicHandler';
//import Api from './Api';


/* @important @function Root App Class */
function App() {
  return (
    <div className="App">
      <Header name="ToDo Manager Board" />
      <TopicHandler />
    </div>
  );
}

export default App;
