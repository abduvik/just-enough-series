import { useEffect, useState } from "react";
import { AddTodoItem } from "./AddTodoItem/AddTodoItem";
import { TodoItem } from "./TodoItem/TodoItem";
import { Todo } from "../../models/Todo";
import { TodoService } from "../../services/todo.service";
import { EditTodoContainer } from "../EditTodoContainer/";
import { ButtonSelect } from "../../components/ButtonSelect/ButtonSelect";
import { AppStateType } from "../../store/app.store";

type TodoContainerProps = {
  todoService: TodoService;
  appState: AppStateType;
};

export const TodosContainer = ({
  todoService,
  appState,
}: TodoContainerProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoStateFilter, setTodoStateFilter] = useState<string>("all");

  const fetchTodos = () => {
    todoService.getAllTodos().then((todos) => {
      setTodos(todos);
    });
  };

  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onAddClicked = (value: string) => {
    todoService.addTodo(value).then(() => fetchTodos());
  };

  const onEditClicked = ({ id }: { id: number }) => {
    appState.setState({ showEdit: true, editTodoId: id });
  };

  const onDeleteClicked = ({ id }: { id: number }) => {
    // delete item
    todoService.deleteTodo(id).then(() => fetchTodos());
  };

  const onSelectTodoStateFilter = (value: string) => {
    setTodoStateFilter(value);
    todoService.getAllTodos({ params: { isDone: value } }).then((todos) => {
      setTodos(todos);
    });
  };

  const onDoneChecked = ({ id, isDone }: { id: number; isDone: boolean }) => {
    todoService.updateTodo(id, { isDone }).then(() => fetchTodos());
  };

  const buttonSelectOptions = [
    { label: "All", value: "all" },
    { label: "Done", value: "true" },
    { label: "Not Done", value: "false" },
  ];

  return (
    <>
      <div className="m-auto">
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
