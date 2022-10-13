import { useEffect, useState } from "react";
import { AddTodoItem } from "../components/AddTodoItem";
import { TodoItem } from "../components/TodoItem";
import { withDependencies } from "../hoc/withDependencies";
import { Todo } from "../models/Todo";
import { TodoService } from "../services/todo.service";
type TodoContainerProps = {
  todoService: TodoService;
};

const TodoContainer = ({ todoService }: TodoContainerProps) => {
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
    todoService.getTodo(id).then(() => refresh());
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
  TodoContainer
);

export { TodoContainerWithDependencies as TodoContainer };
