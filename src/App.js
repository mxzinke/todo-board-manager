/* @author Maximilian Zinke */

import React from 'react';
import './assets/styles/App.css';
import Header from './components/Header';
import Topic from './components/ToDo-Topic';
//import Api from './Api';


/* @important @function Root App Class */
function App() {
  return (
    <div className="App">
      <Header name="ToDo Manager Board (build with React)" />
      <div className="Topics">
        <Topic id="01234567" />
        <Topic id="01234567" />
      </div>
    </div>
  );
}

export default App;
