export type Todo = {
  description?: string;
  handnotes?: string;
  id: number;
  status: TodoStatus;
  task: string;
};

export enum TodoStatus {
  DONE = "DONE",
  NOT_DONE = "NOT_DONE",
}
