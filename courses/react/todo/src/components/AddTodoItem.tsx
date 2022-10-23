import { useState} from "react";

export const AddTodoItem = ({ onAddClicked }: any) => {
  const [value, setValue] = useState<string>("");

  const onInput: React.FormEventHandler<HTMLInputElement> = (event) => {
    setValue(event.currentTarget.value);
  };

  const onAddClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onAddClicked(value);
    setValue("");
  };

  return (
    <>
      <input type="text" value={value} onInput={onInput} />
      <button onClick={onAddClick}>Add</button>
    </>
  );
};
