import * as C from "../constants/config";

const init = {
  durationOfSet: 30,
  workWeekDayList: [
    {
      weekDay: "monday",
      timesList: [
        { time: "10:00" },
        { time: "10:30" },
        { time: "11:00" },
        { time: "11:30" },
        { time: "12:00" },
        { time: "12:30" },
        { time: "13:00" },
        { time: "13:30" },
        { time: "14:00" },
        { time: "14:30" },
        { time: "15:00" },
        { time: "15:30" },
        { time: "16:00" },
        { time: "16:30" },
        { time: "17:00" },
        { time: "17:30" },
        { time: "18:00" },
        { time: "18:30" },
        { time: "19:00" },
        { time: "19:30" },
      ],
    },
    {
      weekDay: "tuesday",
      timesList: [
        { time: "10:00" },
        { time: "10:30" },
        { time: "11:00" },
        { time: "11:30" },
        { time: "12:00" },
        { time: "12:30" },
        { time: "13:00" },
        { time: "13:30" },
        { time: "14:00" },
        { time: "14:30" },
        { time: "15:00" },
        { time: "15:30" },
        { time: "16:00" },
        { time: "16:30" },
        { time: "17:00" },
        { time: "17:30" },
        { time: "18:00" },
        { time: "18:30" },
        { time: "19:00" },
        { time: "19:30" },
      ],
    },
    {
      weekDay: "wednesday",
      timesList: [
        { time: "10:00" },
        { time: "10:30" },
        { time: "11:00" },
        { time: "11:30" },
        { time: "12:00" },
        { time: "12:30" },
        { time: "13:00" },
        { time: "13:30" },
        { time: "14:00" },
        { time: "14:30" },
        { time: "15:00" },
        { time: "15:30" },
        { time: "16:00" },
        { time: "16:30" },
        { time: "17:00" },
        { time: "17:30" },
        { time: "18:00" },
        { time: "18:30" },
        { time: "19:00" },
        { time: "19:30" },
      ],
    },
    {
      weekDay: "thursday",
      timesList: [
        { time: "10:00" },
        { time: "10:30" },
        { time: "11:00" },
        { time: "11:30" },
        { time: "12:00" },
        { time: "12:30" },
        { time: "13:00" },
        { time: "13:30" },
        { time: "14:00" },
        { time: "14:30" },
        { time: "15:00" },
        { time: "15:30" },
        { time: "16:00" },
        { time: "16:30" },
        { time: "17:00" },
        { time: "17:30" },
        { time: "18:00" },
        { time: "18:30" },
        { time: "19:00" },
        { time: "19:30" },
      ],
    },
    {
      weekDay: "friday",
      timesList: [
        { time: "10:00" },
        { time: "10:30" },
        { time: "11:00" },
        { time: "11:30" },
        { time: "12:00" },
        { time: "12:30" },
        { time: "13:00" },
        { time: "13:30" },
        { time: "14:00" },
        { time: "14:30" },
        { time: "15:00" },
        { time: "15:30" },
        { time: "16:00" },
        { time: "16:30" },
        { time: "17:00" },
        { time: "17:30" },
        { time: "18:00" },
        { time: "18:30" },
        { time: "19:00" },
        { time: "19:30" },
      ],
    },
    {
      weekDay: "saturday",
      timesList: [
        { time: "10:00" },
        { time: "10:30" },
        { time: "11:00" },
        { time: "11:30" },
        { time: "12:00" },
        { time: "12:30" },
        { time: "13:00" },
        { time: "13:30" },
        { time: "14:00" },
        { time: "14:30" },
        { time: "15:00" },
        { time: "15:30" },
        { time: "16:00" },
        { time: "16:30" },
        { time: "17:00" },
        { time: "17:30" },
        { time: "18:00" },
        { time: "18:30" },
        { time: "19:00" },
        { time: "19:30" },
      ],
    },
    {
      weekDay: "sunday",
      timesList: [
        { time: "10:00" },
        { time: "10:30" },
        { time: "11:00" },
        { time: "11:30" },
        { time: "12:00" },
        { time: "12:30" },
        { time: "13:00" },
        { time: "13:30" },
        { time: "14:00" },
        { time: "14:30" },
        { time: "15:00" },
        { time: "15:30" },
        { time: "16:00" },
        { time: "16:30" },
        { time: "17:00" },
        { time: "17:30" },
        { time: "18:00" },
        { time: "18:30" },
        { time: "19:00" },
        { time: "19:30" },
      ],
    },
  ],
};

const getMinuteOfTime = (time) => time.split(":")[0] * 60 + Number(time.split(":")[1]);
const getTimeOfMinute = (minutes) => {
  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;

  return `${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}`;
};

export default (state = init, action) => {
  switch (action.type) {
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
