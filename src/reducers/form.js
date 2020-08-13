import * as C from "../constants";
import { INPUT_PHONE } from "../constants/form";

const init = {
  inputNameValue: "",
  inputNameValid: false,
  inputPhoneValue: "+380",
  inputPhoneValid: false,
  inputPasswordValue: "",
  inputPasswordValid: false,
  inputRepeatPasswordValue: "",
  inputCodeVerificationValue: "",
  formIsShow: false,
  formState: INPUT_PHONE, //INPUT_PHONE SEND_CODE INPUT_CODE INPUT_PASSWORD INPUT_CLIENT_DATA SUCCES_LOGIN
  needToWait: 0,
};

export default function (state = init, action) {
  switch (action.type) {
    case C.TOGGLE_FORM_IS_SHOW:
      return { ...state, formIsShow: !state.formIsShow, inputCodeVerificationValue: "" };

    case C.SET_FORM_STATE:
      return { ...state, formState: action.formState };

    case C.SET_DELAY_SEND_NEXT_SMS:
      return { ...state, needToWait: action.needToWait };

    case C.CHANGE_INPUT_CODE_VALUE:
      return { ...state, inputCodeVerificationValue: action.value };

    case C.CHANGE_INPUT_PASSWORD_VALUE:
      return { ...state, inputPasswordValue: action.value, inputPasswordValid: action.valid };

    case C.CHANGE_INPUT_REPEAT_PASSWORD_VALUE:
      return { ...state, inputRepeatPasswordValue: action.value };

    case C.CHANGE_INPUT_PHONE_VALUE:
      return { ...state, inputPhoneValue: action.value, inputPhoneValid: action.valid };

    case C.CHANGE_INPUT_NAME_VALUE:
      return { ...state, inputNameValue: action.value, inputNameValid: action.valid };

    default:
      return state;
  }
}
