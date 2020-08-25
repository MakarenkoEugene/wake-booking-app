import React from "react";
import ReactDOM from "react-dom";
import "./i18n";
import App from "../src/app";

ReactDOM.render(<App />, document.getElementById("root"));

// callback for google racaptcha
window.onloadCallback = () => {};
