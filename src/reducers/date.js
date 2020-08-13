import * as C from "../constants";

const init = {
  nowDate: null,
  calendarDate: null,
  nowTime: null,
  locale: "en",
  utcOffset: 0,
  selectedDate: null,
};

export default function (state = init, action) {
  switch (action.type) {
    case C.SET_DATE_CONFIG:
      return {
        ...state,
        locale: action.locale,
        utcOffset: action.utcOffset,
      };

    case C.SET_NOW_TIME:
      return { ...state, nowTime: action.nowTime };

    case C.SET_NOW_DATE:
      return { ...state, nowDate: action.nowDate };

    case C.CHANGE_SELECTED_DATE:
      return { ...state, selectedDate: action.date };

    case C.SET_CALENDAR_DATE:
      return { ...state, calendarDate: action.calendarDate };

    default:
      return state;
  }
}

// export default combineReducers({ navBar, user, forms, dataIsLoading });

// export const calendarDate = (s = new Date(), a) => (a.type === C.CHANGE_CALENDAR_DATE ? a.calendarDate : s);
// export const nowDate = (s = new Date(), a) => (a.type === C.UPDATE_NOW_DATE ? new Date() : s);
// export const selectedDate = (s = null, a) => (a.type === C.CHANGE_SELECTED_DATE ? a.date : s);
