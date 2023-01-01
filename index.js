import React from "react";
import ReactDOM from "react-dom";
import App from "./src/component/App";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Router basename="/public">
    <App />
  </Router>,
  document.getElementById("root")
);
