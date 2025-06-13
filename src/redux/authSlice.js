// authSlice.js

import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
      isFetching: false,
      error: false,
    },
    register: {
      isFetching: false,
      success: false,
      error: false,
    },
    updateUserInfo: {
      isFetching: false,
      success: false,
      error: false,
    },
  },
  reducers: {
    // Đăng nhập
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
      state.login.error = false;
    },
    loginFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },

    // Đăng xuất
    logout: (state) => {
      state.login.currentUser = null;
    },

    // Đăng ký
    registerStart: (state) => {
      state.register.isFetching = true;
      state.register.success = false;
      state.register.error = false;
    },
    registerSuccess: (state) => {
      state.register.isFetching = false;
      state.register.success = true;
      state.register.error = false;
    },
    registerFailed: (state) => {
      state.register.isFetching = false;
      state.register.error = true;
      state.register.success = false;
    },

    // Cập nhật thông tin người dùng
    updateUserInfoStart: (state) => {
      state.updateUserInfo.isFetching = true;
      state.updateUserInfo.success = false;
      state.updateUserInfo.error = false;
    },
    updateUserInfoSuccess: (state, action) => {
      state.updateUserInfo.isFetching = false;
      state.updateUserInfo.success = true;
      state.updateUserInfo.error = false;
      state.login.currentUser = {
        ...state.login.currentUser,
        ...action.payload,
      };
    },
    updateUserInfoFailed: (state) => {
      state.updateUserInfo.isFetching = false;
      state.updateUserInfo.error = true;
      state.updateUserInfo.success = false;
    },

    // Cập nhật avatar
    updateUserAvatar: (state, action) => {
      if (state.login.currentUser) {
        state.login.currentUser = {
          ...state.login.currentUser,
          avatar: action.payload,
        };
      }
    },

    // Reset Password
    resetPassword: (state, action) => {
      if (state.login.currentUser) {
        state.login.currentUser = {
          ...state.login.currentUser,
          password: action.payload,
        };
      }
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailed,
  logout,
  registerStart,
  registerSuccess,
  registerFailed,
  updateUserAvatar,
  resetPassword,
  updateUserInfoStart,
  updateUserInfoSuccess,
  updateUserInfoFailed,
} = authSlice.actions;

export default authSlice.reducer;
