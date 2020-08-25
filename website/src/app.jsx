import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

import serverAction from "./middleware/server_action";
import rootReducers from "./reducers";

import "./style/reset.scss";
import "./style/loader.scss";

function configureStore() {
  // return createStore(rootReducers, composeWithDevTools());
  return createStore(rootReducers, composeWithDevTools(applyMiddleware(serverAction)));
}

import HeadNav from "./components/nav/head/";
import Pages from "./pages";
import Footer from "./components/footer/footer";

function App() {
  return (
    <Provider store={configureStore()}>
      <Router>
        <HeadNav />
        <Pages />
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
