# React

## YouTube Video

## Tooling

- Create a new app using `create-react-app`

```shell
npm install -g create-react-app
npx create-react-app todo --template typescript
```

## Summary

### Features

#### Internal State

- `useState` hook

```tsx
export const TodoContainer = (props: TodoContainerProps) => {
    const [todos, setTodos] = useState<Todo[]>([]);
    '...'
};
```

#### Computed State

They are computed from the internal state. When using `useMemo` & `useCallback` hook, the function is only called when
the dependencies change.
They are useful when you want to avoid re-rendering the child component when the internal state of the parent changes.

- `useMemo`hook

```tsx
export const TodoContainer = (props: TodoContainerProps) => {
    '...'
    const undoneTodos = useMemo(() => todos.filter(todo => !todo.done), [todos]);
    '...'
};

```

- `useCallback` hook

```tsx
export const TodoContainer = (props: TodoContainerProps) => {
    '...'
    const addTodo = useCallback((todo: Todo) => {
        setTodos([...todos, todo]);
    }, [todos]);
    '...'
};
```

Components that use the `useMemo` & `useCallback` hook are called `Memoized Components`. They are useful when you want
to avoid re-rendering the child component when the internal state of the parent changes.
To avoid re-rendering the child component, you can use `React.memo` or `React.PureComponent`.

#### Shared State

- `React.createContext` and `useContext` hooks

```tsx
export const TodoContainer = (props: TodoContainerProps) => {
    '...'
    const {todos, setTodos} = useContext(TodoContext);
    '...'
};
```

#### Props

- `React.PropsWithChildren` type

```tsx
export const TodoContainer = (props: TodoContainerProps) => {
    '...'
    return (
        <div className="todo-container">
            <TodoForm addTodo={props.addTodo}/>
            <TodoList todos={props.todos}/>
            <TodoStats todos={props.todos}/>
        </div>
    );
};
```

#### Events

```tsx
export const TodoContainer = (props: TodoContainerProps) => {
    '...'
    return (
        <div className="todo-container">
            <TodoList onToggleTodo={props.onToggleTodo}/>
        </div>
    );
};
```

#### Side Effects

- `useEffect` hook

```tsx
export const TodoContainer = (props: TodoContainerProps) => {
    '...'
    useEffect(() => {
        props.loadTodos();
    }, []);
    '...'
};
```

#### Change Detection

React uses a virtual DOM to detect changes. It compares the virtual DOM with the real DOM and updates the real DOM only
when there are changes.

React changes detection is called reconciliation. It is a process of comparing two trees and figuring out the minimum.
It is called React Fiber.

### Patterns

#### Component

They hold the visual representation of the data. They are stateless and receive data via props.

- `React.FC` type

```tsx
export const TodoItem: React.FC<TodoContainerProps> = (props) => {
    '...'
};
```

#### Container

They hold the state and logic of the application. They are stateful and receive data via props.

- `React.FC` type

```tsx
export const TodoContainer: React.FC<TodoContainerProps> = (props) => {
    '...'
};
```

#### HoC

They are functions that take a component as an argument and return a new component.

- `React.FC` type

```tsx
export const withTodoContainer = (Component: React.FC<TodoContainerProps>) => {
    '...'

    return (props: TodoContainerProps) => {
        '...'
        return <Component {...props} {...containerProps}/>;
    };
};
```

#### Service

They are functions that hold the business logic of the application. They are stateless and receive data via arguments.
Famous examples are: API calls and State Management etc.

```tsx
export class TodoService {
    public static addTodo = (todos: Todo[], todo: Todo): Todo[] => {
        '...'
    };
}
```

#### Adapter

They allow us to use different implementations of the same interface. They are stateless and receive data via arguments.

```tsx
export class HttpAdapter {
    public static get = (url: string): Promise<any> => {
        '...'
    };
}
```

#### Store

They hold the state of the application. They are stateful and receive data via props.

Famous examples are: Redux, MobX, React Context etc.

```tsx
export class TodoStore {
    public todos: Todo[] = [];

    public addTodo = (todo: Todo): void => {
        '...'
    };
}

export const TodoContext = React.createContext(new TodoStore());
```

## Reactivity in React

Reactivity in React is made possible through the use of a virtual DOM (Document Object Model). The virtual DOM is a
lightweight in-memory representation of the actual DOM that is used to calculate the changes that need to be made to the
actual DOM in order to update the UI. When the state or props of a component change, the virtual DOM is updated to
reflect the new data. Then, the virtual DOM calculates the differences between the current virtual DOM and the previous
virtual DOM, and applies those changes to the actual DOM in an efficient manner.

## Important Libraries

### [react-router](https://reactrouter.com/en/main/start/overview)

Official routing system for react and support multiple features:

- Client Routing (dah :D)
- Nested Routing
- Passing params from route to react using `useMatch`
- Correct Route ranking according to multiple factors
- Passing current active link using `useMatch` and in the `NavLink`
- Data loading while navigation using `loader` prop in `Route`
- Redirects using `redirect` method
- Pending state using `useNavigation`
- Render UI while fetching data using `<Suspense>`+`<Await>`+`defer()`
- Listening to form submissions using `<Form>` and `action` prop in the `Router`
- Optimistic UI (preticate the api with always success) using `useFetcher`
- Error Handing using `errorElement` prop
- Scroll Restoration on navigation using `<ScrollRestoration />`

There are couple of routers supported

- `createbrowserrouter/BrowserRouter`: Uses the DOM Hostory APi and is the recommended router
- `createHasRouter`: Use the `#` to append the routes
- `createMemoryRouter`: Use memory, recommended for writing tests
- `StaticRouter`: Used for server side rendering

## Extra content

- [Lin Clark - A Cartoon Intro to Fiber - React Conf 2017](https://www.youtube.com/watch?v=ZCuYPiUIONs)
- [What Is React Fiber? React.js Deep Dive #2](https://www.youtube.com/watch?v=0ympFIwQFJw)
- [React 16 (React Fiber) explained as simply as possible](https://www.youtube.com/watch?v=gsvHmZ3hXjo&t=166s)
