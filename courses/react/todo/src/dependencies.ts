import { HttpAdapter } from "./adapters/httpAdapter";
import { TodoService } from "./services/todo.service";
import { TodoStore } from "./store/todo.store";

const container = {
  _dependencies: {},
  add(key: string, dependency: any){ this._dependencies[key] = dependency },
  get(key: string){ return this._dependencies[key]}
};

const httpAdapter = new HttpAdapter();
const todoStore = new TodoStore();
const todoService = new TodoService();

container.add('httpAdapter', httpAdapter);
container.add('todoStore', todoStore);
container.add('todoService', todoService);


export { container };