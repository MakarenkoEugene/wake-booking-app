import moment from "moment";
import * as C from "../constants/";
import * as A from "../action/";

export default (store) => (next) => async (action) => {
  switch (action.type) {
    case C.CHANGE_SELECTED_TEACHER:
    case C.CHANGE_SELECTED_WINCH:
    case C.CHANGE_SELECTED_DATE:
      const { selectedTimes } = store.getState();
      if (selectedTimes.length) next(A.clearSelectedTime());
      next(action);
      break;

    case C.UPDATE_CLIENT_RESERVATION:
      const {
        date: { locale, nowTime },
        client: { reservationList },
      } = store.getState();
      const nowDateNumber = Number(moment().locale(locale).utcOffset(nowTime).format("YYYYMD"));
      const nowTimeNumber = Number(moment().locale(locale).utcOffset(nowTime).format("Hmm"));

      const arr = reservationList.map((item) => {
        const date = Number(item.date.split("-").join(""));

        if (date === nowDateNumber) {
          const filteredTimesList = item.timesList.filter((item) => {
            return Number(item.time.split(":").join("")) > nowTimeNumber;
          });

          if (filteredTimesList.length) {
            return { ...item, timesList: filteredTimesList };
          }
          return null;
        } else if (date < nowDateNumber) {
          return null;
        } else {
          return item;
        }
      });
      next(A.setClientReservation(arr.filter((item) => !!item)));
      break;

    default:
      next(action);
  }
};
