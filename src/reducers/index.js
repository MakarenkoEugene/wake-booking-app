import { combineReducers } from "redux";

import navBar from "./nav_bar";
import forms from "./forms";
import config from "./config";
import dataIsLoading from './loading'

export default combineReducers({ navBar, forms, dataIsLoading, config });
