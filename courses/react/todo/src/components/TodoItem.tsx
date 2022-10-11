type TodoProps = {
  itemId: number;
  description: string;
  handnotes: string;
  status: string;
  task: string;
};

export const TodoItem = (props: TodoProps) => <div>{props.task}</div>;
