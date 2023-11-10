import React from "react";
import ReactDOM from "react-dom/client";
import router from "./router";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import "./stylesheets/main.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  /* </Provider> */
);
