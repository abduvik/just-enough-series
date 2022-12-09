import { withDependencies } from "../../hoc/withDependencies";
import { withAppState } from "../../store/app.store";
import { dependencies } from "../../dependencies";
import { EditTodoContainer } from "./EditTodoContainer";

const EditTodoContainerWithAppState = withDependencies(
  { todoService: dependencies.todoService },
  withAppState(EditTodoContainer)
);

export { EditTodoContainerWithAppState as EditTodoContainer };
