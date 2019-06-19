/* The ToDo Manager Board
 * @author Maximilian Zinke */

import React from 'react';
import './assets/styles/main/App.css';
import './assets/styles/forms/Forms.css';
import Header from './components/main/Header';
import TopicHandler from './components/topic/TopicHandler';

/* @function deleting all empty array fields
 * @param array The array which 
 * @return a new array (without empty fields */
export function delEmptyArrayFields(array) {
  var newArray = array.filter((element) => {
    return (element !== undefined);
  });

  return newArray;
}


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
