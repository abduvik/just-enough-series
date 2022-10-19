import { EditTodoContainer } from "./containers/EditTodoContainer";
import { TodoContainer } from "./containers/TodoContainer";
import { TodoStatsContainer } from "./containers/TodoStatsContainer";
import "./App.css";
import { withAppState } from "./store/app.store";

function App({ appState }: any) {
  console.log(appState.state.showEdit);
  return (
    <>
      <TodoContainer />
      {appState.state.showEdit ? <EditTodoContainer /> : null}
      <TodoStatsContainer />
    </>
  );
}

export default withAppState(App);
