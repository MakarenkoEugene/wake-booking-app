import React from "react";
import { connect } from "react-redux";

import { checkPhoneNumber, setFormState, changeInputPhoneValue } from "../../action";
import { INPUT_PHONE } from "../../constants/form";

const mapStateToProps = (store) => ({
  inputPhoneValue: store.form.inputPhoneValue,
  inputPhoneValid: store.form.inputPhoneValid,
  formState: store.form.formState,
  client: store.client,
});

const mapDispatchToProps = (dispatch) => ({
  checkPhoneNumber: () => dispatch(checkPhoneNumber()),
  setFormState: (formState) => dispatch(setFormState(formState)),
  changeInputPhoneValue: (value, valid) => dispatch(changeInputPhoneValue(value, valid)),
});

function InputPhone({
  inputPhoneValid,
  inputPhoneValue,
  formState,
  changeInputPhoneValue,
  checkPhoneNumber,
  setFormState,
  client,
}) {
  const onInputPhoneValue = (e) => {
    e.preventDefault();

    if (!isNaN(+e.target.value) && e.target.value.slice(-1) !== " " && e.target.value.length > 3)
      changeInputPhoneValue(e.target.value, e.target.validity.valid);

    if (e.target.validity.valid) checkPhoneNumber();
  };

  return (
    <div>
      <div className={inputPhoneValid ? "" : "m_alert_WB"}>
        <label htmlFor="input_phone_WB">Phone Number</label>
        {formState !== INPUT_PHONE && !client && (
          <input onClick={() => setFormState(INPUT_PHONE)} type="button" value="←" title="Change phone" />
        )}
        <input
          type="tel"
          id="input_phone_WB"
          value={inputPhoneValue}
          onChange={(e) => onInputPhoneValue(e)}
          maxLength="13"
          pattern="^\+380[0-9]{9}$"
          required={true}
          disabled={formState !== INPUT_PHONE}
          title="You need to provide your own phone number, format: +380995693132"
          placeholder="Phone Number"
        />
        {inputPhoneValid ? null : inputPhoneValue ? (
          <span id="e_text_for_alert">Incorrect phone</span>
        ) : (
          <span id="e_text_for_alert">Enter your phone</span>
        )}
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(InputPhone);
