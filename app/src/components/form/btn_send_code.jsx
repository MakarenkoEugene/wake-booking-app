import React from "react";
import { connect } from "react-redux";

const mapStateToProps = (store) => ({
  needToWait: store.form.needToWait,
});

function BtnSendCode({ needToWait }) {
  return (
    <div>
      <div className="border_disabled_WB">
        {needToWait ? (
          <input
            type="button"
            id="input_submit_WB"
            onClick={(e) => e.preventDefault()}
            value={`SMS can be sent via ${Math.ceil(needToWait / 1000)} s`}
          />
        ) : (
          <input type="submit" id="input_submit_WB" value={"Send SMS"} />
        )}
      </div>
    </div>
  );
}

export default connect(mapStateToProps, () => ({}))(BtnSendCode);
