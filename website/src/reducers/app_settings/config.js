import * as C from "../../constants/app_settings";
import pattern from "./pattern.json";

const { config } = pattern;
const init = {
  durationOfSet: 30,
  ...config,
};

const getMinuteOfTime = (time) => time.split(":")[0] * 60 + Number(time.split(":")[1]);
const getTimeOfMinute = (minutes) => {
  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;

  return `${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}`;
};

export default (state = init, action) => {
  switch (action.type) {
    case C.SET_SHOW_ICONS_RESERVED:
      return { ...state, showIconsReserved: !!action.showIconsReserved };
      
    case C.SET_DURATION_OF_SET:
      return {
        ...state,
        durationOfSet: action.durationOfSet,
        workWeekDayList: state.workWeekDayList.map((weekDay) => {
          const closseTime = getMinuteOfTime(weekDay.timesList[weekDay.timesList.length - 1].time);
          const openTime =
            Math.floor(getMinuteOfTime(weekDay.timesList[0].time) / action.durationOfSet) * action.durationOfSet;
          const timesListLenght = Math.floor((closseTime - openTime + state.durationOfSet) / action.durationOfSet);

          const timesList = Array(timesListLenght)
            .fill(null)
            .map((item, i) => ({ time: getTimeOfMinute(i * action.durationOfSet + openTime) }));

          return { ...weekDay, timesList };
        }),
      };

    case C.SET_OPEN_WORK_TIME:
      try {
        const { timesList } = state.workWeekDayList.find((item) => item.weekDay === action.weekDay);
        const closseTime = timesList[timesList.length - 1].time;

        const timesListLenght =
          (getMinuteOfTime(closseTime) + state.durationOfSet - action.minutes) / state.durationOfSet;

        const newTimesList = Array(timesListLenght)
          .fill(null)
          .map((item, i) => ({ time: getTimeOfMinute(i * state.durationOfSet + action.minutes) }));

        return {
          ...state,
          workWeekDayList: state.workWeekDayList.map((item) =>
            item.weekDay === action.weekDay ? { ...item, timesList: newTimesList } : item
          ),
        };
      } catch (error) {
        console.log(error);
        return state;
      }

    case C.SET_CLOSSE_WORK_TIME:
      try {
        const { timesList } = state.workWeekDayList.find((item) => item.weekDay === action.weekDay);
        const openTime = getMinuteOfTime(timesList[0].time);

        const timesListLenght = (action.minutes - openTime) / state.durationOfSet;

        const newTimesList = Array(timesListLenght)
          .fill(null)
          .map((item, i) => ({ time: getTimeOfMinute(i * state.durationOfSet + openTime) }));

        return {
          ...state,
          workWeekDayList: state.workWeekDayList.map((item) =>
            item.weekDay === action.weekDay ? { ...item, timesList: newTimesList } : item
          ),
        };
      } catch (error) {
        console.log(error);
        return state;
      }

    default:
      return state;
  }
};
