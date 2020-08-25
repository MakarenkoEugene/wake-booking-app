import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";

import { onLoadedRecaptcha, onVerifyRecaptcha } from "../../../actions";

const mapStateToProps = (store) => ({
  // user: { name: "Eugene Makarenko", _id: "0001" },
  // user: store.user.user,
});

const mapDispatchToProps = (dispatch) => ({});

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // const { user } = this.props;
    // const { name } = user;

    return (
      <div>
        <h1>Profile</h1>
        <p>Hello {'name'}, it`s your profile.</p>
        <p>Ета страница предназначена для клиентов WakeBooking на ней вы можете посмотреть информацыю по вашему профилю изменить эту информацыю, посмотреть ваше забронированое время, отказатся от брони и забронировать время на вейк парке которые есть в базе.</p>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
