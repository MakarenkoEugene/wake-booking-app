import * as C from "../constants/forms";

export const onLoadedRecaptcha = () => ({ type: C.RECAPTCHA_ON_LOADED });
export const onVerifyRecaptcha = () => ({ type: C.RECAPTCHA_ON_VERIFY });

export const setLogInFormState = (state) => ({ type: C.SET_LOG_IN_FORM_STATE, state });

export const setDelaySendingRepeatedSMS = (needToWait) => ({
  type: C.SET_DELAY_SENDING_REPEATED_SMS,
  needToWait,
});
