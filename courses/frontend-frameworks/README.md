# Frontend Frameworks

## Comparison

|           | Internal State        | Shared State               | Computed State | Side Effects         | Props                     | Events     | Reactivity          |
| --------- | --------------------- | -------------------------- | -------------- | -------------------- | ------------------------- | ---------- | ------------------- |
| React     | `useState`            | `useContext`               | `useMemo`      | `useEffect`          | Arguments/Class Variables | Callbacks  | Virtual DOM (Fiber) |
| Angular   | Class Variables       | Sevices/`NgRx`             | Function       | `ngAfterViewChecked` | `@Input`                  | `@Output`  | Zones.js            |
| VueJs     | `reactive()`/`data()` | `provide`/`inject`         | `computed`     | `watch`              | `props`                   | `$emit`    | Virtual DOM (Proxy) |
| AngularJs | `$state`              | Services                   | Functions      | `$watch`             | Class Variables           | Callbacks  | $digest Cycle       |
| SolidJs   | `createSignal`        | `useContext`               | `createMemo`   | createEffect`        | Arguments                 | Callbacks  | Direct (N/A)        |
| Svelte    | Variables             | `setContenxt`/`getContext` | `$:`           | `afterUpdate`        | `export`                  | `dispatch` | Direct (N/A)        |

## Framework Component

### State

It's divided into:

- Internal State: Used to keep the state of a single component/container
- External State: Used to store state in an external object and use listners to update them
- Computed State: This is a state drived from another state

### Communication

Communication is trying to change the Model through the Controller and then render the View.

It's done through:

- Props: To pass data from parent to child
- Events: To pass data from child to parent

Communication should be in a one-direction flow:

- For internal communication

```
Event -> State -> Render
```

- For external communication (can be done from between child & parent or container & service)

```
Event (Child) -> Listener (Parent) -> State (Parent) -> Render (Parent) -> Render (Child)
```

### Side-effects

It's how frameworks handles side effects that are not part of the single flow of data. Usually they are done either with Life Cycle hooks or watchers

### Reactivity (Renderer)

It's how each library finds the data changes and then updates the DOM tree

Where is angular?

- Priodical (AngularJs)
- Virtual DOM (React & Vue)
- Real binding (Svelte & SolidJs)

## Good Articles

- [React Virtual DOM and Internals](https://reactjs.org/docs/faq-internals.html#gatsby-focus-wrapper)
- [Reactivity in Depth for VueJs](https://vuejs.org/guide/extras/reactivity-in-depth.html)
- [Understanding Zones](https://blog.thoughtram.io/angular/2016/01/22/understanding-zones.html)
- [Angular Change Detection](https://angular.io/guide/change-detection)
- [Change And Its Detection In JavaScript Frameworks](https://teropa.info/blog/2015/03/02/change-and-its-detection-in-javascript-frameworks.html)
- [SolidJS Reactivity](https://www.solidjs.com/guides/reactivity)
- [Svelte Reactivity](https://svelte.dev/blog/svelte-3-rethinking-reactivity)
