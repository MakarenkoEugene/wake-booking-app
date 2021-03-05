import React from 'react';
import { render } from 'react-dom';

// main app
import App from '@app/app';
import routes from '@app/router/routes';
import store from '@store';

const renderApp = async () => {
  render(<App store={store} routes={routes} />, document.getElementById('root'));
};

renderApp();

if (module.hot) {
  module.hot.accept('./app/router/routes', () => {
    renderApp();
  });
}
