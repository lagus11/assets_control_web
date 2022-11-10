import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { PersistGate } from "redux-persist/es/integration/react";
import { persistStore } from "redux-persist";

const persistor = persistStore(store);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <App />
    </Provider>
  </PersistGate>
);
