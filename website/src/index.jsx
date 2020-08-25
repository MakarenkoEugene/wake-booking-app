import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

import "./i18n/";
import "./assets/style/index.scss";

import Root from "./root";
import serverAction from "./middleware/server_action";
import rootReducers from "./reducers";

function configureStore() {
  // return createStore(rootReducers, composeWithDevTools());
  return createStore(rootReducers, composeWithDevTools(applyMiddleware(serverAction)));
}

ReactDOM.render(
  <Provider store={configureStore()}>
    <Root />
  </Provider>,
  document.getElementById("root")
);

// callback for google racaptcha
window.onloadCallback = () => {};
