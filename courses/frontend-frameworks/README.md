# Frontend Frameworks

## Comparison

## Framework Component

|                | React        | Angular   | VueJs               | AngularJs  | SolidJs | Svelte |
| -------------- | ------------ | --------- | ------------------- | ---------- | ------- | ------ |
| Internal State | `useState`   | -------   | `data()`            | `$state`   | ------- | ------ |
| Shared State   | `useContext` | -------   | `provide`/`inject`  | `services` | ------- | ------ |
| Computed State | Functions    | -------   | `computed`          | Functions  | ------- | ------ |
| Side Effects   | `useEffect`  | -------   | `watch`             | `$watch`   | ------- | ------ |
| Props          | Variables    | `@Input`  | `props`             | Variables  | ------- | ------ |
| Events         | Callbacks    | `@Output` | `$emit`             | Callbacks  | ------- | ------ |
| Renderer       | Virtual DOM  | -------   | Virtual DOM & Proxy | ---------  | ------- | ------ |

### State

It's divided into:

- Internal State: Used to keep the state of a single component/container
- External State: Used to store state in an external object and use listners to update them
- Computed State: This is a state drived from another state

State should be part of the single flow of data where

```
Event -> State -> Render
```

```
Event (Child) -> Listener (Parent) -> State (Parent) -> Render (Parent) -> Render (Child)
```

### Side-effects

It's how frameworks handles side effects that are not part of the single flow of data

### Communication

It's done through:

- Props: To pass data from parent to child
- Events: To pass data from child to parent

### Renderer

It's how each library finds the data changes and then updates the DOM tree

Where is angular?

- Priodical (AngularJs)
- Virtual DOM (React & Vue)
- Real binding (Svelte & SolidJs)
