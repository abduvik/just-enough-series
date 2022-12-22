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

### Configurations

- `e2e.baseUrl`: base url to test against

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

### Input Changes

- `cy.get(<selector>).type(<text>)`: Get a field and type into it
- `cy.get(<selector>).type(<text>{enter})`: Cypress allows typing and then clicking non-char keys like enter and it's written in braces `{...}`
- `cy.get(<selector>).click()`: Click on element
- `cy.get(<selector>).select(<label>)`: Select a value from a select field
- `cy.get(<selector>).check()`: Mark field as checked
- `cy.get(<selector>).invoke(<prop>, <value>).trigger(<event>)`: This is for custom elements. When we don't have a DOM API method. We change the value/attribute and then invoke the input/change event to affect the DOM and re-render.
  - ex `cy.get('range').invoke('value', 7).trigger('input')`

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
```

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

## Extra Content

- [Cypress Reciepes Examples](https://github.com/cypress-io/cypress-example-recipes#testing-the-dom)