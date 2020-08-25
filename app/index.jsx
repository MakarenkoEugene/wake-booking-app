// import regeneratorRuntime from "regenerator-runtime";
import ru from "../node_modules/moment/locale/ru";
import uk from "../node_modules/moment/locale/uk";
// import { composeWithDevTools } from "redux-devtools-extension";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./src/configure_store";

import App from "./src/";

const container = document.getElementById("_wakebooking");

if (container) {
  // const park = container.attributes["park"].value;

  ReactDOM.render(
    <Provider store={configureStore()}>
      <App container={container} />
    </Provider>,
    container
  );
}

export default () => {
  return (
    <iframe
      src="./app.html"
      scrolling="no"
      width="320"
      height="100%"
      frameBorder="0"
    ></iframe>
  );
};

// export default ({ container, config }) => {
//   return (
//     <Frame
//       width="320px"
//       height="100%"
//       frameBorder="0"
//       initialContent='<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1.0" />></head><body><div id="_wakebooking"></div></body></html>'
//     >
//       <Provider store={configureStore()}>
//         <App container={container} park="Wake Booking" _config={config} />
//       </Provider>
//     </Frame>
//   );
// };
