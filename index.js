import React from "react";
import ReactDOM from "react-dom";
import App from "./src/component/App";
import { BrowserRouter as Router } from "react-router-dom";

import { createRoot } from "react-dom/client";
const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Router basename={process.env.PUBLIC_URL}>
    <App />
  </Router>
);
