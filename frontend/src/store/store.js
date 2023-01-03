import {
    combineReducers,
    configureStore,
  } from "@reduxjs/toolkit";
  import { middlewares, reducers } from "./reducers";
  
  const store = configureStore({
    reducer: combineReducers(reducers),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(...middlewares),
  });
  
  export default store;