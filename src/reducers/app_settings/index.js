import { combineReducers } from "redux";
import pattern from "./pattern.json";

import config from "./config";
import winches from "./winches";
import admins from "./admins";

const teachers = (state = pattern.teachers, action) => state;
const _id = (state = pattern._id, action) => state;
const name = (state = pattern.name, action) => state;

export default combineReducers({ name, _id, admins, winches, teachers, config });
