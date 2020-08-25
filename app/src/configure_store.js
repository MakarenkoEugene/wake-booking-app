import { createStore, applyMiddleware } from "redux";

import rootReducers from "./reducers";
import middleware from "./middleware/";
import middlewareSecond from "./middleware/second";
import middlewareThird from "./middleware/third";

// const composeEnhancers =
//   typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ actionsBlacklist: ["SET_NOW_TIME"] })
//     : null;

export default function configureStore() {
  return createStore(rootReducers, applyMiddleware(middleware, middlewareSecond, middlewareThird));
  // return createStore(rootReducers, composeEnhancers(applyMiddleware(middleware, middlewareSecond, middlewareThird)));
}
