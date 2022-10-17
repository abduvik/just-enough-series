import React, { useState } from "react";
import "./App.css";
import { EditTodoContainer } from "./containers/EditTodoContainer";
import { TodoContainer } from "./containers/TodoContainer";
import { TodoStatsContainer } from "./containers/TodoStatsContainer";

export const AppState = React.createContext({});

export const AppStateConsumer = AppState.Consumer;

function App() {
  const [state, setState] = useState({});

  return (
    <>
      <AppState.Provider value={{ state, setState }}>
        <TodoContainer />
        <EditTodoContainer />
        <TodoStatsContainer />
      </AppState.Provider>
    </>
  );
}

export default App;
