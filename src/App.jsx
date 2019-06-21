/* The ToDo Manager Board
 * @author Maximilian Zinke 👊
 * 📡 https://mxzinke.dev
 * 📧 me@mxzinke.dev */

import React from 'react';
import './assets/styles/main/App.css';
import './assets/styles/forms/Forms.css';
import Header from './components/main/Header';
import TopicHandler from './components/topic/TopicHandler';

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
