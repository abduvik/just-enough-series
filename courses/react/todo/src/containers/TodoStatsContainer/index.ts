import { TodoStatsContainer } from "./TodoStatsContainer";
import { withDependencies } from "../../hoc/withDependencies";
import { dependencies } from "../../dependencies";

export default withDependencies(
  {
    todoService: dependencies.todoService,
  },
  TodoStatsContainer
);
