import { HttpAdapter } from "./adapters/httpAdapter";
import { config } from "./config";
import { TodoService } from "./services/todo.service";
import { TodoStore } from "./store/todo.store";
import { IDependencyContainer } from "./types";

export class DependencyContainer implements IDependencyContainer {
  _dependencies = {};

  add<T>(key: symbol, dependency: T) {
    Object.defineProperty(this._dependencies, key, {
      value: dependency,
    });
  }

  get<T>(key: symbol): T {
    const descriptor = Object.getOwnPropertyDescriptor(this._dependencies, key);
    return descriptor?.value as T;
  }
}

const container = new DependencyContainer();

const httpAdapter = new HttpAdapter({ baseUrl: config.baseUrl });
const todoService = new TodoService({ httpAdapter });

// AppStore can be used with a dependency container as well
// const appStore = new AppStore();
const todoStore = new TodoStore();

const dependencies = {
  httpAdapter: Symbol("httpAdapter"),
  todoStore: Symbol("todoStore"),
  todoService: Symbol("todoService"),
};

container.add(dependencies.httpAdapter, httpAdapter);
container.add(dependencies.todoStore, todoStore);
container.add(dependencies.todoService, todoService);
// container.add("dependencies.appStore", appStore);

export { container, dependencies };
