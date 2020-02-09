import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "./hooks";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Router>
    <Provider>
      <App />
    </Provider>
  </Router>,
  rootElement
);
