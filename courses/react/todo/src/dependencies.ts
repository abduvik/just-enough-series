// import { ContextStoreAdapter } from "./adapters/contextStoreAdapter";
import { HttpAdapter } from "./adapters/httpAdapter";
import { config } from "./config";
import { TodoService } from "./services/todo.service";
// import { AppStore } from "./store/app.store";
import { TodoStore } from "./store/todo.store";
import { DependencyContainer } from "./types";

const container: DependencyContainer = {
  _dependencies: {},
  add(key, dependency) {
    this._dependencies[key] = dependency;
  },
  get(key: string) {
    return this._dependencies[key];
  },
};

const httpAdapter = new HttpAdapter({ baseUrl: config.baseUrl });
const todoService = new TodoService({ httpAdapter });

// const contextAdapter = new ContextStoreAdapter();
// const appStore = new AppStore(contextAdapter);
const todoStore = new TodoStore();

container.add("httpAdapter", httpAdapter);
container.add("todoStore", todoStore);
container.add("todoService", todoService);
// container.add("appStore", appStore);

export { container };
