import { ADD_TEACHER, REMOVE_TEACHER } from "../../constants/app_settings";
import pattern from "./pattern.json";

const { teachers } = pattern;

export default (state = teachers, action) => {
  switch (action.type) {
    case ADD_TEACHER:
      return [...state, action.teacher];

    case REMOVE_TEACHER:
      return state.filter((teacher) => teacher._id !== action._id);

    default:
      return state;
  }
};
