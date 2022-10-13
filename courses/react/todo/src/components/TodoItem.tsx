type TodoProps = {
  itemId: number;
  description?: string;
  handnotes?: string;
  status: string;
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
    <div>
      <div>{props.task}</div>
      <div>
        <button onClick={onEditClicked}>Edit</button>
      </div>
      <div>
        <button onClick={onDeleteClicked}>Delete</button>
      </div>
    </div>
  );
};
