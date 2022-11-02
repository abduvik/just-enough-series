import { withDependencies } from "../../hoc/withDependencies";
import { withAppState } from "../../store/app.store";
import { TodoContainer } from "./TodoContainer";

export default withDependencies(
  {
    todoService: "todoService",
  },
  withAppState(TodoContainer) as any
);
