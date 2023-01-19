import { withDependencies } from "../../hoc/withDependencies";
import { TodosContainer } from "./TodosContainer";
import { dependencies } from "../../dependencies";

export default withDependencies(
  {
    todoService: dependencies.todoService,
  },
  TodosContainer
);
