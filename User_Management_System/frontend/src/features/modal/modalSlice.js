import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isProfileModalOpen: false,
  isPasswordModalOpen: false,
  isProfileImageModalOpen: false,
  isForgotPasswordModalOpen: false,
  isAddNewUserModalOpen: false,
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
    openAddNewUserModal: (state, action) =>{
      state.isAddNewUserModalOpen = true;
    },
    closeAddNewUserModal: (state, action) =>{
      state.isAddNewUserModalOpen = false;
    },
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
  openAddNewUserModal,
  closeAddNewUserModal,
} = modalSlice.actions;

export default modalSlice.reducer;
