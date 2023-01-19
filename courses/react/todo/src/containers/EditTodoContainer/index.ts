import { withDependencies } from "../../hoc/withDependencies";
import { withAppState } from "../../hoc/withAppState";
import { dependencies } from "../../dependencies";
import { EditTodoContainer } from "./EditTodoContainer";
import { withSideDrawer } from "../../hoc/withSideDrawer/withSideDrawer";

export default withDependencies(
  { todoService: dependencies.todoService },
  withSideDrawer(withAppState(EditTodoContainer))
);
