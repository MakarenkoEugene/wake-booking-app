import React, { Component } from "react";
import { connect } from "react-redux";

import { resClearAlert } from "../action";

const mapStateToProps = (store) => ({
  alertMassage: store.alertMassage,
});

const mapDispatchToProps = (dispatch) => ({
  resClearAlert: () => dispatch(resClearAlert()),
});

class Alert extends Component {
  constructor(props) {
    super(props);
    this.timer = null;
  }
  render() {
    const { alertMassage, resClearAlert } = this.props;
    if (!alertMassage) return null;

    if (alertMassage.status) {
      clearInterval(this.timer);
      this.timer = setTimeout(() => resClearAlert(), 10000);
    } else {
      clearInterval(this.timer);
    }

    return (
      <div id="alert">
        <div
          className={
            alertMassage.status === "ERROR"
              ? "m_error_WB"
              : alertMassage.status === "WARNING"
              ? "m_warning_WB"
              : alertMassage.status === "SUCCESS"
              ? "m_success_WB"
              : ""
          }
        >
          {alertMassage.title}
          <button onClick={() => resClearAlert()}>⌫</button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
