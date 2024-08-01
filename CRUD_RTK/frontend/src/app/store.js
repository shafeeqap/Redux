import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../services/apiSlice";
import authReducer from "../features/auth/authSlice.js";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getdefaultMiddleware) =>
    getdefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
