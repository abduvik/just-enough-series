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

#### Shared State

#### Computed State

#### Props

#### Events

#### Side Effects

#### Change Detection

### Patterns

#### Component

#### Container

#### HoC

#### Service

#### Adapater

#### Store

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

- `createbrowserrouter`: Uses the DOM Hostory APi and is the recommended router
- `createHasRouter`: Use the `#` to append the routes
- `createMemoryRouter`: Use memory, recommended for writing tests

## Extra content

- [What Is React Fiber? React.js Deep Dive #2](https://www.youtube.com/watch?v=0ympFIwQFJw)
- [React 16 (React Fiber) explained as simply as possible](https://www.youtube.com/watch?v=gsvHmZ3hXjo&t=166s)
