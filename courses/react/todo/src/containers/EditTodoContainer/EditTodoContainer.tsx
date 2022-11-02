import { useEffect, useState } from "react";
import { withDependencies } from "../../hoc/withDependencies";
import { withAppState } from "../../store/app.store";
import { TextField } from "../../components/TextField/TextField";
import { CheckBoxField } from "../../components/CheckBoxField/CheckBoxField";
import { TextAreaField } from "../../components/TextAreaField/TextAreaField";
import { CanvasField } from "../../components/CanvasField/CanvasField";
import { Button } from "../../components/Button/Button";
import classes from "./EditTodoContainer.module.scss";
import { Title } from "../../components/Title/Title";

const EditTodoContainer = ({ todoService, appState }: any) => {
  const [todo, setTodoState] = useState({
    task: "",
    description: "",
    handNotes: "",
    isDone: false,
  });

  useEffect(() => {
    todoService
      .getTodo(appState.state.editTodoId)
      .then((data: any) => setTodoState(data));
  }, [appState.state.editTodoId]);

  const updateFormData = (fieldName: string, value: any) => {
    setTodoState((state) => ({
      ...state,
      [fieldName]: value,
    }));
  };

  const onSaveClicked = () => {
    todoService.updateTodo(appState.state.editTodoId, {
      ...todo,
    });
  };

  const onCancelClicked = () => {
    appState.setState({ showEdit: false, editTodoId: null });
  };

  return (
    <div className={classes.EditTodoContainer}>
      <Title level={2}>Edit Todo</Title>
      <div>
        <TextField
          label="Task"
          name="task"
          className="mt-1"
          onInput={(value: any) => updateFormData("task", value)}
          value={todo.task}
        />
        <CheckBoxField
          onInput={(value: any) => updateFormData("isDone", value)}
          label="Done"
          name="isDone"
          className="mt-1"
          value={todo.isDone}
        />
        <TextAreaField
          label="Description"
          name="description"
          className="mt-1"
          onInput={(value: any) => updateFormData("description", value)}
          value={todo.description}
        />
        <CanvasField
          label="Hand Notes"
          className="mt-1"
          onInput={(value: any) => updateFormData("handNotes", value)}
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

const EditTodoContainerWithAppState = withDependencies(
  { todoService: "todoService" },
  withAppState(EditTodoContainer)
);

export { EditTodoContainerWithAppState as EditTodoContainer };
