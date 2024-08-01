import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    clearuser: (state) => {
      state.user = null;
    },
  },
});

export const {setUser, clearuser} = authSlice.actions;
export default authSlice.reducer;
