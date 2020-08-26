import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Response from "../../components/response/response";

import InputPhone from "../../components/form/input_phone";
import InputRecaptcha from "../../components/form/input_recaptcha";

import { signUpReq, setLoading, setDelaySendingRepeatedSMS } from "../../../actions";

const mapStateToProps = (store) => ({
  needToWait: store.forms.needToWait,
  dataIsLoading: store.dataIsLoading,
  response: store.forms.response,
});

const mapDispatchToProps = (dispatch) => ({
  signUpReq: (data) => dispatch(signUpReq(data)),
  setLoading: (dataIsLoading) => dispatch(setLoading(dataIsLoading)),
  setDelaySendingRepeatedSMS: (needToWait) => dispatch(setDelaySendingRepeatedSMS(needToWait)),
});

class FirstStep extends Component {
  constructor(props) {
    super(props);
    this.props.setLoading(true);

    this.codeInputRef = null;
    this.nameInputRef = null;
    this.submitInputRef = null;

    this.state = {
      codeValue: "",
      needInputVericication: false,
      profileCreated: false,
    };

    this.setCodeInputRef = (element) => (this.codeInputRef = element);
    this.setNameInputRef = (element) => (this.nameInputRef = element);
    this.setSubmitInputRef = (element) => (this.submitInputRef = element);
    this.activeOnSubmit = this.activeOnSubmit.bind(this);
    this.onClickSendSMS = this.onClickSendSMS.bind(this);
  }

  onInputCodeValue(e) {
    e.preventDefault();
    if (!isNaN(+e.target.value) && e.target.value !== " " && e.target.value.length < 7) {
      this.setState({ codeValue: e.target.value });
    }
  }

  componentDidMount() {
    this.props.setLoading(false);
  }

  componentDidUpdate(prevProps) {
    if (this.props.response !== prevProps.response) {
      if (typeof this.props.response !== "object") return;

      const { data } = this.props.response;

      if (!data) return;

      if (data === "SEEND_PHONE_VERIFICATION" || data.title === "SEEND_PHONE_VERIFICATION")
        this.setState({ needInputVericication: true });

      if (data === "CREATE_NEW_PROFILE" || data.title === "CREATE_NEW_PROFILE") this.setState({ profileCreated: true });
    }
  }

  activeOnSubmit(e) {
    if (e) e.preventDefault();
    const { needInputVericication } = this.state;

    const data = {
      phone: e.target["input_phone"].value.slice(1),
      name: this.nameInputRef.value,
    };

    if (this.codeInputRef && needInputVericication) data.codeVerificationPhone = this.codeInputRef.value;

    this.props.signUpReq(data);
  }

  onClickSendSMS() {
    this.setState({ needInputVericication: false });
  }

  render() {
    const { codeValue, needInputVericication, profileCreated } = this.state;
    const { dataIsLoading, needToWait, setDelaySendingRepeatedSMS } = this.props;

    if (needToWait) setTimeout(() => setDelaySendingRepeatedSMS(needToWait - 1), 1000);

    return (
      <form onSubmit={this.activeOnSubmit} className={dataIsLoading ? "loading" : null}>
        <label htmlFor="name">Имя учётной записи:</label>
        <input type="text" autoFocus={true} ref={this.setNameInputRef} id="name" title="Введите имя вашей учётной записи" required />
        <span className="text_help">
          ⚠️<span>Обязательное поле.</span>
        </span>

        <InputPhone />

        <InputRecaptcha />

        <label htmlFor="privacy_input">
          <input type="checkbox" name="privacy" id="privacy_input" required defaultChecked={true} /> Я принимаю{" "}
          <Link to="/privacy/">Privacy</Link>
        </label>

        <Response />

        {profileCreated && (
          <input
            type="button"
            onClick={(e) => {
              e.preventDefault();
              console.log(e);
            }}
            value="Далее →"
          />
        )}

        {!profileCreated && needInputVericication && (
          <>
            <label htmlFor="codeVerificationPhone"> Код потверждения телефона: </label>
            <input
              ref={this.setCodeInputRef}
              type="text"
              value={codeValue}
              onChange={(e) => this.onInputCodeValue(e)}
              pattern="^[0-9]{6}$"
              id="codeVerificationPhone"
              required
            />
            <span className="text_help">
              ⚠️<span>Обязательное поле.</span>
            </span>
          </>
        )}

        {!profileCreated && (
          <div className="buttons">
            {needInputVericication && <input type="submit" value="Подтвердить код подтверждения" />}

            <input
              ref={this.setSubmitInputRef}
              type="submit"
              onClick={this.onClickSendSMS}
              disabled={needToWait}
              value={needToWait ? `Повторное смс ${needToWait}c.` : "Отправить смс"}
            />
          </div>
        )}
      </form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FirstStep);
