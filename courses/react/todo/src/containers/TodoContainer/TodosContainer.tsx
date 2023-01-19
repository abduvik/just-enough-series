import { useCallback, useEffect, useState } from "react";
import { AddTodoItem } from "./AddTodoItem/AddTodoItem";
import { TodoItem } from "./TodoItem/TodoItem";
import { Todo } from "../../models/Todo";
import { TodoService } from "../../services/Todo.service";
import { ButtonSelect } from "../../components/ButtonSelect/ButtonSelect";
import { useAppState } from "../../custom-hooks/useAppState";

type TodoContainerProps = {
  todoService: TodoService;
};

const buttonSelectOptions = [
  { label: "All", value: "all" },
  { label: "Done", value: "true" },
  { label: "Not Done", value: "false" },
];

export const TodosContainer = ({ todoService }: TodoContainerProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoStateFilter, setTodoStateFilter] = useState<string>("all");
  const { appState, setAppState } = useAppState();

  const fetchTodos = useCallback(() => {
    todoService.getAllTodos().then((todos) => {
      setTodos(todos);
    });
  }, [todoService]);

  useEffect(() => {
    if (appState.editTodoId === -1) {
      fetchTodos();
    }
  }, [appState.editTodoId, fetchTodos]);

  const onAddClicked = useCallback(
    (value: string) => {
      todoService.addTodo(value).then(() => fetchTodos());
    },
    [todoService, fetchTodos]
  );

  const onEditClicked = useCallback(
    ({ id }: { id: number }) => {
      setAppState({ isDrawerOpen: true, editTodoId: id });
    },
    [setAppState]
  );

  const onDeleteClicked = useCallback(
    ({ id }: { id: number }) => {
      // delete item
      todoService.deleteTodo(id).then(() => fetchTodos());
    },
    [todoService, fetchTodos]
  );

  const onSelectTodoStateFilter = useCallback(
    (value: string) => {
      setTodoStateFilter(value);
      todoService.getAllTodos({ params: { isDone: value } }).then((todos) => {
        setTodos(todos);
      });
    },
    [todoService]
  );

  const onDoneChecked = useCallback(
    ({ id, isDone }: { id: number; isDone: boolean }) => {
      todoService.updateTodo(id, { isDone }).then(() => fetchTodos());
    },
    [todoService, fetchTodos]
  );

  return (
    <>
      <div className="m-auto">
        <AddTodoItem onAddClicked={onAddClicked} />

        <ButtonSelect
          className="mt-3"
          options={buttonSelectOptions}
          value={todoStateFilter}
          onInput={onSelectTodoStateFilter}
        />

        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onEditClicked={onEditClicked}
            onDeleteClicked={onDeleteClicked}
            onDoneChecked={onDoneChecked}
          />
        ))}
      </div>
    </>
  );
};
