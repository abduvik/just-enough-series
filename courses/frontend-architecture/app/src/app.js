import { CharactersDetailsContainer } from './containers/CharactersDetailsContainer/CharactersDetailsContainer';
import { CharactersListContainer } from './containers/CharactersListContainer/CharactersListContainer';
import { dependencies } from './dependencies';
import { create } from './utils/renderer';

export const App = (DI) => {
  const router = DI.getDependency(dependencies.router);

  router.setRoutePageRender('/', () => CharactersListContainer(DI));
  router.setRoutePageRender('/character/.*', () =>
    CharactersDetailsContainer(DI)
  );
  router.setNotFoundPage(() =>
    create('div', { innerText: 'Page Not Found! Try another route :)' })
  );

  return router.renderFromRouter();
};
