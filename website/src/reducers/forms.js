import * as C from "../constants/forms";

import { CHECK_PHONE } from "../constants/log_in_form_state";

const init = {
  logInFormState: CHECK_PHONE, // CHECK_PASSWORD, CHECK_PHONE
  recaptchaIsVerify: true,
  needToWait: 0,
};

export default (state = init, action) => {
  switch (action.type) {
    case C.SET_LOG_IN_FORM_STATE:
      return { ...state, logInFormState: action.state };

    case C.SET_DELAY_SENDING_REPEATED_SMS:
      return { ...state, needToWait: action.needToWait };

    case C.RECAPTCHA_ON_LOADED:
      return { ...state, recaptchaIsVerify: false };

    case C.RECAPTCHA_ON_VERIFY:
      return { ...state, recaptchaIsVerify: true };

    default:
      return state;
  }
};
