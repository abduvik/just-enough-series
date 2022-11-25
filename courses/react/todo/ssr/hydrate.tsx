import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { App } from "../src/App";

ReactDOM.hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
