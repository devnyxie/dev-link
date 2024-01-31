import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./css/index.css";
import "./css/default.css";
import { Provider } from "react-redux";
import store from "./redux/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
