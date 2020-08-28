import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

import "./i18n/";
import "./assets/style/index.scss";

import Root from "./root";
import appSettings from "./middleware/app_settings";
import client from "./middleware/client";
import rootReducers from "./reducers";

function configureStore() {
  // return createStore(rootReducers, composeWithDevTools());
  return createStore(rootReducers, composeWithDevTools(applyMiddleware(client, appSettings)));
}

ReactDOM.render(
  <Provider store={configureStore()}>
    <Root />
  </Provider>,
  document.getElementById("root")
);

// callback for google racaptcha
window.onloadCallback = () => {};
