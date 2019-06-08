/* @author Maximilian Zinke */

import React from 'react';
import './assets/styles/App.css';
import './assets/styles/Forms.css';
import Header from './components/Header';
import Topic from './components/Topic';
//import Api from './Api';


/* @important @function Root App Class */
function App() {
  return (
    <div className="App">
      <Header name="ToDo Manager Board" />
      <div className="Topics">
        <Topic id="01234567" />
        <Topic id="25151656" />
      </div>
    </div>
  );
}

export default App;
