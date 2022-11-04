import { FormEventHandler, useState } from "react";
import { TextField } from "../../../components/TextField/TextField";
import { Button } from "../../../components/Button/Button";
import { withAutoFocus } from "../../../hoc/withAutoFocus";

const AddTodoItemTextField = withAutoFocus(TextField);

export const AddTodoItem = ({ onAddClicked }: any) => {
  const [value, setValue] = useState<string>("");

  const onInput = (value: string) => {
    setValue(value);
  };

  const onAddClick: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    onAddClicked(value);
    setValue("");
  };

  return (
    <form className="flex" onSubmit={onAddClick}>
      <div className="mr-1 flex-grow-1">
        <AddTodoItemTextField value={value} onInput={onInput} />
      </div>
      <Button type="submit" primary>
        Add
      </Button>
    </form>
  );
};
