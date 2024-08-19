import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import modalReducer from "../features/modal/modalSlice.js";
import { apiSlice } from "../services/apiSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer, 
    [apiSlice.reducerPath] : apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
