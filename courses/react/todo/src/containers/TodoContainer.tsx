import { useEffect, useState } from "react";
import { AddTodoItem } from "../components/AddTodoItem";
import { TodoItem } from "../components/TodoItem";
import { withDependencies } from "../hoc/withDependencies";
import { Todo } from "../models/Todo";
import { TodoService } from "../services/todo.service";
import { withAppState } from "../store/app.store";
type TodoContainerProps = {
  todoService: TodoService;
  appState: any;
};

const TodoContainer = ({
  todoService,
  appState,
  ...props
}: TodoContainerProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    todoService.getAllTodos().then((todos) => {
      setTodos(todos);
    });
  }, []);

  const refresh = () => {
    todoService.getAllTodos().then((todos) => {
      setTodos(todos);
    });
  };

  const onAddClicked = (value: any) => {
    todoService.addTodo(value).then(() => refresh());
  };

  const onEditClicked = ({ id }: { id: number }) => {
    appState.setState({ showEdit: true, editTodoId: id });
  };

  const onDeleteClicked = ({ id }: { id: number }) => {
    // delete item
    todoService.deleteTodo(id).then(() => refresh());
  };

  return (
    <div>
      <AddTodoItem onAddClicked={onAddClicked} />
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          itemId={todo.id}
          description={todo.description}
          handnotes={todo.handnotes}
          status={todo.status}
          task={todo.task}
          onEditClicked={onEditClicked}
          onDeleteClicked={onDeleteClicked}
        />
      ))}
    </div>
  );
};

const TodoContainerWithDependencies = withDependencies(
  {
    todoService: "todoService",
  },
  withAppState(TodoContainer) as any
);

export { TodoContainerWithDependencies as TodoContainer };
