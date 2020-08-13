// import { combineReducers } from "redux";
import * as C from "../constants";

export const loading = (s = true, a) => (a.type === C.SET_LOADING ? a.dataIsLoading : s);
export const selectedTeacher = (s = null, a) => (a.type === C.CHANGE_SELECTED_TEACHER ? a.indicator : s);
export const selectedWinch = (s = null, a) => (a.type === C.CHANGE_SELECTED_WINCH ? a.indicator : s);
export const selectedTimes = (s = [], a) => {
  if (a.type === C.CHANGE_SELECTED_TIME) {
    return s.includes(a.time) ? s.filter((time) => time !== a.time) : [...s, a.time];
  } else if (a.type === C.CLEAR_SELECTED_TIME) return [];
  return s;
};
export const calendarIsOpen = (s = true, a) => (a.type === C.TOGGLE_CALENDAR ? !s : s);
export const alertMassage = (s = null, a) => {
  switch (a.type) {
    case C.RES_SEND_ALERT:
      return a.alertMassage;

    case C.RES_CLEAR_ALERT:
      return null;

    default:
      return s;
  }
};
export const accessDenied = (s = null, a) => (a.type === C.DATA_DID_NOT_LOAD ? true : s);
