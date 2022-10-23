import { HttpAdapter } from "../adapters/httpAdapter";
import { Todo } from "../models/Todo";

export class TodoService {
  httpAdapter: HttpAdapter;

  constructor({ httpAdapter }: { httpAdapter: HttpAdapter }) {
    this.httpAdapter = httpAdapter;
  }

  getTodo(id: number) {
    return this.httpAdapter.get<Todo>(`/todos/${id}`);
  }

  getAllTodos() {
    return this.httpAdapter.get<Todo[]>("/todos");
  }

  addTodo(todo: string) {
    return this.httpAdapter.post<{ todo: string }>("/todos", { todo });
  }

  updateTodo(id: number, data: any) {
    return this.httpAdapter.patch<{ id: number }>(`/todos/${id}`, { ...data });
  }

  deleteTodo(id: number) {
    return this.httpAdapter.delete<{ id: number }>("/todos", { id });
  }
}
