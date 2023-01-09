import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import React from "react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
const root = createRoot(document.getElementById("root")!);
root.render(
  <BrowserRouter basename="/">
    <MantineProvider>
      <App />
    </MantineProvider>
  </BrowserRouter>
);
