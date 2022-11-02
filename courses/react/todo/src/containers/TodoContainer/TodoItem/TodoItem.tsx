import { CheckBoxField } from "../../../components/CheckBoxField/CheckBoxField";
import { Button } from "../../../components/Button/Button";

import classes from "./TodoItem.module.scss";

type TodoProps = {
  itemId: number;
  description?: string;
  task: string;
  onEditClicked?: ({ id }: { id: number }) => void;
  onDeleteClicked?: ({ id }: { id: number }) => void;
};

export const TodoItem = (props: TodoProps) => {
  const onEditClicked = () => {
    props.onEditClicked && props.onEditClicked({ id: props.itemId });
  };

  const onDeleteClicked = () => {
    props.onDeleteClicked && props.onDeleteClicked({ id: props.itemId });
  };

  return (
    <div className={`${classes.TodoItemContainer} flex`}>
      <div className="mt-2 mr-1">
        <CheckBoxField />
      </div>
      <div className="flex-grow-1 mt-auto mb-auto">{props.task}</div>
      <div>
        <Button onClick={onEditClicked} transparent>
          <i className="fa fa-pencil" />
        </Button>
      </div>
      <div>
        <Button onClick={onDeleteClicked} transparent>
          <i className="fa fa-trash" />
        </Button>
      </div>
    </div>
  );
};
