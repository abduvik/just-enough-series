import { useCallback, useEffect, useState } from "react";
import { TextField } from "../../components/TextField/TextField";
import { CheckBoxField } from "../../components/CheckBoxField/CheckBoxField";
import { TextAreaField } from "../../components/TextAreaField/TextAreaField";
import { CanvasField } from "../../components/CanvasField/CanvasField";
import { Button } from "../../components/Button/Button";
import classes from "./EditTodoContainer.module.scss";
import { Title } from "../../components/Title/Title";
import { TodoService } from "../../services/Todo.service";
import { AppStateType } from "../../store/app.store";
import { Todo } from "../../models/Todo";

type EditTodoContainerProps = {
  todoService: TodoService;
  appState: AppStateType;
};

type TodoState = {
  task: string;
  description: string;
  handNotes: string;
  isDone: boolean;
};

export const EditTodoContainer = ({
  todoService,
  appState,
}: EditTodoContainerProps) => {
  const [todo, setTodoState] = useState<TodoState>({
    task: "",
    description: "",
    handNotes: "",
    isDone: false,
  });

  useEffect(() => {
    todoService
      .getTodo(appState.state.editTodoId)
      .then((data: Todo) => setTodoState(data));
  }, [appState.state.editTodoId, todoService]);

  const updateFormData = (updatedState: Partial<TodoState>) => {
    setTodoState((state) => ({
      ...state,
      ...updatedState,
    }));
  };

  const onSaveClicked = async () => {
    await todoService.updateTodo(appState.state.editTodoId, {
      ...todo,
    });
  };

  const onCancelClicked = () => {
    appState.setState({ showEdit: false, editTodoId: -1 });
  };

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
