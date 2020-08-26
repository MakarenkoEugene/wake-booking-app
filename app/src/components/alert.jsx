import React, { useState } from "react";
import { connect } from "react-redux";

import { resClearAlert } from "../action";

const mapStateToProps = (store) => ({
  alertMassage: store.alertMassage,
});

const mapDispatchToProps = (dispatch) => ({
  resClearAlert: () => dispatch(resClearAlert()),
});

function Alert({ alertMassage, resClearAlert }) {
  if (!alertMassage) return null;

  const [timer, setTimer] = useState(null);

  if (alertMassage.status) {
    clearInterval(timer);
    setTimer(setTimeout(() => resClearAlert(), 10000));
  } else {
    clearInterval(timer);
  }

  const classN = ((status) => {
    if (status === "ERROR") return "m_error_WB";
    if (status === "WARNING") return "m_warning_WB";
    if (status === "SUCCESS") return "m_success_WB";
    return "";
  })(alertMassage.status);

  return (
    <div id="alert">
      <div className={classN}>
        {alertMassage.title}
        <button onClick={() => resClearAlert()}>⌫</button>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
