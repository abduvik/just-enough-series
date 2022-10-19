import { EditTodoContainer } from "./containers/EditTodoContainer";
import { TodoContainer } from "./containers/TodoContainer";
import { TodoStatsContainer } from "./containers/TodoStatsContainer";
import { AppStateProvider } from "./store/app.store";
import "./App.css";

function App() {
  return (
    <>
      <AppStateProvider>
        <TodoContainer />
        <EditTodoContainer />
        <TodoStatsContainer />
      </AppStateProvider>
    </>
  );
}

export default App;
