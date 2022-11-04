import { TodoStatsContainer } from "./TodoStatsContainer";
import { withDependencies } from "../../hoc/withDependencies";

export default withDependencies(
  {
    todoService: "todoService",
  },
  TodoStatsContainer
);
