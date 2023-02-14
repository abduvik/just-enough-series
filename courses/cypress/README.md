# Cypress & E2E

## YouTube Video

## E2E Summary

## Summary

Cypress is an E2E testing tool.

- It uses jQuery under the hood as selector for elements. So all jQuery methods are valid
  - Like `first`, `last`, `each`, `find`
- When tests are done, it stops and doesn't close which is helpful if we would like to jump to a certain point in time. Absence of failure is a success.
- Configure in `cypress.json` or `cypress.config.js`
- Cypress is a test runner and it uses `Chai` assertion library. It's done by `should` method.
- All `cy` methods are async
- Cypress commands do not return their subjects, they yield them. Remember: Cypress commands are asynchronous and get queued for execution at a later time. During execution, subjects are yielded from one command to the next, and a lot of helpful Cypress code runs between each command to ensure everything is in order.
- Almost all commands come with built-in retry-ability. Without retry-ability, assertions would randomly fail. This would lead to flaky, inconsistent results.
- Many commands have default, built-in assertions, or rather have requirements that may cause it to fail without needing an explicit assertion you've added.

### Commands

- `cypress open`: Start the testing tool
- `cypress run`: Run tests headless

### Configurations

- `e2e.baseUrl`: base url to test against
- `e2e.experimentalStudio`: Enable/Disable Cypress Studio which is helpful for recording tests instead of writing the code
- `viewportWidth`: Testing window width
- `viewportHeight`: Testing window height

### APIs

Core

- `cy.visit(<url>)`: Go to a page
- `cy.contains(<text>)`: Get element containing a text
- `cy.get(<selector>).each(λ)`: Get a field and loop evey element as if it's a unit test without async
- `cy.get(<selector>).then(λ)`: Yields the field so we can access it and do assertions like unit tests
- `cy.wrap(<element>)`: Change a DOM element (ex: from `each`) into a Cypress object to chain it with Cypress methods
- `cy.get(<selector>).as(<alias>)`: Create alias for a selector. Alias can later be used as `cy.get('@alias')`.
- `cy.get(<selector>).invoke(<method>)`: Invoke a method/get prop for the selected DOM element. You can also alias a value of an element and use it later like `cy.get('label').invoke('text').as('projectName')`.
- `cy.title()`: Get title of the page
- `cy.location(<prop>)`: Get a certain prop of the location object. ex: `cy.location('pathname')`.
  - Others are: `host`, `origin`, `href`, `search`, `hash`, `hostname`, `protocol`, `toString`, ...
- `cy.get(<field_selector>).invoke('prop', 'validity').its('<validityObjectProp>').should(<condition>)`: Input fields have validity props which we can use to know if the field is valid and what is the error if exists
- `cy.setCookie()`: Set Cookies
- `cy.getCookie()`: Get
- `cy.request(method, url, body)`: Send an API request
- `cy.get(<selectorA>).find(<selectorB>)`: It will try to find the element B in element A. If you chain two `get`, it will look in the whole document and return both of them. Check [Get vs Find](https://docs.cypress.io/api/commands/get#Get-vs-Find)
  The cy.get command always starts its search from the cy.root element. In most cases, it is the document element, unless used inside the .within() command. The .find command starts its search from the current subject.
- `cy.session`: It's used to create a session to avoid re-logging again for each step. Make sure to start the method with a `cy.visit`

````js
cy.session('loginSessionName', () => {
  cy.visit('/');

  // steps
});

// it's also possible to have it as an array
cy.session([username, password], () => {
  cy.visit('/');

  // steps
});
```

### Input Changes

- `cy.get(<selector>).type(<text>)`: Get a field and type into it
- `cy.get(<selector>).type(<text>{enter})`: Cypress allows typing and then clicking non-char keys like enter and it's written in braces `{...}`
- `cy.get(<selector>).clear()`: Clear text field. It's good to clear before typing too to remove defaults
- `cy.get(<selector>).clear().type()`: Chaining to clear and type
- `cy.get(<selector>).click()`: Click on element
- `cy.get(<selector>).select(<label>)`: Select a value from a select field
- `cy.get(<selector>).check()`: Mark field as checked
- `cy.get(<selector>).invoke(<prop>, <value>).trigger(<event>)`: This is for custom elements. When we don't have a DOM API method. We change the value/attribute and then invoke the input/change event to affect the DOM and re-render.
  - ex `cy.get('range').invoke('value', 7).trigger('input')`
- `cy.get(<selector>).its(<prop>)`: Get a property's value on the previously yielded subject.
- `cy.get('input[type=file]').selectFile('file.txt', {force: true});`: Upload file to a file input field
- `cy.reload()`: Reloads the page

### Assert statements

Assetions can be implicit or explicit.

Implicit Assertions:

- `cy.get(<selector>).should('exists')`: Assert if it exists
- `cy.get(<selector>).should('have.value', <value>)`: Asset it has value
- `cy.get(<selector>).should('be.checked')`: Checkbox is checked
- `cy.get(<selector>).should(<condition1>).and(<condition2>)`: To do two conditions on the same element

Explicit Assertions using `expect`:

```js
cy.get("tbody tr:first").should(($tr) => {
  expect($tr).to.have.class("active");
  expect($tr).to.have.attr("href", "/users");
});
````

### Cypress Tasks and Commands

They are a way to abstract common functions:

- Tasks: They are executed on the server/Cypress's node thread. Mainly to seed databases, write to I/O and so on.
- Commands: They are executed on the browsers and they are a way to abstract repeated functions.

Tasks

```js
// in cypress.config.js
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        log(message) {
          console.log(message);

          return null;
        },
      });
    },
  },
});

// in a test

beforeEach(() => {
  cy.task("log", "run seeding db");
});
```

Commands

```js
// define
Cypress.Commands.add("login", (email, pw) => {});
Cypress.Commands.add("checkToken", (token) => {
  cy.window().its("localStorage.token").should("eq", token);
});

// Usage
cy.login("user", "1234");
cy.checkToken("abc123");
```

### Timeouts

Cypress commands timeout after 4000ms by default if they failed to succeed. Different commands have different default timeouts as well, for example:

- `cy.visit()`: 6,000ms
- `cy.exec()`: 60,000ms
- `cy.wait()`: 5,000ms for routing + 30,000ms for server responses

We can change these timeouts

```js
// 🚨 DOES NOT WORK
cy.get(".selector").should("be.visible", { timeout: 1000 });
// ✅ THE CORRECT WAY
cy.get(".selector", { timeout: 1000 }).should("be.visible");
```

### API Interceptions and Mocking

Cypress allows to intercept API calls to either stub them or even mock them.

`cy.intercept(<matcher>, <response>)`

- `<matcher>`: can be `url` or `method, url` or `routeMatcher`
- `<response>`: is optional an can be `staticResponse` and `routeHandler`

We can also use fixtures for a full file

- `cy.intercept('/users.json', { fixture: 'users.json' })`

You can create a script that updates your fixtures with real data which would be more valuable than using objects inside the code.

### Tips

When writing a test, it can be in the following format:

- Seed
- Do action
- Confirm action effect is done correctly (reduces flakiness)
- Assert (optional)
- Do more actions

Have a css global styles to know which items have data-testid values already

```css
[data-testid]:not([data-testid=""]) {
  border: 2px solid red;
}
```

To access other `data-*` attribute use

`cy.get().invoke('data', 'another-data-attribute')`

If you need to clean-up seeding, add it in the `before` & `beforeEach` and not in `after` or `afterEach` to make sure they run every time we run the tests since we can interrupt the test in the middle and clean-up won't run by then.

When creating a new test, build it with `it.only` to make sure it can run independently.

### Libraries that Cypress uses

- `mocha`: To organize tests using `it`, `describe`
- `chai`: as assertion library for tests
- `chai-jquery`: extends chai with jquery methods
- `sinon`: for stubs and spies
- `sinon-chai`: Integrate both of them
- `lodash`: By using `Cypress._`
- `jquery`: By using `Cypress.$`

[Full list here](https://docs.cypress.io/guides/references/bundled-libraries)

## Extra Content

- [Cypress Reciepes Examples](https://github.com/cypress-io/cypress-example-recipes#testing-the-dom)
- [Awesome Cypress](https://github.com/brunopulis/awesome-cypress)
