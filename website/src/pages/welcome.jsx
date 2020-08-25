import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { withTranslation } from "react-i18next";

import { closseNavBar, showNavBar } from "../actions";

const mapStateToProps = (store) => ({});

const mapDispatchToProps = (dispatch) => ({
  closseNavBar: () => dispatch(closseNavBar()),
  showNavBar: () => dispatch(showNavBar()),
});

function Welcome() {
  return (
    <header id="welcome">
      <h1>{"WakeBooking helps \n wake parks and their customers \n avoid wasting time"}</h1>
      <Link id="welcome_btn_get" to="/profile/">
        Get Started
      </Link>
      <Link id="welcome_btn_more" to="/docs/">
        See More
      </Link>
    </header>
  );
}

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(Welcome));
