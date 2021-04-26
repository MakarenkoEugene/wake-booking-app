import React from 'react';
import { Router, Route, Switch, useRouteMatch } from 'react-router-dom';
// import GuardedRoute from '@app/containers/guarded-route';
import Home from '@app/containers/home/home';
import Auth from '@app/containers/auth/auth';
import NotFound from '@app/containers/not-found';
import Layout from '@app/containers/layout/layout';

import AdminRoute from './admin.routes';

import history from './history';

// {/* <GuardedRoute path={`${path}/advertisers`} role='advertiser' component={Advertisers} />
//   <GuardedRoute path={`${path}/mailer`} role='mailer' component={Mailer} />
//   <GuardedRoute path={`${path}/settings/:tab?`} role='settings' component={Settings} /> */}

const ClientRoute = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}`} component={() => <h1>Client</h1>} />
      <Route exact path={`${path}deal/`} component={() => <h1>Client deal</h1>} />
      <Route exact path={`${path}subscriptions/`} component={() => <h1>Client subscriptions</h1>} />
      <Route path='*' component={NotFound} />
    </Switch>
  );
};

const TeacherRoute = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}`} component={() => <h1>Teacher</h1>} />
      <Route exact path={`${path}schedule/`} component={() => <h1>Teacher schedule</h1>} />
      <Route exact path={`${path}queue/`} component={() => <h1>Teacher queue</h1>} />
      <Route exact path={`${path}analytics/`} component={() => <h1>Teacher analytics</h1>} />
      <Route exact path={`${path}subscriptions/`} component={() => <h1>Teacher subscriptions</h1>} />
      <Route path='*' component={NotFound} />
    </Switch>
  );
};

const Routes = (
  <Router history={history}>
    <Layout>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/auth/' component={Auth} />
        <Route path='/deal/' component={() => <h1>Deal</h1>} />
        <Route path='/client/' component={ClientRoute} />
        <Route path='/teacher/' component={TeacherRoute} />
        <Route path='/admin/' component={AdminRoute} />
        <Route path='*' component={NotFound} />
      </Switch>
    </Layout>
  </Router>
);

export default Routes;
