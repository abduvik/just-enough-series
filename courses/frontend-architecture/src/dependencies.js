import { DependencyContainer } from './stores/dependencyContainer.store';
import { ApiAdapter } from './adapters/apiAdapter';
import { EnvironmentConfigs } from './config/env';
import { RouterStore } from './stores/router.store';
import { CharactersApiService } from './services/CharactersApi.service';
import { CharactersStore } from './stores/Characters.store';

const dependenciesContainer = new DependencyContainer();

const dependencies = {
  env: Symbol('env'),
  api: Symbol('api'),
  router: Symbol('router'),
  charactersService: Symbol('charactersService'),
  charactersStore: Symbol('charactersStore'),
};

const env = EnvironmentConfigs();
const api = new ApiAdapter(env);
const router = new RouterStore();
const charactersService = new CharactersApiService(api);
const charactersStore = new CharactersStore(charactersService);

dependenciesContainer.add(dependencies.env, env);
dependenciesContainer.add(dependencies.api, api);
dependenciesContainer.add(dependencies.router, router);
dependenciesContainer.add(dependencies.charactersService, charactersService);
dependenciesContainer.add(dependencies.charactersStore, charactersStore);

export { dependencies, dependenciesContainer };
