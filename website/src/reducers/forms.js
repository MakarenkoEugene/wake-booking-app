import {
  RECAPTCHA_ON_LOADED,
  RECAPTCHA_ON_VERIFY,
  SIGN_UP_RES,
  CLEAR_RESPONSE,
  SET_DELAY_SENDING_REPEATED_SMS,
} from "../constants";

const init = {
  recaptchaIsVerify: true,
  response: null,
  needToWait: 0,
};

export default (state = init, action) => {
  switch (action.type) {
    case SET_DELAY_SENDING_REPEATED_SMS:
      return { ...state, needToWait: action.needToWait };

    case SIGN_UP_RES:
      return { ...state, response: action.response };

    case CLEAR_RESPONSE:
      return { ...state, response: null };

    case RECAPTCHA_ON_LOADED:
      return { ...state, recaptchaIsVerify: false };

    case RECAPTCHA_ON_VERIFY:
      return { ...state, recaptchaIsVerify: true };

    default:
      return state;
  }
};
