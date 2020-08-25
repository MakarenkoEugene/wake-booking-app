import { NAV_BAR_SHOW, NAV_BAR_CLOSSE } from "../constants";

const init = {
<<<<<<< HEAD
  isClosse: true,
=======
  isClosse: false,
>>>>>>> fd73a7a4c780ac691b15ad0cea22a298f1b72905
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
