import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/user/authSlice.js";
import { apiSlice } from "../services/apiSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath] : apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
