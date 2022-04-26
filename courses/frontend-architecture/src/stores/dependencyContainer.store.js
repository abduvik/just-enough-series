export class DependencyContainer {
  constructor() {
    this.container = {};
  }

  add(key, dependency) {
    this.container[key] = dependency;
  }

  get(key) {
    return this.container[key];
  }
}
