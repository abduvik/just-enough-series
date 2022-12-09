import { withDependencies } from "../../hoc/withDependencies";
import { withAppState } from "../../store/app.store";
import { TodoContainer } from "./TodoContainer";
import { dependencies } from "../../dependencies";

export default withDependencies(
  {
    todoService: dependencies.todoService,
  },
  withAppState(TodoContainer) as any
);
