import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider as ReduxStoreProvider } from "react-redux";
import "antd/dist/antd.less";
import store from "./redux/store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ReduxStoreProvider store={store}>
      <App />
    </ReduxStoreProvider>
  </React.StrictMode>
);
