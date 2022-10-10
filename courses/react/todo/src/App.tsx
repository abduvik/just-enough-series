import React from 'react';
import './App.css';
import { TodoContainer } from './containers/TodoContainer';
import { TodoStatsContainer } from './containers/TodoStatsContainer';

function App() {
  return (
    <>
      <TodoContainer />
      <TodoStatsContainer />
    </>
  );
}

export default App;
