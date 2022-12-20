import {withDependencies} from "../../hoc/withDependencies";
import {withAppState} from "../../store/app.store";
import {TodosContainer} from "./TodosContainer";
import {dependencies} from "../../dependencies";

export default withDependencies(
    {
        todoService: dependencies.todoService,
    },
    withAppState(TodosContainer) as any
);
