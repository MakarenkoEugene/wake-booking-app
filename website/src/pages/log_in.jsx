import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import InputRecaptcha from "../components/atoms/input_recaptcha";
import InputPassword from "../components/atoms/input_password";
import InputPhone from "../components/atoms/input_phone";
// import Response from "../components/response/response";

const mapStateToProps = (store) => ({});

const mapDispatchToProps = (dispatch) => ({});

function LogIn() {
  const [ inputTelValue, setInputTelValue ] = useState('+380')

  const activeOnSubmit = (e) => {
    e.preventDefault();

    console.log({
      phone: e.target["input_phone"].value.slice(1),
      password: e.target["input_password"].value,
    });
  };

  return (
    <section id="log_in">
      <h1>Log in</h1>

      <span>
        Еще нету акаунта? <Link to="/signup/">Зарегистрироватся.</Link>
      </span>
      <span>
        <Link to="/restoreprofile/">Забыли пароль?</Link>
      </span>

      <form onSubmit={activeOnSubmit}>
        <InputPhone autoFocus={true} value={inputTelValue} onChangeValue={setInputTelValue} />

        <InputPassword />

        <InputRecaptcha />

        {/* <Response /> */}

        <input type="submit" value="Вход" />
      </form>
    </section>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
