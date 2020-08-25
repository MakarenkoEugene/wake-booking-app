import * as C from "../constants";
import * as RES from "../constants/response_title";
import * as A from "../action";
import * as ServerW from "./server_workers";
import moment from "moment";

import {
  SUCCES_LOGIN,
  INPUT_PHONE,
  SEND_CODE,
  INPUT_CODE,
  INPUT_PASSWORD,
  INPUT_CLIENT_DATA,
  SEND_CODE_SIGN_IN,
  INPUT_CODE_SIGN_IN,
} from "../constants/form";

import { getAlertForResponse, getErrorForResponse } from "./function";

const errorProcessing = async (error) => {
  console.log("errorProcessing -> error", error);
  let result = await error;
  if (error.json) result = await error.json();
  console.log("errorProcessing -> result", result);
  // let result = { title };
  // console.log("errorProcessing -> result", result);
  // if (error.json) result = await error.json();

  const { title, addInfo, needToWait, _session } = result;
  if (_session) ServerW.setSession(_session);

  if (title) {
    const errorMassage = getErrorForResponse(title, addInfo);
    return { errorMassage, needToWait };
  } else {
    console.error(error);
    return { errorMassage: { title: "Unhandled error" }, needToWait };
  }
};

export default (store) => (next) => async (action) => {
  switch (action.type) {
    case C.INIT:
      try {
        const config = action.config ? action.config : action.park && (await ServerW.getConfig(action.park));
        if (!config) return;

        next(A.setConfig({ ...config, park: action.park }));

        const { locale, utcOffset } = config.config;
        next(A.setDateConfig({ locale, utcOffset }));
      } catch (error) {
        const { errorMassage } = await errorProcessing(error);
        next(A.sendAlert(errorMassage));
      }

      try {
        if (action.config) break;
        const { title, client } = await ServerW.signIn();

        next(A.setClient(client));
        const { name, password, phone } = client;

        next(A.changeInputNameValue(name ? name : "", !!name));
        next(A.changeInputPhoneValue(phone ? `+${phone}` : "+380", !!phone));

        let alertMassage = null;

        if (name && password) {
          alertMassage = getAlertForResponse(title);
          next(A.setFormState(SUCCES_LOGIN));
        } else {
          alertMassage = getAlertForResponse(RES.CREATE_NEW_PROFILE, client.name);
          next(A.toggleShowForm());
          next(A.setFormState(INPUT_CLIENT_DATA));
        }

        if (alertMassage) next(A.sendAlert(alertMassage));
      } catch (error) {
        const { errorMassage } = await errorProcessing(error);
        next(A.sendAlert(errorMassage));
      } finally {
        next(A.setLoading(false));
      }
      break;

    case C.TOGGLE_SHOW_CLIENT_NAV:
      const { client } = store.getState();
      if (client) {
        next(action);
      } else {
        next(A.toggleShowForm());
      }
      break;

    case C.SET_FORM_STATE:
      if (action.formState === INPUT_PHONE) next(A.resClearAlert());
      next(A.changeInputNameValue("", false));
      next(A.changeInputPasswordValue("", false));
      next(A.changeInputCodeValue(""));
      next(A.changeInputRepeatPasswordValue(""));
      next(action);
      break;

    case C.CHANGE_SELECTED_DATE:
      try {
        next(A.toggleCalendar());

        const { selectedWinch: winchId, selectedTeacher: teacherId } = store.getState();
        const date = moment(action.date).format("YYYY-M-D");

        if (winchId) next(A.getWinchDateTurn({ winchId, date }));
        if (teacherId && teacherId.length === 24) next(A.getTeacherDateTurn({ teacherId, date }));

        next(action);
      } catch (error) {
        const { errorMassage } = await errorProcessing(error);
        next(A.sendAlert(errorMassage));
      }
      break;

    case C.CHECK_PHONE_NUMBER:
      try {
        next(A.setLoading(true));

        const phone = store.getState().form.inputPhoneValue.slice(1);

        const { title, name } = await ServerW.checkPhone(phone);

        let alertMassage = "";

        switch (title) {
          case RES.CLIENT_RIGHT:
            next(A.setFormState(INPUT_PASSWORD));
            alertMassage = getAlertForResponse(title, name);
            break;

          case RES.CLIENT_HAS_NO_PASSWORD:
            next(A.setFormState(SEND_CODE_SIGN_IN));
            alertMassage = getAlertForResponse(title, name);
            break;

          case RES.CLIENT_UNKNOWN:
            next(A.setFormState(SEND_CODE));
            alertMassage = getAlertForResponse(title);
            break;
        }

        next(A.sendAlert(alertMassage));
      } catch (error) {
        const { errorMassage } = await errorProcessing(error);
        next(A.sendAlert(errorMassage));
      } finally {
        next(A.setLoading(false));
      }
      break;

    case C.SIGN_UP:
      try {
        next(A.setLoading(true));

        const { form } = store.getState();
        const { inputPhoneValue: phone, inputCodeVerificationValue: codeVerification } = form;

        const { title, client, needToWait } = await ServerW.signUp({ phone: phone.slice(1), codeVerification });

        const alertMassage = getAlertForResponse(title, client ? client.name : null);

        switch (title) {
          case RES.SEEND_PHONE_VERIFICATION:
            next(A.setDelaySendNextSMS(needToWait));
            next(A.setFormState(INPUT_CODE));

            break;

          case RES.CREATE_NEW_PROFILE:
            next(A.setFormState(INPUT_CLIENT_DATA));
            break;
        }

        next(A.sendAlert(alertMassage));
      } catch (error) {
        const { errorMassage, needToWait } = await await errorProcessing(error);
        if (needToWait) next(A.setDelaySendNextSMS(needToWait));
        next(A.sendAlert(errorMassage));
      } finally {
        next(A.setLoading(false));
      }
      break;

    case C.SIGN_IN:
      try {
        next(A.setLoading(true));

        const { form } = store.getState();
        const { title, client, needToWait } = await ServerW.signIn(form);

        let alertMassage = "";

        switch (title) {
          case RES.SUCCES_LOGIN:
            if (client.name && client.password) {
              next(A.setClient(client));
              alertMassage = getAlertForResponse(RES.SUCCES_LOGIN);
              next(A.setFormState(SUCCES_LOGIN));
              next(A.toggleShowForm());
            } else {
              alertMassage = getAlertForResponse(RES.CREATE_NEW_PROFILE, client.name);
              next(A.changeInputNameValue(client.name));
              next(A.setFormState(INPUT_CLIENT_DATA));
            }
            break;

          case RES.SEEND_PHONE_VERIFICATION:
            next(A.setDelaySendNextSMS(needToWait));
            alertMassage = getAlertForResponse(RES.SEEND_PHONE_VERIFICATION);
            next(A.setFormState(INPUT_CODE_SIGN_IN));
            break;
        }

        if (alertMassage) next(A.sendAlert(alertMassage));
      } catch (error) {
        const { errorMassage, needToWait } = await errorProcessing(error);
        if (needToWait) next(A.setDelaySendNextSMS(needToWait));
        next(A.sendAlert(errorMassage));
      } finally {
        next(A.setLoading(false));
      }
      break;

    case C.UPDATE_CLIENT_DATA:
      try {
        next(A.setLoading(true));

        const {
          form: { inputNameValue: name, inputPasswordValue: password },
        } = store.getState();

        const { title, client } = await ServerW.update({ name, password });

        if (client) next(A.setClient(client));

        let alertMassage = "";

        switch (title) {
          case RES.SUCCESS_UPDATE:
            alertMassage = getAlertForResponse(RES.SUCCESS_UPDATE);
            next(A.setFormState(SUCCES_LOGIN));
            next(A.toggleShowForm());
            break;
        }

        next(A.sendAlert(alertMassage));
      } catch (error) {
        const { errorMassage } = await errorProcessing(error);
        next(A.sendAlert(errorMassage));
      } finally {
        next(A.setLoading(false));
      }
      break;

    case C.SIGN_OUT:
      next(A.setLoading(true));

      try {
        const { title, client } = await ServerW.signOut();

        switch (title) {
          case RES.SUCCESS_SIGN_OUT:
            next(A.setClient(client));
            next(A.setFormState(INPUT_PHONE));
            next(A.changeInputNameValue("", false));
            next(A.changeInputPhoneValue("+380", false));
            next(A.changeInputPasswordValue("", false));
            next(A.changeInputCodeValue(""));
            next(A.changeInputRepeatPasswordValue(""));
            next(A.toggleShowClientNav());
            break;
        }

        next(A.sendAlert(getAlertForResponse(title)));
      } catch (error) {
        const { errorMassage } = await errorProcessing(error);
        next(A.sendAlert(errorMassage));
      }
      next(A.setLoading(false));
      break;

    case C.SET_RESERVATION_TIME:
      try {
        const {
          config,
          date: { selectedDate },
          selectedTimes: timesList,
          selectedWinch: winchId,
          selectedTeacher,
        } = store.getState();

        const { _id: parkId, park: parkName, winches, teachers } = config;

        const teacherId = selectedTeacher && selectedTeacher.length === 24 ? selectedTeacher : 0;
        const date = moment(selectedDate).format("YYYY-M-D");

        const data = { date, timesList, winchId, parkId, teacherId };

        const { title } = await ServerW.setReservationTime(data);
        const alertMassage = getAlertForResponse(title);

        switch (title) {
          case RES.TIME_IS_SET:
            const { name: winchName } = winches.find((winch) => winch._id === winchId);
            const item = { park: { name: parkName, parkId }, winch: { name: winchName, winchId } };

            if (teacherId) {
              const { name, phone } = teachers.find((teacher) => teacher._id === teacherId);

              item.teacher = { name, phone, teacherId };
            }

            next(A.setItemToReservationList({ date, timesList: timesList.map((time) => ({ ...item, time })) }));
            next(A.clearSelectedTime());
            next(A.setSelectedDataToBuffer());
            next(A.setRecentlySaved({ date, timesList }));
            next(A.toggleShowClientNav());
            break;
        }

        next(A.sendAlert(alertMassage));
      } catch (error) {
        const { errorMassage } = await errorProcessing(error);
        next(A.sendAlert(errorMassage));
      }
      break;

    case C.DELETE_RESERVATION_TIME_ITEM:
      try {
        next(A.setLoading(true));

        const {
          config: { park, winches, teachers },
        } = store.getState();

        const winchName = winches.find((item) => item._id === action.deleteItem.winchId).name;
        const teacherName =
          action.deleteItem.teacherId && teachers.find((item) => item._id === action.deleteItem.teacherId).name;

        const continuedDelete = confirm(
          `You want to cancel your booking for ${action.deleteItem.date} at ${
            action.deleteItem.time
          }, in the wake park ${park} on the winch ${winchName}${teacherName ? ` with teacher ${teacherName}` : ""}?`
        );

        if (!continuedDelete) return;

        const { title } = await ServerW.deleteReservationTimeItem(action.deleteItem);
        const alertMassage = getAlertForResponse(title);

        switch (title) {
          case RES.TIME_IS_DELETED:
            next(A.deleteItemFromReservationList(action.deleteItem));
            next(A.deleteTimeFromBufferWinchTurn(action.deleteItem));

            if (action.deleteItem.teacherId) next(A.deleteTimeFromBufferTeacherTurn(action.deleteItem));
            break;
        }

        next(A.sendAlert(alertMassage));
      } catch (error) {
        const { errorMassage } = await errorProcessing(error);
        next(A.sendAlert(errorMassage));
      } finally {
        next(A.setLoading(false));
      }
      break;

    case C.RETRIVEE_PASSWORD:
      next(A.setLoading(true));
      try {
        const { title } = await ServerW.cleanSession();
        const alertMassage = getAlertForResponse(title, C.RETRIVEE_PASSWORD);

        next(A.setFormState(SEND_CODE_SIGN_IN));
        next(A.sendAlert(alertMassage));
      } catch (error) {
        const { errorMassage } = await errorProcessing(error);
        next(A.sendAlert(errorMassage));
      }
      next(A.setLoading(false));
      break;

    case C.CHANGE_SELECTED_WINCH:
      try {
        const { selectedDate } = store.getState().date;

        const winchId = action.indicator;
        const date = moment(selectedDate).format("YYYY-M-D");

        next(A.getWinchDateTurn({ winchId, date }));
        next(action);
      } catch (error) {
        console.log(error);
      }

      break;

    case C.CHANGE_SELECTED_TEACHER:
      try {
        const { selectedDate } = store.getState().date;

        const teacherId = action.indicator;
        const date = moment(selectedDate).format("YYYY-M-D");

        next(A.getTeacherDateTurn({ teacherId, date }));
        next(action);
      } catch (error) {
        console.log(error);
      }

      break;

    default:
      next(action);
      break;
  }
};
