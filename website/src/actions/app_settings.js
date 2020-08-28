import * as C from "../constants/app_settings";

// config {}
// config duration Of set
export const setDurationOfSet = (durationOfSet) => ({ type: C.SET_DURATION_OF_SET, durationOfSet });

// config week day list
export const setOpenWorkTime = ({ weekDay, minutes }) => ({ type: C.SET_OPEN_WORK_TIME, weekDay, minutes });
export const setClosseWorkTime = ({ weekDay, minutes }) => ({ type: C.SET_CLOSSE_WORK_TIME, weekDay, minutes });

// config icons reserved
export const setShowIconsReserved = (showIconsReserved) => ({ type: C.SET_SHOW_ICONS_RESERVED, showIconsReserved });

// config color
export const discardSettingsColor = () => ({ type: C.DISCARD_SETTINGS_COLOR });
export const setValueForColor = (color, value) => ({ type: C.SET_VALUE_FOR_COLOR, color, value });

// wihches
export const setWinchData = (winch) => ({ type: C.SET_WINCH_DATA, winch });
export const addWinch = () => ({ type: C.ADD_WINCH });
export const removeWinch = (_id) => ({ type: C.REMOVE_WINCH, _id });

// admins
export const getClientForAdmin = (phone) => ({ type: C.GET_CLIENT_FOR_ADMIN, phone });
export const addAdmin = (admin) => ({ type: C.ADD_ADMIN, admin });
export const setAdminRights = (_id, rights) => ({ type: C.SET_ADMIN_RIGHTS, _id, rights });
export const removeAdmin = (_id) => ({ type: C.REMOVE_ADMIN, _id });

// teachers
export const getClientForTeacher = (phone) => ({ type: C.GET_CLIENT_FOR_TEACHER, phone });
export const addTeacher = (teacher) => ({ type: C.ADD_TEACHER, teacher });
export const removeTeacher = (_id) => ({ type: C.REMOVE_TEACHER, _id });

// nonWorkingDays
export const addNonWorkingDate = (date) => ({ type: C.ADD_NON_WORKING_DATE, date });
export const removeNonWorkingDate = (date) => ({ type: C.REMOVE_NON_WORKING_DATE, date });
