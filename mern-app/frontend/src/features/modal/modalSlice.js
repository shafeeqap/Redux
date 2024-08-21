import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isProfileModalOpen: false,
  isPasswordModalOpen: false,
  isProfileImageModalOpen: false,
  isForgotPasswordModalOpen: false,
  isResetPasswordModalOpen: false,
};
const modalSlice = createSlice({
  name: "modal",
  initialState: initialState,
  reducers: {
    openProfileModal: (state, action) => {
      state.isProfileModalOpen = true;
    },
    closeProfileModal: (state, action) => {
      state.isProfileModalOpen = false;
    },
    openPasswordModal: (state, action) => {
      state.isPasswordModalOpen = true;
    },
    closePasswordModal: (state, action) => {
      state.isPasswordModalOpen = false;
    },
    openProfileImageModal: (state, action) => {
      state.isProfileImageModalOpen = true;
    },
    closeProfileImageModal: (state, action) => {
      state.isProfileImageModalOpen = false;
    },
    openForgotPasswordModal: (state, action) =>{
      state.isForgotPasswordModalOpen = true;
    },
    closeForgotPasswordModal: (state, action) =>{
      state.isForgotPasswordModalOpen = false;
    },
    openResetPasswordModal: (state, action) =>{
      state.isResetPasswordModalOpen = true;
    },
    closeResetPasswordModal: (state, action) => {
      state.isResetPasswordModalOpen =false;
    }
  },
});

export const {
  openProfileModal,
  closeProfileModal,
  openPasswordModal,
  closePasswordModal,
  openProfileImageModal,
  closeProfileImageModal,
  openForgotPasswordModal,
  closeForgotPasswordModal,
  openResetPasswordModal,
  closeResetPasswordModal,
} = modalSlice.actions;

export default modalSlice.reducer;
