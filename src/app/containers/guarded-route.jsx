import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { inject } from 'mobx-react';

const GuardedRoute = ({ component: Component, rootStore, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (rootStore.userStore.isLoggedIn
      ? <Component {...props} />
      : <Redirect to='/' />
    )}
  />
);

export default inject('rootStore')(GuardedRoute);
