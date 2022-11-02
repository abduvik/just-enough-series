import { useState } from "react";
import { TextField } from "../../../components/TextField/TextField";
import { Button } from "../../../components/Button/Button";

export const AddTodoItem = ({ onAddClicked }: any) => {
  const [value, setValue] = useState<string>("");

  const onInput = (value: string) => {
    setValue(value);
  };

  const onAddClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onAddClicked(value);
    setValue("");
  };

  return (
    <div className="flex">
      <div className="mr-1 flex-grow-1">
        <TextField value={value} onInput={onInput} />
      </div>
      <Button onClick={onAddClick} primary>
        Add
      </Button>
    </div>
  );
};
