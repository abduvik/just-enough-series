import { memo } from "react";
import { CheckBoxField } from "../../../components/CheckBoxField/CheckBoxField";
import { Button } from "../../../components/Button/Button";
import { Todo } from "../../../models/Todo";

import classes from "./TodoItem.module.scss";

type TodoItemProps = {
  todo: Todo;
  onEditClicked?: ({ id }: { id: number }) => void;
  onDeleteClicked?: ({ id }: { id: number }) => void;
  onDoneChecked?: ({ id, isDone }: { id: number; isDone: boolean }) => void;
};

export const TodoItem = memo(
  ({ todo, onDeleteClicked, onEditClicked, onDoneChecked }: TodoItemProps) => {
    const onClickEdit = () => {
      onEditClicked && onEditClicked({ id: todo.id });
    };

    const onClickDelete = () => {
      onDeleteClicked && onDeleteClicked({ id: todo.id });
    };

    const onCheckDone = () => {
      onDoneChecked && onDoneChecked({ id: todo.id, isDone: !todo.isDone });
    };

    return (
      <div className={`${classes.TodoItem} flex`}>
        <div className="mt-2 mr-1">
          <CheckBoxField value={todo.isDone} onInput={onCheckDone} />
        </div>
        <div className="flex-grow-1 mt-auto mb-auto">
          <span className={todo.isDone ? classes.TodoIsDone : ""}>
            {todo.task}
          </span>
        </div>
        <div>
          <Button onClick={onClickEdit} transparent>
            <i className="fa fa-pencil" />
          </Button>
        </div>
        <div>
          <Button onClick={onClickDelete} transparent>
            <i className="fa fa-trash" />
          </Button>
        </div>
      </div>
    );
  }
);
