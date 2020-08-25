import { combineReducers, createStore } from "redux";

import navBar from "./nav_bar";
import forms from "./forms";
import appSettings from "./app_settings/index";
import dataIsLoading from "./loading";

export default combineReducers({ navBar, forms, dataIsLoading, appSettings });
