/* The ToDo Manager Board
 * @author Maximilian Zinke */

import React from 'react';
import './assets/styles/App.css';
import './assets/styles/Forms.css';
import Header from './components/Header';
import TopicHandler from './components/TopicHandler';
import ApiConnector from './ApiConnector';

/* @function deleting all empty array fields
 * @param array The array which 
 * @return a new array (without empty fields */
export function delEmptyArrayFields(array) {
  var newArray = array.filter((element) => {
    return (element !== undefined);
  });

  return newArray;
}

export const Api = new ApiConnector({
  apiUrl: "http://localhost:4200"
});

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
