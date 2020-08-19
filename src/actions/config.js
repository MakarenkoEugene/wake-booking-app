const { SET_DURATION_OF_SET, SET_OPEN_WORK_TIME, SET_CLOSSE_WORK_TIME } = require("../constants/config");

export const setDurationOfSet = (durationOfSet) => ({ type: SET_DURATION_OF_SET, durationOfSet });
export const setOpenWorkTime = ({ weekDay, minutes }) => ({ type: SET_OPEN_WORK_TIME, weekDay, minutes });
export const setClosseWorkTime = ({ weekDay, minutes }) => ({ type: SET_CLOSSE_WORK_TIME, weekDay, minutes });
