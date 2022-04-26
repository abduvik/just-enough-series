export class RouterStore {
  constructor() {
    this.routes = [];
    this.NotFoundPageRenderer = () => document.createElement('div');
  }

  getCurrentRoute() {
    return window.location.pathname;
  }

  setNotFoundPage(NotFoundPageRenderer) {
    this.NotFoundPageRenderer = NotFoundPageRenderer;
  }

  setRoutePageRender(route, renderer) {
    this.routes.push({
      matcher: new RegExp(`^${route}$`),
      renderer,
    });
  }

  renderFromRouter() {
    const currentRoute = this.getCurrentRoute();

    const matchedRenderer = this.routes.find(({ matcher }) => {
      return matcher.test(currentRoute);
    });

    return matchedRenderer
      ? matchedRenderer.renderer()
      : this.NotFoundPageRenderer();
  }
}
