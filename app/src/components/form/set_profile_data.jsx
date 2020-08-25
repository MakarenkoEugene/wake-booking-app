import React from "react";
import { connect } from "react-redux";

import { changeInputPasswordValue, changeInputRepeatPasswordValue, changeInputNameValue } from "../../action";

import InputPassword from "./input_password";
import InputRepeatPassword from "./input_repeat_password";

const mapStateToProps = (store) => ({
  inputPasswordValue: store.form.inputPasswordValue,
  inputPasswordValid: store.form.inputPasswordValid,
  inputRepeatPasswordValue: store.form.inputRepeatPasswordValue,
  inputNameValue: store.form.inputNameValue,
  inputNameValid: store.form.inputNameValid,
});

const mapDispatchToProps = (dispatch) => ({
  changeInputPasswordValue: (value, valid) => dispatch(changeInputPasswordValue(value, valid)),
  changeInputRepeatPasswordValue: (value) => dispatch(changeInputRepeatPasswordValue(value)),
  changeInputNameValue: (value, valid) => dispatch(changeInputNameValue(value, valid)),
});

function SetProfileData({
  inputPasswordValue,
  inputPasswordValid,
  changeInputPasswordValue,
  inputNameValue,
  inputNameValid,
  changeInputNameValue,
  inputRepeatPasswordValue,
  changeInputRepeatPasswordValue,
}) {
  return (
    <>
      <div>
        <div className={inputNameValid ? "" : "m_alert_WB"}>
          <label htmlFor="input_name_WB">Full Name</label>
          <input
            type="text"
            id="input_name_WB"
            value={inputNameValue}
            onChange={(e) => changeInputNameValue(e.target.value, e.target.validity.valid)}
            title="You need set your Full Name"
            pattern="^[^0-9]{2,}"
            required={true}
            placeholder="Full Name"
          />

          {!inputNameValid && <span id="e_text_for_alert">Enter your full name</span>}
        </div>
      </div>

      <InputPassword
        inputPasswordValue={inputPasswordValue}
        inputPasswordValid={inputPasswordValid}
        changeInputPasswordValue={changeInputPasswordValue}
      />

      <InputRepeatPassword
        inputPasswordValue={inputPasswordValue}
        inputRepeatPasswordValue={inputRepeatPasswordValue}
        changeInputRepeatPasswordValue={changeInputRepeatPasswordValue}
        inputPasswordValid={inputPasswordValid}
      />

      <div>
        <div className="border_disabled_WB">
          <input type="submit" value="Set Profile Data" />
        </div>
      </div>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SetProfileData);
