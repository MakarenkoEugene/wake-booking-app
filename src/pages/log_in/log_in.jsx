import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import InputRecaptcha from "../../components/form/input_recaptcha";
import InputPassword from "../../components/form/input_password";
import InputPhone from "../../components/form/input_phone";
import Response from "../../components/response/response";

import { signInReq, setLoading } from "../../actions";

const mapStateToProps = (store) => ({
  dataIsLoading: store.dataIsLoading,
});

const mapDispatchToProps = (dispatch) => ({
  setLoading: (dataIsLoading) => dispatch(setLoading(dataIsLoading)),
  signInReq: (data) => dispatch(signInReq(data)),
});

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.props.setLoading(true);
  }

  componentDidMount() {
    this.props.setLoading(false);
  }

  activeOnSubmit(e) {
    const { signInReq } = this.props;
    e.preventDefault();

    signInReq({
      phone: e.target["input_phone"].value.slice(1),
      password: e.target["input_password"].value,
    });
  }

  render() {
    const { dataIsLoading } = this.props;

    return (
      <section id="log_in">
        <h1>Log in</h1>

        <span>
          Еще нету акаунта? <Link to="/signup/">Зарегистрироватся.</Link>
        </span>
        <span>
          <Link to="/restoreprofile/">Забыли пароль?</Link>
        </span>

        <form onSubmit={(e) => this.activeOnSubmit(e)} className={dataIsLoading ? "loading" : null}>
          <InputPhone autoFocus={true} />

          <InputPassword />

          {/* <InputRecaptcha /> */}

          <Response />

          <input type="submit" value="Вход" />
        </form>
      </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
