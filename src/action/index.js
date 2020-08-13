import * as C from "../constants";

export const init = (park) => ({ type: C.INIT, park });
export const dataDidNotLoad = () => ({ type: C.DATA_DID_NOT_LOAD });
export const setConfig = (config) => ({ type: C.SET_CONFIG, config });
export const setLoading = (dataIsLoading) => ({ type: C.SET_LOADING, dataIsLoading });

//date
export const setNowTime = (nowTime) => ({ type: C.SET_NOW_TIME, nowTime });
export const setNowDate = (nowDate) => ({ type: C.SET_NOW_DATE, nowDate });
export const setCalendarDate = (calendarDate) => ({ type: C.SET_CALENDAR_DATE, calendarDate });
export const setDateConfig = ({ locale, utcOffset }) => ({ type: C.SET_DATE_CONFIG, locale, utcOffset });

export const toggleCalendar = () => ({ type: C.TOGGLE_CALENDAR });
export const changeCalendarDate = (calendarDate) => ({ type: C.CHANGE_CALENDAR_DATE, calendarDate });
export const changeSelectedDate = (date) => ({ type: C.CHANGE_SELECTED_DATE, date });
export const updateNowDate = () => ({ type: C.UPDATE_NOW_DATE });
export const increaseCalendarDate = () => ({ type: C.INCREASE_CALENDAR_DATE });
export const decreaseCalendarDate = () => ({ type: C.DECREASE_CALENDAR_DATE });
export const updateParkStringDate = (parkStringDate) => ({ type: C.UPDATE_PARK_STRING_DATE, parkStringDate });
export const updateParkStringTime = (parkStringTime) => ({ type: C.UPDATE_PARK_STRING_TIME, parkStringTime });

// other modulse
export const changeSelectedWinch = (indicator) => ({ type: C.CHANGE_SELECTED_WINCH, indicator });
export const changeSelectedTeacher = (indicator) => ({ type: C.CHANGE_SELECTED_TEACHER, indicator });
export const changeSelectedTime = (time) => ({ type: C.CHANGE_SELECTED_TIME, time });
export const clearSelectedTime = () => ({ type: C.CLEAR_SELECTED_TIME });

// alert
export const resClearAlert = () => ({ type: C.RES_CLEAR_ALERT });
export const sendAlert = (alertMassage) => ({ type: C.RES_SEND_ALERT, alertMassage });

// buffer
export const pushToBufferWinchTurn = (winchTurn) => ({ type: C.PUSH_TO_BUFFER_WINCH_TURN, winchTurn });
export const pushToBufferTeacherTurn = (teacherTurn) => ({ type: C.PUSH_TO_BUFFER_TEACHER_TURN, teacherTurn });
export const deleteTimeFromBufferWinchTurn = ({ date, time, winchId }) => {
  return { type: C.DELETE_TIME_FROM_BUFFER_WINCH_TURN, date, time, winchId };
};
export const deleteTimeFromBufferTeacherTurn = ({ date, time, teacherId }) => {
  return { type: C.DELETE_TIME_FROM_BUFFER_TEACHER_TURN, date, time, teacherId };
};

// midelware bufer
export const setSelectedDataToBuffer = () => ({ type: C.SET_SELECTED_DATA_TO_BUFFER });
export const getWinchDateTurn = ({ winchId, date }) => ({ type: C.GET_WINCH_DATE_TURN, winchId, date });
export const getTeacherDateTurn = ({ teacherId, date }) => ({ type: C.GET_TEACHER_DATE_TURN, teacherId, date });

//form
export const setFormState = (formState) => ({ type: C.SET_FORM_STATE, formState });
export const toggleShowForm = () => ({ type: C.TOGGLE_FORM_IS_SHOW });
export const setDelaySendNextSMS = (needToWait) => ({ type: C.SET_DELAY_SEND_NEXT_SMS, needToWait });
export const changeInputNameValue = (value, valid) => ({ type: C.CHANGE_INPUT_NAME_VALUE, value, valid });
export const changeInputCodeValue = (value) => ({ type: C.CHANGE_INPUT_CODE_VALUE, value });
export const changeInputPhoneValue = (value, valid) => ({ type: C.CHANGE_INPUT_PHONE_VALUE, value, valid });
export const changeInputPasswordValue = (value, valid) => ({ type: C.CHANGE_INPUT_PASSWORD_VALUE, value, valid });
export const changeInputRepeatPasswordValue = (value) => ({ type: C.CHANGE_INPUT_REPEAT_PASSWORD_VALUE, value });

// client
export const setClient = (client) => ({ type: C.SET_CLIENT, client });
export const setItemToReservationList = (item) => ({ type: C.SET_ITEM_TO_RESERVATION_LIST, item });
export const deleteItemFromReservationList = ({ date, time }) => {
  return { type: C.DELETE_ITEM_FROM_RESERVATION_LIST, date, time };
};

export const updateClientReservation = () => ({ type: C.UPDATE_CLIENT_RESERVATION });
export const setClientReservation = (clientReservation) => ({ type: C.SET_CLIENT_RESERVATION, clientReservation });

// client_nav
export const toggleShowClientNav = () => ({ type: C.TOGGLE_SHOW_CLIENT_NAV });
export const toggleShowedDate = (date) => ({ type: C.TOGGLE_SHOWED_DATE, date });
export const closseShowedDate = () => ({ type: C.CLOSSE_SHOWED_DATE });
export const setRecentlySaved = (recentlySaved) => ({ type: C.SET_RECENTLY_SAVED, recentlySaved });

//fetch
export const checkPhoneNumber = () => ({ type: C.CHECK_PHONE_NUMBER });
export const signUp = () => ({ type: C.SIGN_UP });
export const signIn = () => ({ type: C.SIGN_IN });
export const signOut = () => ({ type: C.SIGN_OUT });
export const updateClientData = () => ({ type: C.UPDATE_CLIENT_DATA });
export const retrievePassword = () => ({ type: C.RETRIVEE_PASSWORD });
export const setReservationTime = () => ({ type: C.SET_RESERVATION_TIME });
export const deleteReservationTimeItem = (deleteItem) => ({ type: C.DELETE_RESERVATION_TIME_ITEM, deleteItem });
