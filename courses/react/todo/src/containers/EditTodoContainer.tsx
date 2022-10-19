import { useAppState } from "../store/app.store";

export const EditTodoContainer = () => {
  const appState = useAppState();
  console.log(appState);

  return <div>{appState.state.isUp} Edit</div>;
};
