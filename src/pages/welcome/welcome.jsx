import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { withTranslation } from "react-i18next";
import "./style.scss";

import { closseNavBar, showNavBar } from "../../actions";

const mapStateToProps = (store) => ({});

const mapDispatchToProps = (dispatch) => ({
  closseNavBar: () => dispatch(closseNavBar()),
  showNavBar: () => dispatch(showNavBar()),
});

class Welcome extends Component {
  constructor(props) {
    super(props);
    // this.closseNavBar = props.closseNavBar;
  }

  // componentDidMount() {
  //   this.closseNavBar();
  // }

  // componentWillUnmount() {
  //   this.props.showNavBar();
  // }

  render() {
    return (
      <header id="welcome">
<<<<<<< HEAD
        <h1>{"WakeBooking helps \n wake parks and their customers \n avoid wasting time"}</h1>
        <Link id="welcome_btn_get" to="/profile/">
          Get Started
        </Link>
        <Link id="welcome_btn_more" to="/docs/">
          See More
        </Link>
=======
          <h1>{'WakeBooking helps \n wake parks and their customers \n avoid wasting time'}</h1>
          <Link id="welcome_btn_get" to="/profile/">
            Get Started
          </Link>
          <Link id="welcome_btn_more" to="/docs/">
            See More
          </Link>
>>>>>>> fd73a7a4c780ac691b15ad0cea22a298f1b72905
      </header>
    );
  }
}

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(Welcome));
