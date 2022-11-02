import { useEffect, useState } from "react";
import { AddTodoItem } from "./AddTodoItem/AddTodoItem";
import { TodoItem } from "./TodoItem/TodoItem";
import { Todo } from "../../models/Todo";
import { TodoService } from "../../services/todo.service";
import classes from "./TodoContainer.module.scss";
import { EditTodoContainer } from "../EditTodoContainer/EditTodoContainer";

type TodoContainerProps = {
  todoService: TodoService;
  appState: any;
};

export const TodoContainer = ({
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
    <>
      <div className={`${classes.TodoContainer} m-auto`}>
        <AddTodoItem onAddClicked={onAddClicked} />
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            itemId={todo.id}
            description={todo.description}
            task={todo.task}
            onEditClicked={onEditClicked}
            onDeleteClicked={onDeleteClicked}
          />
        ))}
      </div>
      {appState.state.showEdit ? <EditTodoContainer /> : null}
    </>
  );
};
