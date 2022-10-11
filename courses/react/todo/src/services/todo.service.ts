import { HttpAdapter } from "../adapters/httpAdapter";
import { Todo } from "../models/Todo";

export class TodoService {
  httpAdapter: HttpAdapter;

  constructor({ httpAdapter }: { httpAdapter: HttpAdapter }) {
    this.httpAdapter = httpAdapter;
  }

  getAllTodos() {
    return this.httpAdapter.get<Todo[]>("/todos");
  }

  addTodo(todo: string) {
    return this.httpAdapter.post<{ todo: string }>("/todos", { todo });
  }

  getTodo() {}

  updateTodo() {}

  deleteTodo() {}
}
