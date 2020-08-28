import * as constants from "../constants";

export const closseNavBar = () => ({ type: constants.NAV_BAR_CLOSSE });
export const showNavBar = () => ({ type: constants.NAV_BAR_SHOW });

export const setLoading = (dataIsLoading) => ({ type: constants.SET_LOADING, dataIsLoading });

export const setUser = (user) => ({ type: constants.SET_USER, user });
export const getUser = () => ({ type: constants.GET_USER });

