import * as C from "../constants";

export default function (state = null, action) {
  switch (action.type) {
    case C.SET_CLIENT:
      return action.client;

    case C.SET_CLIENT_RESERVATION: {
      return { ...state, reservationList: action.clientReservation };
    }

    case C.SET_ITEM_TO_RESERVATION_LIST:
      const dateReserved = state.reservationList.find((item) => item.date === action.item.date);

      if (dateReserved) {
        return {
          ...state,
          reservationList: state.reservationList.map((item) =>
            item.date !== action.item.date
              ? item
              : { date: item.date, timesList: [...item.timesList, ...action.item.timesList] }
          ),
        };
      } else {
        return { ...state, reservationList: [...state.reservationList, action.item] };
      }

    case C.DELETE_ITEM_FROM_RESERVATION_LIST:
      return {
        ...state,
        reservationList: state.reservationList.map((item) =>
          item.date === action.date
            ? { ...item, timesList: item.timesList.filter((_item) => _item.time !== action.time) }
            : item
        ),
      };

    default:
      return state;
  }
}
