import React from "react";
import Recaptcha from "react-recaptcha";
import { connect } from "react-redux";

import { onLoadedRecaptcha, onVerifyRecaptcha } from "../../actions/forms";

const mapStateToProps = (store) => ({
  recaptchaIsVerify: store.forms.recaptchaIsVerify,
});

const mapDispatchToProps = (dispatch) => ({
  onLoadedRecaptcha: () => dispatch(onLoadedRecaptcha()),
  onVerifyRecaptcha: () => dispatch(onVerifyRecaptcha()),
});

function InputRecaptcha({ onLoadedRecaptcha, onVerifyRecaptcha, recaptchaIsVerify }) {
  return (
    <>
      <Recaptcha
        sitekey="6LeXXK4ZAAAAACJUGFHxzSHl6ZWW85zxCrj9q2oq"
        render="explicit"
        SameSite="None"
        onloadCallback={onLoadedRecaptcha}
        verifyCallback={onVerifyRecaptcha}
      />

      <input
        type="checkbox"
        onChange={() => {}}
        checked={recaptchaIsVerify}
        id="input_recaptcha"
        title="Чтобы продолжить, введите капчу."
        required
      />
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(InputRecaptcha);
