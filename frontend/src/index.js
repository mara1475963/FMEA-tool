import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ModalWindowContextProvider } from "./contexts/modalWindowContext";
import { FMEADataContextProvider } from "./contexts/fmeaDataContext";

import {Provider} from 'react-redux'
import store from './store/store.js'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <FMEADataContextProvider>
    <ModalWindowContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ModalWindowContextProvider>
  </FMEADataContextProvider>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
