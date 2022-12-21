import { useCallback, useEffect, useState } from "react";
import { AddTodoItem } from "./AddTodoItem/AddTodoItem";
import { TodoItem } from "./TodoItem/TodoItem";
import { Todo } from "../../models/Todo";
import { TodoService } from "../../services/Todo.service";
import { EditTodoContainer } from "../EditTodoContainer/";
import { ButtonSelect } from "../../components/ButtonSelect/ButtonSelect";
import { AppStateType } from "../../store/app.store";

type TodoContainerProps = {
  todoService: TodoService;
  appState: AppStateType;
};

const buttonSelectOptions = [
  { label: "All", value: "all" },
  { label: "Done", value: "true" },
  { label: "Not Done", value: "false" },
];

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

  const onAddClicked = useCallback((value: string) => {
    todoService.addTodo(value).then(() => fetchTodos());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onEditClicked = useCallback(({ id }: { id: number }) => {
    appState.setState({ showEdit: true, editTodoId: id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDeleteClicked = useCallback(({ id }: { id: number }) => {
    // delete item
    todoService.deleteTodo(id).then(() => fetchTodos());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSelectTodoStateFilter = useCallback((value: string) => {
    setTodoStateFilter(value);
    todoService.getAllTodos({ params: { isDone: value } }).then((todos) => {
      setTodos(todos);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDoneChecked = useCallback(
    ({ id, isDone }: { id: number; isDone: boolean }) => {
      todoService.updateTodo(id, { isDone }).then(() => fetchTodos());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

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
            task={todo.task}
            isDone={todo.isDone}
            onEditClicked={onEditClicked}
            onDeleteClicked={onDeleteClicked}
            onDoneChecked={onDoneChecked}
          />
        ))}
      </div>
      <EditTodoContainer />
    </>
  );
};
