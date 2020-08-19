
// closed routes for signed client

import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const mapStateToProps = (state) => ({
  user: state.user.user,
});

const ClosedRoutesForSignedClient = ({ component: RouteComponent, user, ...props }, ...rest) => {
  console.log(user);
  return (
    <Route
      {...rest}
      render={() =>
        user ? <Redirect to="/profile/"/> : <RouteComponent {...props} />
      }
    />
  );
};

export default connect(mapStateToProps, {})(ClosedRoutesForSignedClient);
