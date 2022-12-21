import { CheckBoxField } from "../../../components/CheckBoxField/CheckBoxField";
import { Button } from "../../../components/Button/Button";

import classes from "./TodoItem.module.scss";
import React from "react";

type TodoProps = {
  itemId: number;
  task: string;
  isDone: boolean;
  onEditClicked?: ({ id }: { id: number }) => void;
  onDeleteClicked?: ({ id }: { id: number }) => void;
  onDoneChecked?: ({ id, isDone }: { id: number; isDone: boolean }) => void;
};

export const TodoItem = React.memo((props: TodoProps) => {
  const onEditClicked = () => {
    props.onEditClicked && props.onEditClicked({ id: props.itemId });
  };

  const onDeleteClicked = () => {
    props.onDeleteClicked && props.onDeleteClicked({ id: props.itemId });
  };

  const onDoneChecked = () => {
    props.onDoneChecked &&
      props.onDoneChecked({ id: props.itemId, isDone: !props.isDone });
  };

  return (
    <div className={`${classes.TodoItemContainer} flex`}>
      <div className="mt-2 mr-1">
        <CheckBoxField value={props.isDone} onInput={onDoneChecked} />
      </div>
      <div className="flex-grow-1 mt-auto mb-auto">
        <span className={props.isDone ? classes.TodoIsDone : ""}>
          {props.task}
        </span>
      </div>
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
});
