import React from "react";
import "./App.css";
import { EditTodoContainer } from "./containers/EditTodoContainer";
import { TodoContainer } from "./containers/TodoContainer";
import { TodoStatsContainer } from "./containers/TodoStatsContainer";

function App() {
  return (
    <>
      <TodoContainer />
      <EditTodoContainer />
      <TodoStatsContainer />
    </>
  );
}

export default App;
