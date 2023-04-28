import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import { store } from "./store/store.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { getNewId } from "./helpers";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Navigate replace to={`/analyses/${getNewId()}`} />}
        />
        <Route path="/analyses/:id" element={<App />} />
      </Routes>
    </Router>
  </Provider>
);

reportWebVitals();
