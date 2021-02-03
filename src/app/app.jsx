import React from 'react';
import { Provider } from 'mobx-react';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles.scss';

const App = ({ store, routes }) => (
  <Provider rootStore={store}>
    <Router>{routes}</Router>
  </Provider>
);

export default hot(module)(App);
