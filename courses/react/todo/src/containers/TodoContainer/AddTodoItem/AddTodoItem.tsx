import { FormEventHandler, useState } from "react";
import { TextField } from "../../../components/TextField/TextField";
import { Button } from "../../../components/Button/Button";
import { useAutoFocus } from "../../../custom-hooks/useAutoFocus";

type AddTodoFormProps = {
  onAddClicked: (task: string) => void;
};

// const AddTodoItemTextField = withAutoFocus(TextField); // using HoC

export const AddTodoItem = ({ onAddClicked }: AddTodoFormProps) => {
  const inputFieldRef = useAutoFocus();
  const [value, setValue] = useState<string>("");

  const onInput = (value: string) => {
    setValue(value);
  };

  const onFormSubmitted: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    onAddClicked(value);
    setValue("");
  };

  return (
    <form className="flex" onSubmit={onFormSubmitted}>
      <div className="mr-1 flex-grow-1">
        <TextField ref={inputFieldRef} value={value} onInput={onInput} />
      </div>
      <Button type="submit" primary>
        Add
      </Button>
    </form>
  );
};
