import React from "react";
// import { Link } from "react-router-dom";
// import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
// import Response from "../../components/response/response";

import ProfileOwner from "./profile_owner";

export default function ProfileRoute() {
  return (
    <section id="profile">
      {/* <Response /> */}

      <Switch>
        <Route path="/profile/owner" component={ProfileOwner} />
        {/* <Route exact path="/profile/admin/" component={() => <h1>Admin</h1>} /> */}
        {/* <Route exact path="/profile/teacher/" component={() => <h1>Teacher</h1>} /> */}

        {/* <Route path="/profile/" component={Profile} /> */}
      </Switch>
    </section>
  );
}
