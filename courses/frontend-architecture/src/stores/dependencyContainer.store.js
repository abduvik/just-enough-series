export class DependencyContainer {
  constructor() {
    this.container = {};
  }

  add(key, dependency) {
    this.container[key] = dependency;
  }

  getDependency(key) {
    return this.container[key];
  }
}
