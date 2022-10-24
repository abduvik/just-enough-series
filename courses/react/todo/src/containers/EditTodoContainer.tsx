import { useEffect, useState } from "react";
import { withDependencies } from "../hoc/withDependencies";
import { withAppState } from "../store/app.store";
import { TextField } from "../components/fields/TextField";
import { CheckBoxField } from "../components/fields/CheckBoxField";
import { TextAreaField } from "../components/fields/TextAreaField";
import { CanvasField } from "../components/fields/CanvasField";
import { Button } from "../components/fields/Button";

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

  useEffect(() => {
    console.log(todo);
  }, [todo]);

  const onSaveClicked = () => {
    console.log(todo);
    todoService.updateTodo(appState.state.editTodoId, {
      ...todo,
    });
  };

  const onCancelClicked = () => {
    appState.setState({ showEdit: false, editTodoId: null });
  };

  return (
    <div>
      <div>
        <TextField
          onInput={(value: any) => updateFormData("task", value)}
          value={todo.task}
        />
        <CheckBoxField
          onInput={(value: any) => updateFormData("isDone", value)}
          value={todo.isDone}
        />
        <TextAreaField
          onInput={(value: any) => updateFormData("description", value)}
          value={todo.description}
        />
        <CanvasField
          onInput={(value: any) => updateFormData("handNotes", value)}
          value={todo.handNotes}
        />
        <Button onClick={onSaveClicked}>Save</Button>
        <Button onClick={onCancelClicked}>Close</Button>
      </div>
    </div>
  );
};

const EditTodoContainerWithAppState = withDependencies(
  { todoService: "todoService" },
  withAppState(EditTodoContainer)
);

export { EditTodoContainerWithAppState as EditTodoContainer };
