import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

import InputRecaptcha from "../components/atoms/input_recaptcha";
import InputPassword from "../components/atoms/input_password";
import InputPhone from "../components/atoms/input_phone";
// import Response from "../components/response/response";

import { logInCheckPhone } from "../actions/client";
import { CHECK_PHONE, CHECK_PASSWORD } from "../constants/log_in_form_state";

const mapStateToProps = (store) => ({
  formState: store.forms.logInFormState,
  recaptchaIsVerify: store.forms.recaptchaIsVerify,
});

const mapDispatchToProps = (dispatch) => ({
  logInCheckPhone: (phone) => dispatch(logInCheckPhone(phone)),
});

function LogIn({ recaptchaIsVerify, logInCheckPhone, formState }) {
  const [inputTelValue, setInputTelValue] = useState("380995693132");
  const [inputPasswordValue, setInputPasswordValue] = useState("");

  const inputTelValid = !!/^380\d{9}$/.exec(inputTelValue);
  const inputPasswordValid = formState !== CHECK_PASSWORD ? true : !!/[a-zA-Z0-9]{6,16}/.exec(inputPasswordValue);

  const activeOnSubmit = (e) => {
    e.preventDefault();
    switch (formState) {
      case CHECK_PHONE:
        logInCheckPhone(inputTelValue);
        break;

      case CHECK_PASSWORD:
        console.log(inputTelValue, inputPasswordValue);
        break;

      default:
        break;
    }
  };

  return (
    <section id="log_in">
      <h1>Log in</h1>

      <div className="log_in_links">
        {/* <p>
          Еще нету акаунта? <Link to="/signup/">Зарегистрироватся.</Link>
        </p> */}
        <p>
          <Link to="/restoreprofile/">Забыли пароль?</Link>
        </p>
      </div>

      <form name="login" onSubmit={activeOnSubmit}>
        <div>
          {formState === CHECK_PASSWORD && <button title="Cahnge Phone">❮</button>}

          <PhoneInput
            inputProps={{
              required: true,
              autoFocus: true,
            }}
            specialLabel={"Номер  Телефона"}
            placeholder={"Номер Телефона"}
            defaultErrorMessage={"Неверный Номер Телефона"}
            country={"ua"}
            onlyCountries={["ua"]}
            disabled={formState === CHECK_PASSWORD}
            value={inputTelValue}
            onChange={setInputTelValue}
          />
        </div>

        {/* placeholder, valid, title, label, */}
        {formState === CHECK_PASSWORD && (
          <InputPassword
            required={true}
            label={"Пароль"}
            value={inputPasswordValue}
            onChangeValue={setInputPasswordValue}
          />
        )}

        {/* <InputRecaptcha /> */}

        {/* <Response /> */}
        { formState === CHECK_PHONE && <input type="submit" value="Далее ❯"/> }
        { formState === CHECK_PASSWORD && <input type="submit" disabled={!inputTelValid || !recaptchaIsVerify || !inputPasswordValid} value="Вход" />}

      </form>
    </section>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);

// import React, { Component, useRef } from "react";
// import { connect } from "react-redux";

// import InputPhone from "./input_phone";
// import BtnSendCode from "./btn_send_code";
// import InputPassword from "./input_password";
// import InputCodeVerification from "./input_code";
// import SetProfileData from "./set_profile_data";

// import {
//   SUCCES_LOGIN,
//   SEND_CODE,
//   INPUT_CODE,
//   INPUT_PASSWORD,
//   INPUT_CLIENT_DATA,
//   SEND_CODE_SIGN_IN,
//   INPUT_CODE_SIGN_IN,
// } from "../../constants/form";

// import {
//   signIn,
//   signUp,
//   changeInputPasswordValue,
//   setFormState,
//   updateClientData,
//   setReservationTime,
//   retrievePassword,
//   resSendAlert,
// } from "../../action";

// const mapStateToProps = (store) => ({
//   inputPasswordValue: store.form.inputPasswordValue,
//   inputPasswordValid: store.form.inputPasswordValid,
//   selectedTimes: store.selectedTimes,
//   formState: store.form.formState,
//   formIsShow: store.form.formIsShow,
// });

// const mapDispatchToProps = (dispatch) => ({
//   changeInputPasswordValue: (value, valid) => dispatch(changeInputPasswordValue(value, valid)),
//   setFormState: (formState) => dispatch(setFormState(formState)),
//   resSendAlert: (alert) => dispatch(resSendAlert(alert)),
//   updateClientData: () => dispatch(updateClientData()),
//   retrievePassword: () => dispatch(retrievePassword()),
//   setReservationTime: () => dispatch(setReservationTime()),
//   signUp: () => dispatch(signUp()),
//   signIn: () => dispatch(signIn()),
// });

// function Form({
//   formState,
//   signUp,
//   signIn,
//   updateClientData,
//   setReservationTime,
//   formIsShow,
//   selectedTimes,
//   inputPasswordValue,
//   changeInputPasswordValue,
//   inputPasswordValid,
//   retrievePassword,
// }) {
//   const activeOnSubmit = (e) => {
//     e.preventDefault();

//     switch (formState) {
//       case SUCCES_LOGIN:
//         setReservationTime();
//         break;

//       case INPUT_CODE:
//       case SEND_CODE:
//         signUp();
//         break;

//       case SEND_CODE_SIGN_IN:
//       case INPUT_CODE_SIGN_IN:
//       case INPUT_PASSWORD:
//         signIn();
//         break;

//       case INPUT_CLIENT_DATA:
//         updateClientData();
//         break;

//       default:
//         console.log(e);
//         break;
//     }
//   };

//   if (!selectedTimes.length && !formIsShow) return null;

//   return (
//     <form id="form" onSubmit={(e) => activeOnSubmit(e)}>
//       {formState !== SUCCES_LOGIN && <InputPhone />}

//       {(formState === SEND_CODE || formState === SEND_CODE_SIGN_IN) && <BtnSendCode />}

//       {(formState === INPUT_CODE || formState === INPUT_CODE_SIGN_IN) && <InputCodeVerification />}

//       {formState === INPUT_PASSWORD && (
//         <>
//           <InputPassword
//             inputPasswordValue={inputPasswordValue}
//             inputPasswordValid={inputPasswordValid}
//             changeInputPasswordValue={changeInputPasswordValue}
//           />

//           <div>
//             <div className="border_disabled_WB">
//               <input type="button" onClick={retrievePassword} value="Retrieve Password" />
//               <input type="submit" id="input_submit_WB" value="Log In" />
//             </div>
//           </div>
//         </>
//       )}

//       {formState === INPUT_CLIENT_DATA && <SetProfileData />}
//       {formState === SUCCES_LOGIN && (
//         <div>
//           {/* <input type="button" value="To Profile" /> */}
//           <input type="submit" value="To Book" />
//         </div>
//       )}
//     </form>
//   );
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Form);
