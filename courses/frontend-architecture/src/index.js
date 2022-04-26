import { App } from './app';
import { dependenciesContainer } from './dependencies';

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
document.addEventListener('rerenderView', renderApp);
