import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const mapStateToProps = (state) => ({
  alreadyCreateProfile: state.user.alreadyCreateProfile,
  user: state.user.user,
});

const PrivateRoute = ({ component: RouteComponent, user, alreadyCreateProfile, ...props }, ...rest) => {
  console.log(user);
  return (
    <Route
      {...rest}
      render={() =>
        user ? <RouteComponent {...props} /> : <Redirect to={alreadyCreateProfile ? "/login/" : "/signup/"} />
      }
    />
  );
};

export default connect(mapStateToProps, {})(PrivateRoute);
