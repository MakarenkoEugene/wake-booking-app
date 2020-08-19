import { SET_LOADING } from '../constants/'

export default (state = true, action) => {
  switch (action.type) {
    case SET_LOADING:
      return  action.dataIsLoading;

    default:
      return state;
  }
};