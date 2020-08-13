import React from "react";
import { connect } from "react-redux";

import { changeInputCodeValue } from "../../action";

const mapStateToProps = (store) => ({
  inputCodeVerificationValue: store.form.inputCodeVerificationValue,
});

const mapDispatchToProps = (dispatch) => ({
  changeInputCodeValue: (value) => dispatch(changeInputCodeValue(value)),
});

function InputCodeVerification({ inputCodeVerificationValue, changeInputCodeValue }) {
  const onChangeInputCodeValue = (value) => {
    if (!isNaN(+value) && value.slice(-1) !== " ") changeInputCodeValue(value);
  };

  return (
    <div>
      <div>
        <label htmlFor="input_code_WB">Verification Code</label>
        <input
          type="text"
          id="input_code_WB"
          value={inputCodeVerificationValue}
          title="You need to specify the code that came to the specified number via SMS"
          maxLength="6"
          onChange={(e) => onChangeInputCodeValue(e.target.value)}
          required={true}
          pattern="[0-9]{6}"
          placeholder="Verification Code"
        />
      </div>
      <input type="submit" id="input_submit_WB" value="Confirm" />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(InputCodeVerification);
