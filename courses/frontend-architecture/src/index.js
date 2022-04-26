import { ApiAdapter } from './adapters/apiAdapter';
import { EnvironmentConfigs } from './config/env';
import { App } from './app';
import { DependencyContainer } from './stores/dependencyContainer.store';

const dependenciesContainer = new DependencyContainer();

const env = EnvironmentConfigs();
const api = new ApiAdapter(env);

dependenciesContainer.add(env);
dependenciesContainer.add(api);

const renderApp = () => {
  // unmount the app
  const root = document.getElementById('root');
  Array.from(root.children).forEach((child) => {
    root.removeChild(child);
  });

  // Create the app
  const app = App(dependenciesContainer);

  // Mount the app
  root.appendChild(app);
};

window.addEventListener('load', renderApp);

// The could be replaced with a logic to do a rerender
document.addEventListener('click', renderApp);
