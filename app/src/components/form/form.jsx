import React, { Component, useRef } from "react";
import { connect } from "react-redux";

import InputPhone from "./input_phone";
import BtnSendCode from "./btn_send_code";
import InputPassword from "./input_password";
import InputCodeVerification from "./input_code";
import SetProfileData from "./set_profile_data";

import {
  SUCCES_LOGIN,
  SEND_CODE,
  INPUT_CODE,
  INPUT_PASSWORD,
  INPUT_CLIENT_DATA,
  SEND_CODE_SIGN_IN,
  INPUT_CODE_SIGN_IN,
} from "../../constants/form";

import {
  signIn,
  signUp,
  changeInputPasswordValue,
  setFormState,
  updateClientData,
  setReservationTime,
  retrievePassword,
  resSendAlert,
} from "../../action";

const mapStateToProps = (store) => ({
  inputPasswordValue: store.form.inputPasswordValue,
  inputPasswordValid: store.form.inputPasswordValid,
  selectedTimes: store.selectedTimes,
  formState: store.form.formState,
  formIsShow: store.form.formIsShow,
});

const mapDispatchToProps = (dispatch) => ({
  changeInputPasswordValue: (value, valid) => dispatch(changeInputPasswordValue(value, valid)),
  setFormState: (formState) => dispatch(setFormState(formState)),
  resSendAlert: (alert) => dispatch(resSendAlert(alert)),
  updateClientData: () => dispatch(updateClientData()),
  retrievePassword: () => dispatch(retrievePassword()),
  setReservationTime: () => dispatch(setReservationTime()),
  signUp: () => dispatch(signUp()),
  signIn: () => dispatch(signIn()),
});

function Form({
  formState,
  signUp,
  signIn,
  updateClientData,
  setReservationTime,
  formIsShow,
  selectedTimes,
  inputPasswordValue,
  changeInputPasswordValue,
  inputPasswordValid,
  retrievePassword,
}) {
  const activeOnSubmit = (e) => {
    e.preventDefault();

    switch (formState) {
      case SUCCES_LOGIN:
        setReservationTime();
        break;

      case INPUT_CODE:
      case SEND_CODE:
        signUp();
        break;

      case SEND_CODE_SIGN_IN:
      case INPUT_CODE_SIGN_IN:
      case INPUT_PASSWORD:
        signIn();
        break;

      case INPUT_CLIENT_DATA:
        updateClientData();
        break;

      default:
        console.log(e);
        break;
    }
  };

  if (!selectedTimes.length && !formIsShow) return null;

  return (
    <form id="form" onSubmit={(e) => activeOnSubmit(e)}>
      {formState !== SUCCES_LOGIN && <InputPhone />}

      {(formState === SEND_CODE || formState === SEND_CODE_SIGN_IN) && <BtnSendCode />}

      {(formState === INPUT_CODE || formState === INPUT_CODE_SIGN_IN) && <InputCodeVerification />}

      {formState === INPUT_PASSWORD && (
        <>
          <InputPassword
            inputPasswordValue={inputPasswordValue}
            inputPasswordValid={inputPasswordValid}
            changeInputPasswordValue={changeInputPasswordValue}
          />

          <div>
            <div className="border_disabled_WB">
              <input type="button" onClick={retrievePassword} value="Retrieve Password" />
              <input type="submit" id="input_submit_WB" value="Log In" />
            </div>
          </div>
        </>
      )}

      {formState === INPUT_CLIENT_DATA && <SetProfileData />}
      {formState === SUCCES_LOGIN && (
        <div>
          {/* <input type="button" value="To Profile" /> */}
          <input type="submit" value="To Book" />
        </div>
      )}
    </form>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);
