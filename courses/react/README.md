# React

## YouTube Video

[![Advanced React Course with Typescript, React Router, React SSR and Clean Frontend Architecture youtube thumbnail](http://img.youtube.com/vi/5hXoIIRoWqQ/0.jpg)](http://www.youtube.com/watch?v=5hXoIIRoWqQ "Advanced React Course with Typescript, React Router, React SSR and Clean Frontend Architecture")

## Tooling

- Create a new app using `create-react-app`

```shell
npm install -g create-react-app
npx create-react-app todo --template typescript
```

> Note: Please don't use `create-react-app` for production projects

## Project Commands

- `npm start` - start the development server
- `npm run build` - build the production bundle
- `npm run server` - start the API server
- `npm run build:ssr` - build the SSR bundle
- `npm run server:ssr` - start the SSR Sever

## Summary

### Components Types

- `ReactElement` - the result of a component function
- `ReactNode` - `ReactElement | ReactText`
- `ComponentType` - a component that can be rendered
- `PropsWithChildren` - props with `children` prop

### Features

#### Internal State

- `useState` hook

```tsx
export const TodoContainer = (props: TodoContainerProps) => {
    const [todos, setTodos] = useState<Todo[]>([]);
    '...'
};
```

- [Why use functions for useState instead of value directly](https://reactjs.org/docs/react-component.html#setstate)

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

        return cleanUpMethod;
    }, []);
    '...'
};
```

`useEffect` run twice when using `React.StrictMode` as a way to protect against unpredicted or bad side effects. This to
make sure you call the clean-up function for example and make sure the components are always predictable.

#### Change Detection

Reactivity in React is made possible through the use of a virtual DOM (Document Object Model). The virtual DOM is a
lightweight in-memory representation of the actual DOM that is used to calculate the changes that need to be made to the
actual DOM in order to update the UI. When the state or props of a component change, the virtual DOM is updated to
reflect the new data. Then, the virtual DOM calculates the differences between the current virtual DOM `workInProgress`
and the previous virtual DOM, and applies those changes to the actual DOM in an efficient manner.

This happens in two phases:

1. `render` phase - React creates the new Virtual DOM
2. `commit` phase - React updates the DOM

React changes detection is called reconciliation. It is a process of comparing two trees and figuring out the minimum.
The reconciliation is done in chunks. This is to avoid blocking the main thread.

Two methods are used to queue the changes:

- `requestIdleCallback` - when the browser is idle, for high priority updates
- `requestAnimationFrame` - when the browser is ready to paint, for low priority updates

The old reconciliation algorithm is called `Stack Reconciliation`. The new one is called `Fiber Reconciliation`.

### Patterns

#### Component

They hold the visual representation of the data. They are stateless and receive data via props.

```tsx
export const TodoItem: React.FC<TodoContainerProps> = (props) => {
    '...'
};
```

#### Container

They hold the state and logic of the application. They are stateful and receive data via props.

```tsx
export const TodoContainer: React.FC<TodoContainerProps> = (props) => {
    '...'
};
```

#### HoC

They are functions that take a component as an argument and return a new component.

```tsx
export const withTodoContainer = (Component: ComponentType<typeof Component>) => {
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

There are a couple of routers supported

- `createbrowserrouter/BrowserRouter`: Uses the DOM Hostory APi and is the recommended router
- `createHasRouter`: Use the `#` to append the routes
- `createMemoryRouter`: Use memory, recommended for writing tests
- `StaticRouter`: Used for server side rendering

## Extra content

- [Lin Clark - A Cartoon Intro to Fiber - React Conf 2017](https://www.youtube.com/watch?v=ZCuYPiUIONs)
- [What Is React Fiber? React.js Deep Dive #2](https://www.youtube.com/watch?v=0ympFIwQFJw)
- [React 16 (React Fiber) explained as simply as possible](https://www.youtube.com/watch?v=gsvHmZ3hXjo&t=166s)
