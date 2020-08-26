import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import ProfileOwnerInit from "../components/templates/profile_owner_init";
import ProfileOwnerSettings from "../components/templates/profile_owner_settings";

const mapStateToProps = (store) => ({
  config: store.appSettings,
});
const mapDispatchToProps = (dispatch) => ({});

function OwnerPage({ config }) {
  useEffect(() => {
    if (frames.APP) frames.APP.postMessage({ config });
  }, [config]);

  return (
    <div id="owner">
      <ul>
        <li>Основное</li>
        <li>Время работы</li>
        <li>Персонал</li>
        <li>Описание</li>
        <li>Доп. Опции</li>
        <li>Внешний вид</li>
        <li>Оплата</li>
      </ul>
      <h1>Owner</h1>
      <Switch>
        <Route exact path="/profile/owner/init" component={ProfileOwnerInit} />
        <Route exact path="/profile/owner/settings" component={ProfileOwnerSettings} />
        {/* <Route exact path="/profile/admin/" component={() => <h1>Admin</h1>} /> */}
        {/* <Route exact path="/profile/teacher/" component={() => <h1>Teacher</h1>} /> */}

        {/* <Route path="/profile/" component={Profile} /> */}
      </Switch>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(OwnerPage);
