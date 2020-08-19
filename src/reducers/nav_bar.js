import { NAV_BAR_SHOW, NAV_BAR_CLOSSE } from "../constants";

const init = {
  isClosse: false,
};

export default (state = init, action) => {
  switch (action.type) {
    case NAV_BAR_SHOW:
      return { ...state, isClosse: false };

    case NAV_BAR_CLOSSE:
      return { ...state, isClosse: true };

    default:
      return state;
  }
};
