import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Park from '@app/containers/admin/park';
import Winch from '@app/containers/admin/winch';
import Equipment from '@app/containers/admin/equipment';
import Schedule from '@app/containers/admin/schedule/schedule';
import Subscriptions from '@app/containers/admin/subscriptions';
import NotFound from '@app/containers/not-found';

const AdminRoute = ({ rootStore: { user } }) => {
  const { path } = useRouteMatch();

  useEffect(() => {
    if (!user.parks) user.getParks();
  }, [user.parks]);

  return (
    <>
      { user.parks && (
      <Switch>
        <Route exact path={`${path}`} component={Park} />
        <Route exact path={`${path}winch/`} component={Winch} />
        <Route exact path={`${path}equipment/`} component={Equipment} />
        <Route exact path={`${path}subscriptions/`} component={Subscriptions} />
        <Route exact path={`${path}schedule/`} component={Schedule} />
        <Route exact path={`${path}queue/`} component={() => <h1>Admin queue</h1>} />
        <Route exact path={`${path}app/`} component={() => <h1>App</h1>} />
        <Route exact path={`${path}analytics/`} component={() => <h1>Admin analytics</h1>} />
        <Route path='*' component={NotFound} />
      </Switch>
      )}
    </>
  );
};

export default inject('rootStore')(observer(AdminRoute));
