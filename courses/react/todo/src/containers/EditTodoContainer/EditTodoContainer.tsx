import { useCallback, useEffect, useState } from "react";
import { TextField } from "../../components/TextField/TextField";
import { CheckBoxField } from "../../components/CheckBoxField/CheckBoxField";
import { TextAreaField } from "../../components/TextAreaField/TextAreaField";
import { CanvasField } from "../../components/CanvasField/CanvasField";
import { Button } from "../../components/Button/Button";
import classes from "./EditTodoContainer.module.scss";
import { Title } from "../../components/Title/Title";
import { TodoService } from "../../services/Todo.service";
import { Todo } from "../../models/Todo";
import { AppStateContextType } from "../../custom-hooks/useAppState";

type EditTodoContainerProps = {
  todoService: TodoService;
  appState: AppStateContextType;
};

type TodoState = {
  task: string;
  description: string;
  handNotes: string;
  isDone: boolean;
};

export const EditTodoContainer = ({
  todoService,
  appState: { appState, setAppState },
}: EditTodoContainerProps) => {
  const [todo, setTodoState] = useState<TodoState>({
    task: "",
    description: "",
    handNotes: "",
    isDone: false,
  });

  useEffect(() => {
    todoService
      .getTodo(appState.editTodoId)
      .then((data: Todo) => setTodoState(data));
  }, [appState.editTodoId, todoService]);

  const updateFormData = (updatedState: Partial<TodoState>) => {
    setTodoState((state) => ({
      ...state,
      ...updatedState,
    }));
  };

  const onSaveClicked = useCallback(async () => {
    await todoService.updateTodo(appState.editTodoId, {
      ...todo,
    });
    setAppState({ isDrawerOpen: false, editTodoId: -1 });
  }, [appState, todo, todoService]);

  const onCancelClicked = useCallback(() => {
    setAppState({ isDrawerOpen: false, editTodoId: -1 });
  }, [setAppState]);

  const updateTaskName = useCallback((value: string) => {
    updateFormData({ task: value });
  }, []);

  const updateDone = useCallback((value: boolean) => {
    updateFormData({ isDone: value });
  }, []);

  const updateDescription = useCallback((value: string) => {
    updateFormData({ description: value });
  }, []);

  const updateHandNotes = useCallback((value: string) => {
    updateFormData({ handNotes: value });
  }, []);

  return (
    <div className={classes.EditTodoContainer}>
      <Title level={2}>Edit Todo</Title>
      <div>
        <TextField
          label="Task"
          name="task"
          className="mt-1"
          onInput={updateTaskName}
          value={todo.task}
        />
        <CheckBoxField
          onInput={updateDone}
          label="Done"
          name="isDone"
          className="mt-1"
          value={todo.isDone}
        />
        <TextAreaField
          label="Description"
          name="description"
          className="mt-1"
          onInput={updateDescription}
          value={todo.description}
        />
        <CanvasField
          label="Hand Notes"
          className="mt-1"
          onInput={updateHandNotes}
          value={todo.handNotes}
        />
      </div>
      <div className="flex mt-2">
        <Button className="flex-grow-1 mr-2" onClick={onSaveClicked} primary>
          Save
        </Button>
        <Button className="flex-grow-1" onClick={onCancelClicked} secondary>
          Close
        </Button>
      </div>
    </div>
  );
};
