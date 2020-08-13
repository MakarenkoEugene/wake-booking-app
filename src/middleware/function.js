import * as RES from "../constants/response_title";
import { RETRIVEE_PASSWORD } from "../constants/";


export const stringify = (data) => JSON.stringify(data);

export function getAlertForResponse(title, addInfo) {
  switch (title) {
    case RES.SESSION_IS_CLEAN:
      if (addInfo === RETRIVEE_PASSWORD) {
        return {
          title:
            "To recover the password, you need to confirm the ownership of the phone, you will receive an SMS to the specified phone number with a confirmation code, you need to input it, after which you can change the password.",
        };
      } else {
        return { title: "Session cleaned" };
      }
    case RES.SEEND_PHONE_VERIFICATION:
      return { title: "A verification code was send to your phone number, please enter it." };

    case RES.INCORRECT_PHONE_VERIFICATION:
      return { status: "ERROR", title: "The verification code is incorrect." };

    case RES.SUCCESS_SIGN_OUT:
      return { status: "WARNING", title: "Signed out" };

    case RES.TIME_NOT_PASSED:
      return { status: "ERROR", title: "You can't send SMS too often, Please try again later." };

    case RES.INCORRECT_PASSWORD:
      return { status: "ERROR", title: "Wrong password" };

    case RES.SUCCESS_UPDATE:
      return { status: "SUCCESS", title: "Login successful." };

    case RES.SUCCES_LOGIN:
      return { status: "SUCCESS", title: "Login successful." };

    case RES.CREATE_NEW_PROFILE:
      return {
        status: "SUCCESS",
        title: `Login successful. ${
          addInfo ? "Please create a password." : "Please set your name and create password."
        }`,
      };

    case RES.CLIENT_UNKNOWN:
      return {
        title:
          'Confirm your phone number, press the button "Send SMS", and an SMS with a confirmation code will be sent to phone number.',
      };

    case RES.CLIENT_HAS_NO_PASSWORD:
      return {
        title: `${addInfo ? `Hello ${addInfo},` : ""}
        Confirm your phone number, press the button "Send SMS", and an SMS with a confirmation code will be sent to phone number.`,
      };

    case RES.CLIENT_RIGHT:
      return {
        title: `Hello ${addInfo}, enter your password to continue booking. If you forgot your password click on "Retrieve Password"`,
      };

    case RES.TIME_IS_SET:
      return { status: "SUCCESS", title: "Time booked successfully" };

    case RES.TIME_IS_DELETED:
      return { status: "SUCCESS", title: "Time removed successfully" };

    default:
      console.log("getAlertForResponse -> title", title);
      return { title: "Response not processed" };
  }
}

export function getErrorForResponse(title, AddInfo) {
  switch (title) {
    case RES.NO_SELECTED_TEACHER_IN_PARK:
      return {
        status: "ERROR",
        title: 'The selected teacher does not work in the park.',
      };

    case RES.NO_SELECTED_WINCH_IN_PARK:
      return {
        status: "ERROR",
        title: 'The selected winch is not in the park.',
      };

    case RES.TIME_ALREADY_TAKEN_AT_TEACHER:
      return {
        status: "ERROR",
        title: `The time ${AddInfo} already booked at teacher. Сhoose another time.`,
      };

    case RES.TIME_ALREADY_TAKEN_AT_WINCH:
      return {
        status: "ERROR",
        title: `The time ${AddInfo} already booked at winch. Сhoose another time.`,
      };

    case RES.TIME_ALREADY_TAKEN_AT_CLIENT:
      return {
        status: "ERROR",
        title: `The time ${AddInfo} already booked at you. Cannot be booked same time on different winches or parks`,
      };

    case RES.INCORRECT_PHONE_VERIFICATION:
      return { status: "ERROR", title: "The verification code is incorrect." };

    case RES.TIME_NOT_PASSED:
      return { status: "ERROR", title: "You can't send SMS too often.\n Please try again later." };

    case RES.INCORRECT_PASSWORD:
      return { status: "ERROR", title: "Wrong password." };

    default:
      return title.statusText ? { title: title.statusText } : null;
  }
}
