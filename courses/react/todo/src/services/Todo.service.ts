import { HttpAdapter } from "../adapters/HttpAdapter";
import { Todo } from "../models/Todo";

export class TodoService {
  httpAdapter: HttpAdapter;

  constructor({ httpAdapter }: { httpAdapter: HttpAdapter }) {
    this.httpAdapter = httpAdapter;
  }

  getTodo(id: number) {
    return this.httpAdapter.get<Todo>(`/todos/${id}`);
  }

  getAllTodos({ params }: { params?: { isDone: string } } = {}) {
    return this.httpAdapter.get<Todo[]>("/todos", { query: params || {} });
  }

  addTodo(todo: string) {
    return this.httpAdapter.post<{ todo: string }>("/todos", { todo });
  }

  updateTodo(id: number, data: Partial<Todo>) {
    return this.httpAdapter.patch<Partial<Todo>>(`/todos/${id}`, { ...data });
  }

  deleteTodo(id: number) {
    return this.httpAdapter.delete<{ id: number }>("/todos", { id });
  }
}
