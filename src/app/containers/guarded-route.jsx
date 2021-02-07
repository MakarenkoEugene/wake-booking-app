import React from 'react';
import { Route } from 'react-router-dom';
import { inject } from 'mobx-react';

const GuardedRoute = ({ component: Component, rootStore, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (rootStore.user.isLoggedIn
      ? <Component {...props} />
      : (
        <Route render={() => {
          window.location.href = `${process.env.API_URL}/auth/google?redirect=${encodeURI(location.href)}`;
          return null;
        }}
        />
      )
    )}
  />
);

export default inject('rootStore')(GuardedRoute);
