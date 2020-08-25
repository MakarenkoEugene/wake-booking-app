import regeneratorRuntime from "regenerator-runtime";
import ru from "../node_modules/moment/locale/ru";
import uk from "../node_modules/moment/locale/uk";
import { composeWithDevTools } from "redux-devtools-extension";

import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import rootReducers from "./src/reducers";
import middleware from "./src/middleware/";
import middlewareSecond from "./src/middleware/second";
import middlewareThird from "./src/middleware/third";

import App from "./src/";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ actionsBlacklist: ["SET_NOW_TIME"] })
    : null;

function configureStore() {
  // return createStore(rootReducers, composeWithDevTools());
  return createStore(rootReducers, composeEnhancers(applyMiddleware(middleware, middlewareSecond, middlewareThird)));
}

const container = document.getElementById("_wakebooking");
const parkName = container.attributes["park"].value;

ReactDOM.render(
  <Provider store={configureStore()}>
    <App park={parkName} container={container} />
  </Provider>,
  container
);
