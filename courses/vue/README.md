# Vue

## YouTube Video

## Summary

### Create project using Vite

```bash
npm create vite@latest contacts -- --template vue-ts
```

### Technical Details

- Vue supports using Options API or Composition API
  - Options API is similar to AngularJS and
    uses `data`, `methods`, `computed`, `watch`, `props`, `components`, `mixins`, `filters`, `directives`, `extends`, `provide`, `inject`
    as well as `setup` function starting in Vue 2.7. Mainly used a JSON object.
  - Composition API is similar to React Hooks and uses `setup` function
- Vue can be used:
  - CDN import to enhance existing static HTML pages as it doesn't require a build step
  - As npm package to be used in a build step
  - Imported as ES Module or using `importmap`
- Vue supports creating multiple Vue instances on the same page
- Vue supports creating a Vue app using `createApp` function
- Vue SFC (Single File Components) have a template, script and style
- `defineComponent`: to create a Vue component with type inference aka. TypeScript support with Options API. You don't need to use `defineComponent` when using `<script setup>` in SFC as it's only for Options API.

```vue
<template>
  <div>
    <h1>{{ title }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  setup() {
    const title = "Hello World";
    return {
      title,
    };
  },
});
</script>

<style scoped>
h1 {
  color: red;
}
</style>
```

- To register a component, you can:
  - Use `app.component` to register a global component
  - Use `components` option in Options API to register a local component
  - Just import file in `<script setup>` in SFC

```vue
<template>
  <div>
    <h1>{{ title }}</h1>
    <app-header></app-header>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppHeader from "./components/AppHeader.vue";

export default defineComponent({
  name: "App",
  components: {
    AppHeader,
  },
  setup() {
    const title = "Hello World";
    return {
      title,
    };
  },
});

// Or, using app.component
import { createApp } from "vue";
import App from "./App.vue";
import AppHeader from "./components/AppHeader.vue";

const app = createApp(App);
app.component("AppHeader", AppHeader);
app.mount("#app");
```

#### To create a Vue app

```js
import { createApp } from "vue";

// This uses the composition API
const AppComposition = {
  setup() {
    const count = ref(0);
    return {
      count,
    };
  },
};

// This uses the options API
const AppOptions = {
  data() {
    return {
      count: 0,
    };
  },
};

const app = createApp(AppOptions);

// This is how you can add global properties to the Vue app under `app.config.globalProperties`
app.config.globalProperties.$log = console.log;

app.mount("#app");
```

#### Props

- Props can be defined using `props` option in Options API or `defineProps` in Composition API
- `defineProps` returns the props object so that it can be used in the component/template
- Props can be defined as an array of strings or an object with the following properties:
  - `type`: to define the type of the prop
  - `required`: to define if the prop is required
  - `default`: to define the default value of the prop
  - `validator`: to define a validator function to validate the prop

```vue
<script lang="ts">
import { defineComponent, defineProps } from "vue";

export default defineComponent({
  name: "App",
  props: {
    title: {
      type: String,
      required: true,
      default: "Hello World",
      validator: (value) => value.length > 0,
    },
  },
  setup(props) {
    // setup() receives props as the first argument.
    console.log(props.title);
  },
});

// Or, using Options API we use this instead
export default {
  props: ["foo"],
  created() {
    // props are exposed on `this`
    console.log(this.foo);
  },
};
</script>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
    default: "Hello World",
    validator: (value) => value.length > 0,
  },
});

// Short form
const shortFormProps = defineProps(["title"]);

//Short form with type
const withTypesProps = defineProps<{ title: string }>(["title"]);
</script>
```

We can bind values of props either by passing them directly or by using `v-bind` directive.

```vue
<template>
  <div>
    <h1>{{ title }}</h1>
    <app-header :title="title"></app-header>
    <app-header v-bind:title="title"></app-header>
    <app-header v-bind:="{ title: title }"></app-header>
  </div>
</template>
```

Full list of available validation methods

```vue
<script lang="ts">
import { defineProps } from "vue";

defineProps({
  // Basic type check
  //  (`null` and `undefined` values will allow any type)
  propA: Number,
  // Multiple possible types
  propB: [String, Number],
  // Required string
  propC: {
    type: String,
    required: true,
  },
  // Number with a default value
  propD: {
    type: Number,
    default: 100,
  },
  // Object with a default value
  propE: {
    type: Object,
    // Object or array defaults must be returned from
    // a factory function. The function receives the raw
    // props received by the component as the argument.
    default(rawProps) {
      return { message: "hello" };
    },
  },
  // Custom validator function
  propF: {
    validator(value) {
      // The value must match one of these strings
      return ["success", "warning", "danger"].includes(value);
    },
  },
  // Function with a default value
  propG: {
    type: Function,
    // Unlike object or array default, this is not a factory function - this is a function to serve as a default value
    default() {
      return "Default function";
    },
  },
});
</script>
```

#### Attributes

- Attributes can be defined using `attrs` option in Options API or `ctx.attrs` in setup function or `useAttrs` in `<script setup>`
- Fallthrough attributes are passed to the root element of the component, they are `class`, `style`, and `id`. They also work with nested components.
- Attributes `v-on` and `v-bind` are also Fallthrough but only passed to the first component in case of multi-level nesting components
- Attributes `class`, `style` and `v-on` are merged with the root component
- In case we have multi-root components, we need to:
  - Use `inheritAttrs: false` in Options API to prevent automatic merging of attributes
  - Define the attributes manually in the template using `v-bind="$attrs"`
- `inherritAttrs` is `true` by default but when set to `false` we need to manually define the attributes in the template using `v-bind="$attrs"`
- Attributes are not reactive, we need to either user props or update values in the `onUpdated()` lifecycle hook

```vue
<script>
// use normal <script> to declare options
export default {
  inheritAttrs: false,
};
</script>

<script setup>
import { useAttrs } from "vue";

const attrs = useAttrs();
</script>

<div class="btn-wrapper">
  <button class="btn" v-bind="$attrs">click me</button>
</div>
```

#### Events directives

- Use `defineEmits` to define the events that can be emitted from the component. This is optional as Vue will
  infer the events from the component's template. Only used in setup function.
- `defineEmits` returns the events object so that it can be used in the component/template
- Use `emits` option in Options API
- You can call `$emit` to emit an event from the component template or call the callback function directly
- `v-on:<event_name>` is used to listen to events from children and can be shortened to `@<event_name>`
  - There are two types to pass event handlers
    - Either pass function name to the binding directive `@click="greet"`
    - or, by using inline method through calling it `@click="greet()"`
      - Pass the special `$event` to pass the event inline `@click="greet($event)"`
  - Modifiers can be used with directives to change their behavior
    - `v-on:click.stop` - Stop event propagation
    - `v-on:click.prevent` - Prevent default behavior
    - `v-on:click.self` - Only trigger event if the element is the target
    - `v-on:click.capture` - Trigger event in the capture phase
    - `v-on:click.once` - Trigger event only once
    - `v-on:click.passive` - Use passive event listener (useful for scroll and touch events to not block the main
      thread)
      - Passive event listeners are not allowed to call `preventDefault()`
      - This is useful for scroll and touch events so that the browser can optimize scrolling and not block the
        main
        thread by waiting for the events callbacks to be processed
    - `v-on:click.native` - Listen to native event on root element
    - `v-on:click.<key>` - When a certain key is pressed and values can
      be `enter`, `tab`, `delete`, `esc`, `space`, `up`, `down`, `left`, `right`
    - `v-on:click.exact` - Only trigger event when no other modifier keys are pressed

```vue
<script lang="ts">
import { defineComponent, defineEmits } from "vue";

export default defineComponent({
  name: "App",
  emits: {
    greet: (name: string) => true,
  },
  setup() {
    const greet = (name: string) => {
      console.log(`Hello ${name}`);
    };

    const emitGreet = (name: string) => {
      emit("greet", name);
    };

    return {
      greet,
      emitGreet,
    };
  },
});

// Or, using defineEmits
export default defineComponent({
  name: "App",
  emits: defineEmits(["greet"]),
  setup() {
    const greet = (name: string) => {
      console.log(`Hello ${name}`);
    };

    const emitGreet = (name: string) => {
      emit("greet", name);
    };

    return {
      greet,
      emitGreet,
    };
  },
});
</script>

<script setup lang="ts">
import { defineEmits } from "vue";

const emits = defineEmits(["greet"]);

// also with validation
const emits = defineEmits({
  greet: (name: string) => name.length > 0,
});

const greet = (name: string) => {
  console.log(`Hello ${name}`);
};

const emitGreet = (name: string) => {
  emit("greet", name);
};
</script>
```

#### v-model

If we need to pass a v-model from outside to an HTML with a v-model too, we can create a trick with a computed
property and a custom event.

```vue
<!-- CustomInput.vue -->
<script setup>
import { computed } from "vue";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>

<template>
  <input v-model="value" />
</template>
```

We can v-model to a single property. It can also be helpful if we need to do a v-model to multiple properties.

`<MyComponent v-model:title="bookTitle" />`

```vue
<script setup>
defineProps(["title"]);
defineEmits(["update:title"]);
</script>

<template>
  <input
    type="text"
    :value="title"
    @input="$emit('update:title', $event.target.value)"
  />
</template>
```

Custom modifiers for v-model

```vue
<script setup>
const props = defineProps({
  modelValue: String,
  modelModifiers: { default: () => ({}) },
});

const emit = defineEmits(["update:modelValue"]);

function emitValue(e) {
  let value = e.target.value;
  if (props.modelModifiers.capitalize) {
    value = value.charAt(0).toUpperCase() + value.slice(1);
  }
  emit("update:modelValue", value);
}
</script>

<template>
  <input type="text" :value="modelValue" @input="emitValue" />
</template>

// Add for argument v-model with modifiers
// - Defining
<script setup>
const props = defineProps(["title", "titleModifiers"]);
defineEmits(["update:title"]);

console.log(props.titleModifiers); // { capitalize: true }
</script>

// - Usage
<template>
  <MyComponent v-model:title.capitalize="myText">
</template>
```

#### Important Directives

- `v-if` - Conditional rendering. Also, there is `v-else` and `v-else-if`.
- `v-for` - Looping and rendering a list. Also there is
  - `v-for="(item, index) in items`: to have access to index
  - `v-for="item of items"`: To use JS's iterator pattern
  - `v-for="n in 10"`: To loop over a range
  - Use `:key` binding to make Vue reuse and reorder elements instead of using the default's `in-place patch` mode,
    especially with children that have states, like form elements for example.
- `v-on` - Event binding
- `v-bind` - Attribute binding (can be shortened to `:`)
  - can be used to bind to `class`, `style`, `props`, `attrs`, `domProps`, `nativeOn` and `custom directives`
  - can be used to bind to `v-model` and `v-on` (can be shortened to `@`)
  - can do boolean binding using `v-bind:[key]` or `:[key]` without passing a value
  - can be used to bind to `v-slot` (can be shortened to `#`)
  - we can have dynamic bindings using `v-bind:[key]` or `:[key]`
- `v-text` - Text binding
- `v-html` - HTML binding (useful for content HTML string from a trusted source to DOM elements)
- `v-show` - Conditional rendering using CSS `display: none`
- `v-pre` - Skip compilation for this element and its children (useful for showing raw HTML)
- `v-cloak` - Hide element until Vue is loaded (useful for showing raw HTML) (use CSS `[v-cloak] { display: none }`)
- `v-once` - Render element and component only once
- `v-slot` - Used for named slots
- JS expressions can be used in the template using `{{ }}` though it's not recommended to use it for complex expressions
  or calling functions
- `v-on:<event_name>` is used to listen to events from children and can be shortened to `@<event_name>`. Read more in events section.
- Special directives for styles
  - `:class`: To bind to string, array of class, and do contionals on classes. Styles passed through custom components
    will be added automatically to the root component. If there is more than one root, we need to use `$attrs.class`
    to bind them manually.
  - `:style`: Same to classes but for styles. Styles also supports passing an array of prefixes as values and it will
    use the one supported by the browser.
- Special directives for forms
  - `:value="text"` to pass value to form element
  - `@input="eventHandler"` to listen to form element event
  - `v-model="text"` to bind both `:value` and `@input` to a certain reactive state. But with SFC it binds to `:modelValue` and `@update:modelValue` instead.
  - We can pass `ref([])` to checkbox & multi-select to append values to it when checked
  - Special modifiers for `v-model`
    - `.lazy` To call event callback after `change` instead of `input`
    - `.number` Cast values to number
    - `.trim` remove white spaces
    - It can also support custom modifiers by reading `props.modelModifiers` property.
- Access DOM element after mounted using `ref` hook
  - `ref` is a special attribute that can be used to bind to a DOM element or a component `const input = ref(null)`.
  - Also works with `v-for` and will store an array of refs.
  - We can also pass a function to `ref` to get the element `const input = ref(el => {})` and have flexibility to where to store it.
  - We can also bind refs to a child component.
    - If Child uses Options API, we have access to everything of the child
    - If Child uses `<script setup>`, we have access to only what is exposed by the child through `defineExpose` macro which can expose any property or method (Good for HoC).
- `:is`: To dynamically render a component. We can pass a string or an imported component to it. ex: `<component :is="componentName"></component>`
  - We can wrap it also with `<KeepAlive>` to cache components. This avoid running unmounting lifecycle hooks.

#### Life Cycle Hooks

Vue has a couple of life cycle hooks that can be used to execute code at certain points in the life cycle of a
component.

- `beforeCreate` - Called before the instance is created. before processing other options such as `data()` or `computed`
- `created` - Called after the instance is created. After processing reactive data, computed properties, methods, and
  watchers but before mounting to the DOM
- `beforeMount` - Called before the instance is mounted to the DOM. Same like created but is not called on SSR.
- `mounted` - Called after the instance is mounted to the DOM. Useful for accessing the DOM or making AJAX calls. No
  SSR.
- `beforeUpdate` - Called before the instance is updated. Called after data changes but before the DOM is updated. Good
  to update state from DOM before it's updated. No SSR.
- `updated` - Called after the instance is updated. No SSR. Use `nextTick` if you need to update the state after the
  DOM is updated.
- `beforeUnmount` - Called before the instance is unmounted from the DOM. No SSR.
- `unmounted` - Called after the instance is unmounted from the DOM. Good to do clean up. No SSR.
- `errorCaptured` - Called when an error is captured in a child component
- `renderTracked` - Called when a reactive property is accessed during rendering. Dev-mode only. No SSR.
- `renderTriggered` - Called when a reactive property trigger re-render. Dev-mode only. No SSR.
- `activated` - Called when a component is activated by `<KeepAlive>`. No SSR.
- `deactivated` - Called when a component is deactivated by `<KeepAlive>`. No SSR.
- `serverPrefetch` - Called before rendering on the server. Can be used to fetch data before rendering the component.
  SSR only.

And using the `setup` function, we can have the following life cycle
hooks:

- `onBeforeMount` - Called before the instance is mounted to the DOM
- `onMounted` - Called after the instance is mounted to the DOM
- `onBeforeUpdate` - Called before the instance is updated
- `onUpdated` - Called after the instance is updated
- `onBeforeUnmount` - Called before the instance is unmounted from the DOM
- `onUnmounted` - Called after the instance is unmounted from the DOM
- `onErrorCaptured` - Called when an error is captured in a child component
- `onRenderTracked` - Called when a reactive property is accessed during rendering
- `onRenderTriggered` - Called when a reactive property is changed during rendering
- `onActivated` - Called when a kept-alive component is activated
- `onDeactivated` - Called when a kept-alive component is deactivated
- `onRenderTracked` - Called when a reactive property is accessed during rendering
- `onRenderTriggered` - Called when a reactive property is changed during rendering
- `onActivated` - Called when a kept-alive component is activated
- `onDeactivated` - Called when a kept-alive component is deactivated
- `onServerPrefetch` - Called when the component is used in `serverPrefetch` hook

[Check Official Life Cycle Diagram](https://vuejs.org/guide/essentials/lifecycle.html#lifecycle-diagram)

#### Compositions

Couple of ways to do composition in Vue:

- Mixins (not recommended for Vue 3)
- Custom Slots
- Composables
- Custom Directives
- Plugins
- Custom Filters (deprecated only for Vue 2)
- Custom Render Functions

#### Mixins

Mixins are a way to reuse code across components. They are not recommended for Vue 3. Options are combined with the component's options.

```js
const mixin = {
  created() {
    console.log(1);
  },
};

createApp({
  created() {
    console.log(2);
  },
  mixins: [mixin],
});
```

##### Slots

We can use slots to pass content/components to a component. It's like `children` in React. They are like HoC.

- Default slot: `<slot></slot>`
- Fallback content: `<slot>Fallback content</slot>`
- Named slot: `<slot name="header"></slot>`
- Dynamic slot: `<slot :name="dynamicSlotName"></slot>`
- Scoped slot: `<slot v-bind:user="user"></slot>`
- Named scoped slot: `<slot name="header" v-bind:user="user"></slot>`

```vue
<template>
  <div>
    <slot name="header"></slot>
    <slot name="footer"></slot>
  </div>
</template>

<BaseLayout>
<template v-bind:header>
  <h1>Here might be a page title</h1>
</template>
<template #header> <!-- # is short for v-bind -->
  <h1>Here might be a page title</h1>
</template>

<template #default> <!-- optional default-->
  <p>A paragraph for the main content.</p>
  <p>And another one.</p>
</template>

<template #footer>
  <p>Here's some contact info</p>
</template>

<template v-slot:[dynamicSlotName]>
  ...
</template>
</BaseLayout>
```

###### Scoped Slots

They are used to pass a state from the children to the parent. It's like using `filter` and `map` methods

Example for child Component with a scoped slot:

```vue
<template>
  <div>
    <slot v-bind:user="user">
      {{ user.lastName }}
    </slot>
  </div>
</template>
```

Example for parent Component using the scoped slot values and then using it to render a template in the child component:

```vue
<template>
  <div>
    <User>
      <template v-slot:default="slotProps">
        {{ slotProps.user.firstName }}
      </template>

      <!-- Also using destructuring: -->
      <template v-slot:default="{ user }">
        {{ user.firstName }}
      </template>
    </User>
  </div>
</template>
```

Named Scoped slots are also to pass state from the children to the parent using named slots.

Example for child Component with a named scoped slot:

```vue
<template>
  <div>
    <slot name="header" v-bind:user="user">
      {{ user.lastName }}
    </slot>
  </div>
</template>
```

Example for parent Component using the named scoped slot values and then using it to render a template in the child component:

```vue
<template>
  <div>
    <User>
      <template v-slot:header="slotProps">
        {{ slotProps.user.firstName }}
      </template>

      <!-- Also using destructuring: -->
      <template v-slot:header="{ user }">
        {{ user.firstName }}
      </template>
    </User>
  </div>
</template>
```

##### Composables

Composables are functions that can be used to share logic between components. They are like custom hooks in React.

```js
import { ref, computed } from "vue";

export function useCounter() {
  const count = ref(0);
  const double = computed(() => count.value * 2);
  const increment = () => {
    count.value++;
  };

  return {
    count,
    double,
    increment,
  };
}
```

They are better than using many mixins will result in namespace collisions and inter-dependencies are harder to manage.

If we are going to have pure logic then we use composables, otherwise we can use Renderless Components.

##### Custom Directives

They are used for custom DOM manipulation. They are like custom hooks but they are attached to the DOM.

```js
// Register a global custom directive called `v-focus`
app.directive("focus", {
  // When the bound element is inserted into the DOM...
  mounted(el) {
    // Focus the element
    el.focus();
  },
});

// Register a local custom directive called `v-focus`
export default {
  directives: {
    focus: {
      // When the bound element is inserted into the DOM...
      mounted(el) {
        // Focus the element
        el.focus();
      },
    },
  },
};
```

Also with Composition API:

```vue
<script setup>
// enables v-focus in templates
const vFocus = {
  mounted: (el) => el.focus(),
};
</script>

<template>
  <input v-focus />
</template>
```

Custom Directives can:

- Accept life cycle hooks

```js
const myDirective = {
  // called before bound element's attributes
  // or event listeners are applied
  created(el, binding, vnode, prevVnode) {
    // see below for details on arguments
  },
  // called right before the element is inserted into the DOM.
  beforeMount(el, binding, vnode, prevVnode) {},
  // called when the bound element's parent component
  // and all its children are mounted.
  mounted(el, binding, vnode, prevVnode) {},
  // called before the parent component is updated
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // called after the parent component and
  // all of its children have updated
  updated(el, binding, vnode, prevVnode) {},
  // called before the parent component is unmounted
  beforeUnmount(el, binding, vnode, prevVnode) {},
  // called when the parent component is unmounted
  unmounted(el, binding, vnode, prevVnode) {},
};

// el: the element the directive is bound to
// binding: an object containing the following properties: name, value, oldValue, expression, arg, modifiers
// vnode: the virtual node the directive is bound to
// prevVnode: the previous virtual node the directive was bound to
```

- Dynamic arguments

```html
<div v-example:[arg]="value"></div>
```

- Shorter definition

```js
const myDirective = (el, binding) => {
  // do something with el and binding
};
```

##### Plugins

Plugins are used to add global features to Vue like components, directives, providers, etc.

```js
import { createApp } from "vue";

const app = createApp({});

app.use(myPlugin, {
  /* optional options */
});

const myPlugin = {
  install(app, options) {
    // configure the app
  },
};
```

#### Async Components

We can use `defineAsyncComponent` to load components asynchronously. It returns a promise that resolves to a component.

```js
const AsyncComponent = defineAsyncComponent(() => import("./MyComponent.vue"));

// Long form
const AsyncComponent = defineAsyncComponent({
  loader: () => import("./MyComponent.vue"),
  loadingComponent: LoadingComponent,
  errorComponent: ErrorComponent,
  delay: 200,
  timeout: 3000,
  suspensible: false,
  onError: (err) => {
    // handle error
  },
});
```

##### Plugins

#### Architecture Features

##### Internal State Reactivity

Reactivity is the ability to react to changes in the internal state of the application. This is done using a Proxy
object
in Vue. Reactivity is deep by default.

Vue uses a Proxy to make the internal state reactive with methods:

- `reactive` - Make an object reactive (can be used to create a reactive object like a map or array or object)
  - Vue can detect mutating changes to arrays using methods `push`, `pop`, `shift`, `unshift`, `splice`, `sort`
    and `reverse`. It will apply these changes to the DOM.
    ` Replacing an old array with a new array doesn't case Vue to completely re-render as it can still re-use the old
    DOM using some smart comparisons.
- `ref` - Make a value reactive, can be used to create a reactive primitive value like a number or string. Values can be
  accessed using `.value` property, but this is not needed in template tag as Vue automatically unwraps the value.
- `shallowReactive` - Make an object reactive but only shallowly reactive. This is good for performance optimization or
  integration with external state management libraries.
- `shallowRef` - Make a value reactive but only shallowly reactive.
- `computed` - Create a computed value that is cached based on its dependencies. This is useful for expensive operations
  that don't need to be re-computed every time the internal state changes. You may use methods instead of computed
  values if you don't want to cache the value or if you want to re-compute the value every time the internal state
  changes as it's not part of Vue reactivity system like `Date.now()`.
- `defineProps` - Define props for a component. or use `props` option in Options API.
- `defineEmits` - Define emits for a component. or use `emits` option in Options API. This is optional. Only available in Vue 3.
- `$emit` - Emit an event from a component. or use `this.$emit` in Options API.

```vue
<script setup>
import { reactive, ref, computed } from "vue";

defineProps({
  // available globally as it's a compile-time macro
  name: String,
});

const state = reactive({
  count: 0,
});

const count = ref(0);

const computedCount = computed(() => {
  return state.count + count.value;
});
</script>
```

##### Side effects

We can do side effects in Vue using the `watch` function. This function takes a reactive value and a callback function. Reactive values can be:

- a single reactive value either from `ref` or `reactive`
- a function that returns a reactive value aka a getter function. Useful when you want to watch a property of an object.
- an array of reactive values which can be a mix of the above two

Important Options passed to `watch`:

- `deep` - Watch for changes in nested properties of the reactive value. This is useful when you want to watch for
  changes in an object or array without returning a new object or array.
- `immediate` - Call the callback function immediately with the current value of the reactive value.
- `flush` - Controls when the callback function is called. Can be `pre` or `post`. `pre` is called before the DOM is
  updated and `post` is called after the DOM is updated. `pre` is the default value. or use `watchPostEffect`

If you don't want to pass the dependencies to watch and make it listen to what it includes automatically similar to computed values,
you can use the `watchEffect` function. Note that `watchEffect` will run immediately too like `watch` with `immediate` option.

If you created a watcher asynchronously for example using `setTimeout` or `setInterval`, the watch function will return a function that you can call to stop the watcher.

Example:

```vue
<script setup>
const x = ref(0);
const y = ref(0);

// single ref
watch(x, (newX) => {
  console.log(`x is ${newX}`);
});

// getter
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`sum of x + y is: ${sum}`);
  }
);

// array of multiple sources
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`);
});

// deep watch
watch(
  () => x.value, // use deep option or return a new object
  () => console.log(`sum of x + y is`),
  { deep: true }
);

// immediate watch
watch(
  data, // use deep option or return a new object
  () => fetchData(),
  { immediate: true }
);

// watchEffect to watch all dependencies automatically inside the callback
watchEffect(async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  );
  data.value = await response.json();
});

// Running unwatch when we create a watcher asynchronously
let unwatch;
setTimeout(() => {
  unwatch = watchEffect(() => {});
}, 100);
unwatch();
</script>
```

##### Shared State and Store Management

Vue provides a `provide` and `inject` API to share state between components. This is similar to React's Context API.

This is useful to:

- Share state between components without having to pass it down as props (props drilling)
- Share state between components on same level without having to use a parent component to pass it down as props

```vue
<script setup>
import { provide } from "vue";

const state = reactive({
  count: 0,
});

provide("state", state); /** key, value */
provide("state", readonly(state)); /** readonly state */

export const DependencySymbol = Symbol();
provide(DependencySymbol, new Dependency()); // symbols can help to avoid clashes because of strings
</script>

<script>
import { inject } from "vue";

const state = inject("state");
const state = inject("state", "default value");
const state = inject("state", () => new DefaultFactory()); // Useful to avoid creating an object if it's not used
</script>
```

Also, we can create an app wide provider

```js
const app = createApp(App);
app.provide("state", state);
```

We can also export a normal reactive object and use it as a store between components. This is useful when we don't want to use the `provide` and `inject` API.

```js
// store.js
import { reactive } from "vue";

export const store = reactive({
  count: 0,
  increment() {
    this.count++;
  },
});
```

```vue
<template>
  <button @click="store.increment()">From B: {{ store.count }}</button>
</template>
```

Or use a store library like [Vuex](https://vuex.vuejs.org/) and [Pinia](https://pinia.vuejs.org/).

### Built-in Components

- `<component :is="button">` - Dynamically render a component. Useful for rendering different components based on a condition.

```vue
<script setup>
import Button from "./Button.vue";
</script>
<template>
  <component :is="Button"></component>
</template>
```

- `<Transition>` - Add transition effects to a component. Useful for adding fade in/out effects to a component. We can also listen to js events.

```vue
<template>
  <Transition
    name="custom-classes"
    enter-active-class="animate__animated animate__tada"
    leave-active-class="animate__animated animate__bounceOutRight"
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @after-enter="onAfterEnter"
    @enter-cancelled="onEnterCancelled"
    @before-leave="onBeforeLeave"
    @leave="onLeave"
    @after-leave="onAfterLeave"
    @leave-cancelled="onLeaveCancelled"
  >
    <p v-if="show">hello</p>
  </Transition>
</template>
```

- `<TransitionGroup>` - Add transition effects to a list of components. Useful for adding fade in/out effects to a list of components.

```vue
<template>
  <TransitionGroup
    tag="ul"
    :css="false"
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @leave="onLeave"
  >
    <li
      v-for="(item, index) in computedList"
      :key="item.msg"
      :data-index="index"
    >
      {{ item.msg }}
    </li>
  </TransitionGroup>
</template>
```

- `<KeepAlive>` - Cache a component. Useful for caching a component so that it doesn't get destroyed when it's not visible so we don't need to re-run lifecycle hooks (aka mounted). Though two life cycle hooks `activated` and `deactivated` are called when the component is cached and uncached respectively.

```vue
<template>
  <KeepAlive>
    <component :is="activeComponent" />
  </KeepAlive>
  <KeepAlive :include="/a|b/">
    <component :is="view" />
  </KeepAlive>
  <KeepAlive :max="10">
    <component :is="activeComponent" />
  </KeepAlive>
</template>
```

- `<Teleport>` - Teleport a component to a different location in the DOM. Useful for rendering a component outside of the current component's DOM tree. But props and events still works as normal.

```vue
<template>
  <Teleport to="#teleport-target">
    <div>hello</div>
  </Teleport>
</template>
```

- `<Suspense>` - If we have components tree with async render method, instead of having multiple spinners we can use `<Suspense>` to show a single spinner until all the async components are loaded.

```vue
<template>
  <Suspense>
    <template #default>
      <component :is="activeComponent" />
    </template>
    <template #fallback>
      <div>loading...</div>
    </template>
  </Suspense>
</template>
```

## Extra

### Why Vue vs React?

- React is like a manual car, Vue is like an automatic car while Angular is like a plane.
- React has a very small API surface area which is easier to learn and help build complex structures but this openness
  can also lead to do bad unoptimized code if experience is not high
- Vue focuses on separation of CSS/HTML/JS while React likes to bundle everything together with JSX and CSS-in-JS
- If you are more experienced with JavaScript, React is a better choice otherwise Vue is a better choice
- If you have AngularJS experience, Vue (especially using Options API) would seem more familiar
- Vue is more opinionated than React but less than Angular
- Re-rendering is already handled by Vue so you don't have to worry about it unlike React
- It's easy to add VueJs natively to the browser without any build tools unlike React's JSX
- Vue is backed by the community while React is backed by Facebook
- Vue can be more flexible than React as it provides many helper functions that are optional to be used
- Javascript is like Assembly, React is like C, Vue is like Javascript and Angular is like Java/.Net

- [Reddit discussion](https://www.reddit.com/r/javascript/comments/8o781t/vuejs_or_react_which_you_would_chose_and_why/)

#### Vue in HTML directly

We can actually use Vue in HTML directly without any build tools. This is useful for quick prototypes or small projects.

Some things to note:

- HTML tags are case-insensitive
- We have to use kebab-case as HTML doesn't support camelCase. So we need to use it for everything including components, props and events.
- We can't use self-closing tags that HTML does not support
- HTML has rules on some elements including other elements like `<ul>`, `<ol>`, `<table>` and `<select>`
  - You can use `is` attribute to change the element type and as a workaround for this. Need to prefix it with `vue:`

```html
<div id="app">
  <p>{{ message }}</p>
  <table>
    <tr is="vue:blog-post-row"></tr>
  </table>
</div>

<script src="https://unpkg.com/vue@next"></script>
<script>
  const app = Vue.createApp({
    components: {
      "blog-post-row": {
        template: "<tr><td>Blog Post</td></tr>",
      },
    },
    data() {
      return {
        message: "Hello Vue!",
      };
    },
  });
  app.mount("#app");
</script>
```

#### SPC Custom Blocks

They are a way to add custom blocks to SFCs (ex: script, template & style) and use them in build tools. This is useful for adding custom blocks to SFCs that are not supported by default.
They are then handled by loaders (either Vite or Webpack) using custom loaders.

[Read Full Documentation](https://vue-loader.vuejs.org/guide/custom-blocks.html)

```vue
<docs>
## This is an Example component.
</docs>

<template>
  <h2 class="red">{{ msg }}</h2>
</template>
```

```js
// wepback.config.js
module.exports = {
  module: {
    rules: [
      {
        resourceQuery: /blockType=docs/,
        loader: require.resolve("./docs-loader.js"),
      },
    ],
  },
};
```

#### Routing

- [Vue Router](https://router.vuejs.org/)

and a simple example:

```vue
<script setup>
import { ref, computed } from "vue";
import Home from "./Home.vue";
import About from "./About.vue";
import NotFound from "./NotFound.vue";

const routes = {
  "/": Home,
  "/about": About,
};

const currentPath = ref(window.location.hash);

window.addEventListener("hashchange", () => {
  currentPath.value = window.location.hash;
});

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || "/"] || NotFound;
});
</script>

<template>
  <a href="#/">Home</a> | <a href="#/about">About</a> |
  <a href="#/non-existent-path">Broken Link</a>
  <component :is="currentView" />
</template>
```

### Tooling

- Project Creation:
  - [Vite](https://vitejs.dev/)
  - [Vue CLI](https://cli.vuejs.org/) (Webpack based)
- IDE Support:
  - [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- Browser DevTools:
  - [Vue DevTools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- TypeScript Support:
  - [Full guide](https://vuejs.org/guide/typescript/overview.html)
- Testing:
  - [Cypress](https://www.cypress.io/)
  - [Vue Testing Library](https://testing-library.com/docs/vue-testing-library/intro/)
  - [Vitest](https://vitest.dev/)
  - [Jest](https://jestjs.io/)
- Linting & Formatting:
  - [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue)
  - [Prettier](https://prettier.io/)

## Extra links

- [Vue 2 to Vue 3 migration guide](https://v3-migration.vuejs.org/)
- [Form validation with vuelidate](https://github.com/vuelidate/vuelidate)
