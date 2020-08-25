import * as C from "../constants";

const init = {
  recentlySaved: { date: "2020-7-22", timesList: ["17:00"] },
  showedDate: [],
  isShow: false,
};

export default function (state = init, action) {
  switch (action.type) {
    case C.CLOSSE_SHOWED_DATE:
      return { ...state, showedDate: [] };

    case C.TOGGLE_SHOWED_DATE:
      return {
        ...state,
        showedDate: state.showedDate.includes(action.date)
          ? state.showedDate.filter((item) => item !== action.date)
          : [...state.showedDate, action.date],
      };

    case C.TOGGLE_SHOW_CLIENT_NAV:
      return {
        ...state,
        isShow: !state.isShow,
      };

    case C.SET_RECENTLY_SAVED:
      return {
        ...state,
        recentlySaved: action.recentlySaved,
      };

    default:
      return state;
  }
}
