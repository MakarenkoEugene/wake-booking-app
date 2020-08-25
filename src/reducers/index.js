import { combineReducers } from "redux";

import navBar from "./nav_bar";
import forms from "./forms";
<<<<<<< HEAD
import appSettings from "./app_settings/index";
import dataIsLoading from "./loading";

export default combineReducers({ navBar, forms, dataIsLoading, appSettings });
=======
import config from "./config";
import dataIsLoading from './loading'

export default combineReducers({ navBar, forms, dataIsLoading, config });
>>>>>>> fd73a7a4c780ac691b15ad0cea22a298f1b72905
