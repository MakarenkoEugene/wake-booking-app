import {
  PUSH_TO_BUFFER_WINCH_TURN,
  PUSH_TO_BUFFER_TEACHER_TURN,
  DELETE_TIME_FROM_BUFFER_WINCH_TURN,
  DELETE_TIME_FROM_BUFFER_TEACHER_TURN,
} from "../constants/index";

const init = {
  winchTurn: [],
  teacherTurn: [],
};

export default function (state = init, action) {
  switch (action.type) {
    case DELETE_TIME_FROM_BUFFER_TEACHER_TURN:
      return {
        ...state,
        teacherTurn: state.teacherTurn.map((item) =>
          item.date === action.date && item.teacherId === action.teacherId
            ? { ...item, dateTurn: item.dateTurn.filter((_item) => _item.time !== action.time) }
            : item
        ),
      };

    case DELETE_TIME_FROM_BUFFER_WINCH_TURN:
      return {
        ...state,
        winchTurn: state.winchTurn.map((item) =>
          item.date === action.date && item.winchId === action.winchId
            ? { ...item, dateTurn: item.dateTurn.filter((_item) => _item.time !== action.time) }
            : item
        ),
      };

    case PUSH_TO_BUFFER_WINCH_TURN:
      return {
        ...state,
        winchTurn: [...state.winchTurn.filter((item) => item.date !== action.winchTurn.date), action.winchTurn],
      };

    case PUSH_TO_BUFFER_TEACHER_TURN:
      return {
        ...state,
        teacherTurn: [...state.teacherTurn.filter((item) => item.date !== action.teacherTurn.date), action.teacherTurn],
      };

    default:
      return state;
  }
}
