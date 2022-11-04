import { useEffect, useState } from "react";
import { AddTodoItem } from "./AddTodoItem/AddTodoItem";
import { TodoItem } from "./TodoItem/TodoItem";
import { Todo } from "../../models/Todo";
import { TodoService } from "../../services/todo.service";
import classes from "./TodoContainer.module.scss";
import { EditTodoContainer } from "../EditTodoContainer/EditTodoContainer";
import { ButtonSelect } from "../../components/ButtonSelect/ButtonSelect";

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
  const [todoStateFilter, setTodoStateFilter] = useState<string>("all");

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

  const onSelectTodoStateFilter = (value: string) => {
    setTodoStateFilter(value);
    todoService.getAllTodos({ params: { isDone: value } }).then((todos) => {
      setTodos(todos);
    });
  };

  const onDoneChecked = ({ id, isDone }: { id: number; isDone: boolean }) => {
    todoService.updateTodo(id, { isDone }).then(() => refresh());
  };

  const buttonSelectOptions = [
    { label: "All", value: "all" },
    { label: "Done", value: "true" },
    { label: "Not Done", value: "false" },
  ];

  return (
    <>
      <div className={`${classes.TodoContainer} m-auto`}>
        <AddTodoItem onAddClicked={onAddClicked} />

        <ButtonSelect
          className="mt-3"
          options={buttonSelectOptions}
          value={todoStateFilter}
          onSelect={onSelectTodoStateFilter}
        />

        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            itemId={todo.id}
            description={todo.description}
            task={todo.task}
            isDone={todo.isDone}
            onEditClicked={onEditClicked}
            onDeleteClicked={onDeleteClicked}
            onDoneChecked={onDoneChecked}
          />
        ))}
      </div>
      {appState.state.showEdit ? <EditTodoContainer /> : null}
    </>
  );
};
