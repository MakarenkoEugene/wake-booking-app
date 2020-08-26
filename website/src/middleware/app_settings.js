import API from "./server_worker";
import * as C from "../constants/app_settings";
import { addAdmin, addTeacher } from "../actions/app_settings";
import { setLoading } from "../actions/index";

export default () => (next) => async (action) => {
  switch (action.type) {
    case C.GET_CLIENT_FOR_ADMIN:
      try {
        next(setLoading(true));

        const client = await API.getClient(action.phone);
        if (client.title !== "CLIENT_RIGHT") throw client;

        next(addAdmin({ name: client.name, phone: action.phone, _id: client._id, rights: ["SEE"] }));
      } catch (error) {
        alert(error.title ? error.title : error);
      } finally {
        next(setLoading(false));
      }
      break;

    case C.GET_CLIENT_FOR_TEACHER:
      try {
        next(setLoading(true));

        const client = await API.getClient(action.phone);
        if (client.title !== "CLIENT_RIGHT") throw client;

        next(addTeacher({ name: client.name, phone: action.phone, _id: client._id }));
      } catch (error) {
        alert(error.title ? error.title : error);
      } finally {
        next(setLoading(false));
      }
      break;

    default:
      next(action);
  }
};
