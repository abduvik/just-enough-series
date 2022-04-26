export class RouterStore {
  constructor() {
    this.routeMaps = {};
    this.NotFoundPageRenderer = () => document.createElement('div');
  }

  getRoute() {
    return window.location.pathname;
  }

  setNotFoundPage(NotFoundPageRenderer) {
    this.NotFoundPageRenderer = NotFoundPageRenderer;
  }

  setRoutePageRender(route, renderer) {
    this.routeMaps[route] = renderer;
  }

  renderFromRouter() {
    const currentRoute = this.getRoute();

    const renderer = this.routeMaps[currentRoute] || this.NotFoundPageRenderer;

    return renderer();
  }
}
