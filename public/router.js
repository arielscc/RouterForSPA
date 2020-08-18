class Router {
  constructor(routes) {
    this.routes = routes;
    this.loadInitialRoute();
  }

  loadRoute(...urlSegs) {
    const matchedRoute = this.matchUrlToRoute(urlSegs);
    const url = `/${urlSegs.join('/')}`;
    history.pushState({}, 'this works', url);

    const routerOutElm = document.querySelectorAll('[data-router]')[0];
    routerOutElm.innerHTML = matchedRoute.template;
  }

  loadInitialRoute() {
    const pathNameSplit = window.location.pathname.split('/');
    const pathSegs = pathNameSplit.length > 1 && pathNameSplit.slice(1);
    this.loadRoute(...pathSegs);
  }

  matchUrlToRoute(urlSegs) {
    const matchedRoute = this.routes.find(({ path }) => {
      const resp = new RegExp(`^${path}$`, 'g').test(`/${urlSegs}`);
      return resp;

      // const routePathsegs = route.path.split('/').slice(1);
      // if (routePathsegs.length !== urlSegs.length) {
      //   return false;
      // }
      // return routePathsegs.every((routePathseg, i) => routePathseg === urlSegs[i]);
    });
    return matchedRoute;
  }
}
