import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";

import configureStore from "./store/configureStore";
import App from "./App";
import "./index.scss";

ReactDOM.render(
  <Provider store={configureStore}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>,
  document.getElementById("root")
);
