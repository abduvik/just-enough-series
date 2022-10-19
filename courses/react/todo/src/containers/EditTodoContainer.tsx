import { useEffect, useState } from "react";
import { withDependencies } from "../hoc/withDependencies";
import { TodoStatus } from "../models/Todo";
import { withAppState } from "../store/app.store";

const EditTodoContainer = ({ todoService, appState }: any) => {
  const [todo, setTodoState] = useState({
    task: "",
    description: "",
    handnotes: "",
    status: TodoStatus.NOT_DONE,
  });

  useEffect(() => {
    todoService
      .getTodo(appState.state.editTodoId)
      .then((data: any) => setTodoState(data));
  }, [appState.state.editTodoId]);

  return (
    <div>
      <div>
        <div>
          <label htmlFor="task">Task</label>
          <input name="task" value={todo.task} type="text" />
        </div>
        <div>
          <label htmlFor="task">Done</label>
          <input type="checkbox" name="task" />
        </div>
        <div>
          <label htmlFor="task">Description</label>
          <textarea name="task" />
        </div>
        <div>
          <label htmlFor="task">Handnotes</label>
          <canvas />
        </div>
      </div>
    </div>
  );
};

const EditTodoContainerWithAppState = withDependencies(
  { todoService: "todoService" },
  withAppState(EditTodoContainer)
);

export { EditTodoContainerWithAppState as EditTodoContainer };
