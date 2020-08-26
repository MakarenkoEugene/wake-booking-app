import { ADD_ADMIN, SET_ADMIN_RIGHTS, REMOVE_ADMIN } from "../../constants/app_settings";
import pattern from "./pattern.json";

const { admins } = pattern;

export default (state = admins, action) => {
  switch (action.type) {
    case ADD_ADMIN:
      return [...state, action.admin];

    case SET_ADMIN_RIGHTS:
      return state.map((admin) => (admin._id !== action._id ? admin : { ...admin, rights: action.rights }));

    case REMOVE_ADMIN:
      return state.filter((admin) => admin._id !== action._id);

    default:
      return state;
  }
};
