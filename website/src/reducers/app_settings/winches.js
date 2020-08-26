import { SET_WINCH_DATA, ADD_WINCH, REMOVE_WINCH } from "../../constants/app_settings";
import pattern from "./pattern.json";

const { winches } = pattern;

export default (state = winches, action) => {
  switch (action.type) {
    case SET_WINCH_DATA:
      return state.map((winch) => (winch._id === action.winch._id ? action.winch : winch));

    case ADD_WINCH:
      const ObjectId = (m = Math, d = Date, h = 16, s = (s) => m.floor(s).toString(h)) =>
        s(d.now() / 1000) + " ".repeat(h).replace(/./g, () => s(m.random() * h));

      return [...state, { _id: ObjectId(), name: "", title: "" }];

    case REMOVE_WINCH:
      return state.filter((winch) => winch._id !== action._id);

    default:
      return state;
  }
};
