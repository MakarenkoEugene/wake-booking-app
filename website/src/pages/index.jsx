import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";

// import PrivatRoute from "../route/private_route";
// import SignedClosedRoute from "../route/signed_closed_route";

import LeftNav from "../components/nav/left";

import Welcome from "./welcome/welcome";
import Docs from "./docs/docs";
import ProfileRoute from "./profile/";
// import FeedBack from "./feedback/feedback";
import LogIn from "./log_in/log_in";
// import LogIn from "./log_in";
// import SignUp from "./sign_up/";
import license from "../../public/LICENSE.md";
import Privacy from "./privacy/privacy";

function Liscense() {
  return (
    <Route exact path="/license/">
      <section id="license" dangerouslySetInnerHTML={{ __html: license }}></section>
    </Route>
  );
}

// import { getUser } from "../actions";

const mapStateToProps = (store) => ({
  leftNavClosse: store.navBar.isClosse,
  // alreadyCreateProfile: store.user.alreadyCreateProfile,
});

const mapDispatchToProps = (dispatch) => ({
  // getUser: () => dispatch(getUser()),
});

class Pages extends Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   const { alreadyCreateProfile, getUser } = this.props;
  //   if (alreadyCreateProfile) getUser();
  // }

  render() {
    const { leftNavClosse } = this.props;

    return (
      <main id="main" className={leftNavClosse ? "" : "nav_open"}>
        <Route exact path={["/docs/", "/profile/*"]} component={LeftNav} />
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/privacy/" component={Privacy} />
          <Route exact path="/license/" component={Liscense} />

          <Route path="/docs/" component={Docs} />
          <Route path="/profile/" component={ProfileRoute} />
          {/* <PrivatRoute path="/profile/" component={ProfileRoute} /> */}

          {/* <Route exact path="/feedback/" component={FeedBack} /> */}
          {/* <Route path="/profile/" component={ProfileRoute} /> */}

          <Route exact path="/login/" component={LogIn} />
          {/* <SignedClosedRoute exact path="/login/" component={LogIn} /> */}
          {/* <SignedClosedRoute exact path="/signup/" component={SignUp} /> */}
        </Switch>
      </main>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pages);
