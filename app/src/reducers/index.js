import { combineReducers, createStore } from "redux";

import * as other from "./other";
import clientReducer from "./client";
import formReducer from "./form";
import config from "./config";
import buffer from "./buffer";
import clientNav from "./client_nav";
import date from "./date";

const rootReducer = combineReducers({
  ...other,
  date,
  clientNav,
  buffer,
  config,
  client: clientReducer,
  form: formReducer,
});

export default rootReducer;
