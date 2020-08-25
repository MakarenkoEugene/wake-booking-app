import React from "react";
import ReactDOMServer from "react-dom/server";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
// import PrivatRoute from "../route/private_route";
// import SignedClosedRoute from "../route/signed_closed_route";

// component
import HeadNav from "./components/organisms/head_nav";
import Footer from "./components/templates/footer";
// import LeftNav from "../components/nav/left";

// pages
import Welcome from "./pages/welcome";
// import Docs from "./docs/docs";
// import ProfileRoute from "./profile/";
// import FeedBack from "./feedback/feedback";
// import LogIn from "./log_in/log_in";
// import LogIn from "./log_in";
// import SignUp from "./sign_up/";

//static 
import Privacy from "./pages/privacy.md";
import License from "../../LICENSE.md";

const convertText = (id, text) => <section id={id} dangerouslySetInnerHTML={{ __html: text }}></section>;

// import { getUser } from "../actions";

const mapStateToProps = (store) => ({
  leftNavClosse: store.navBar.isClosse,
  // alreadyCreateProfile: store.user.alreadyCreateProfile,
});

const mapDispatchToProps = (dispatch) => ({
  // getUser: () => dispatch(getUser()),
});

function Root({ leftNavClosse }) {
  // componentDidMount() {
  //   const { alreadyCreateProfile, getUser } = this.props;
  //   if (alreadyCreateProfile) getUser();
  // }

  return (
    <Router>
      <HeadNav />
      <main id="main" className={leftNavClosse ? "" : "nav_open"}>
        {/* <Route exact path={["/docs/", "/profile/*"]} component={LeftNav} /> */}
        <Switch>
          <Route exact path="/" component={Welcome} />

          
          <Route exact path="/privacy/" component={() => convertText('privacy', Privacy)} />
          <Route exact path="/license/" component={() => convertText('license', License)} />

          {/* <Route path="/docs/" component={Docs} /> */}
          {/* <Route path="/profile/" component={ProfileRoute} /> */}
          {/* <PrivatRoute path="/profile/" component={ProfileRoute} /> */}

          {/* <Route exact path="/feedback/" component={FeedBack} /> */}
          {/* <Route path="/profile/" component={ProfileRoute} /> */}

          {/* <Route exact path="/login/" component={LogIn} /> */}
          {/* <SignedClosedRoute exact path="/login/" component={LogIn} /> */}
          {/* <SignedClosedRoute exact path="/signup/" component={SignUp} /> */}
        </Switch>
      </main>
      <Footer />
    </Router>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);
