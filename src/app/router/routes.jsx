import React from 'react';
import { Redirect, Router, Route, Switch } from 'react-router-dom';
import GuardedRoute from '@app/containers/guarded-route';
import Advertisers from '@app/containers/advertisers/advertisers';
import TestPage from '@app/containers/test-page';
import Layout from '@app/containers/layout/layout';
import history from './history';

const Routes = (
  <Router history={history}>
    <Layout>
      <Switch>
        <Route path='/advertisers' component={Advertisers} />
        <GuardedRoute path='/advertisers' component={Advertisers} />

        <Route exact path='/test' component={TestPage} />

        <Redirect to='/advertisers' />
      </Switch>
    </Layout>
  </Router>
);

export default Routes;
