import React from 'react';
import { Router, Route, Switch, Link, useRouteMatch } from 'react-router-dom';
import GuardedRoute from '@app/containers/guarded-route';
import Home from '@app/containers/home/home';
import Advertisers from '@app/containers/advertisers/advertisers';
import Mailer from '@app/containers/mailer/mailer';
import Settings from '@app/containers/settings/settings';
import TestPage from '@app/containers/test-page';
import LayoutAdmin from '@app/containers/layout/admin';
import LayoutDemo from '@app/containers/layout/demo';
import history from './history';

const AdminRoute = () => {
  const { path } = useRouteMatch();

  return (
    <LayoutAdmin>
      <Switch>
        <Route exact path={`${path}/`} component={Home} />

        <GuardedRoute path={`${path}/advertisers`} role='advertiser' component={Advertisers} />
        <GuardedRoute path={`${path}/mailer`} role='mailer' component={Mailer} />
        <GuardedRoute path={`${path}/settings/:tab?`} role='settings' component={Settings} />
      </Switch>
    </LayoutAdmin>
  );
};

const H = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
    <ul>
      <li><h2><Link to='/admin/'>Admin</Link></h2></li>
      <li><h2><Link to='/creatives/:id'>Demo</Link></h2></li>
    </ul>
  </div>
);

const Routes = (
  <Router history={history}>
    <Switch>
      <Route exact path='/' component={H} />
      <Route path='/admin' component={AdminRoute} />
      <Route path='/creatives/:id'><LayoutDemo /></Route>
      <Route exact path='/test' component={TestPage} />
    </Switch>
  </Router>
);

export default Routes;
