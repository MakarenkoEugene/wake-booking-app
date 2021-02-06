import React from 'react';
import { Redirect, Router, Route, Switch } from 'react-router-dom';
import GuardedRoute from '@app/containers/guarded-route';
import Home from '@app/containers/home/home';
import Advertisers from '@app/containers/advertisers/advertisers';
import Settings from '@app/containers/settings/settings';
import TestPage from '@app/containers/test-page';
import Layout from '@app/containers/layout/layout';
import history from './history';

const Routes = (
  <Router history={history}>
    <Layout>
      <Switch>
        <Route exact path='/' component={Home} />

        <GuardedRoute path='/advertisers' component={Advertisers} />
        <GuardedRoute path='/settings/:id?' component={Settings} />

        <Route exact path='/test' component={TestPage} />

        <Redirect to='/advertisers' />
      </Switch>
    </Layout>
  </Router>
);

export default Routes;
