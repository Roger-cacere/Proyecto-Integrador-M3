import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import ReactDOM from "react-dom/client";
import "./reset.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
