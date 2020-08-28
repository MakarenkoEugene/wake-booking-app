import API from "./server_worker";
import * as C from "../constants/client";
import { setLogInFormState } from "../actions/forms";
import { CHECK_PASSWORD } from "../constants/log_in_form_state";
import { setLoading } from "../actions/index";

export default () => (next) => async (action) => {
  switch (action.type) {
    case C.LOG_IN_CHECK_PHONE:
      try {
        next(setLoading(true));

        const client = await API.getClient(action.phone);
        if (client.title !== "CLIENT_RIGHT") throw client;

        console.log(client);
        next(setLogInFormState(CHECK_PASSWORD))
        // next(addAdmin());
      } catch (error) {
        console.log(error);
        alert(error.title ? error.title : error);
      } finally {
        next(setLoading(false));
      }
      break;

    default:
      next(action);
  }
};
