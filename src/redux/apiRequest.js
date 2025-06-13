// apiRequest.js

import axios from "axios";
import {
  loginStart,
  loginSuccess,
  loginFailed,
  updateUserInfoStart,
  updateUserInfoSuccess,
  updateUserInfoFailed,
} from "./authSlice";
import { ROUTER } from "utils/router";

// Đăng nhập
export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/auth/login", user);
    const userData = res.data;
    dispatch(loginSuccess(userData));
    localStorage.setItem("accessToken", userData.accessToken);
    navigate(`/${ROUTER.USER.HOME}`);
  } catch (err) {
    dispatch(loginFailed());
    console.error("Login failed", err);
  }
};

// Đăng ký
export const registerUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/auth/register", user);
    dispatch(loginSuccess(res.data));
    navigate(`/${ROUTER.USER.LOGIN}`);
  } catch (err) {
    dispatch(loginFailed());
    console.error("Register failed", err);
  }
};

// Đăng xuất
export const logout = (dispatch) => {
  dispatch(logout());
  localStorage.removeItem("accessToken");
};

// Cập nhật thông tin người dùng
export const updateUserInfo = async (userInfo, dispatch) => {
  dispatch(updateUserInfoStart());
  try {
    const response = await axios.put("/auth/update-info", userInfo, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    dispatch(updateUserInfoSuccess(response.data));
    console.log("User info updated successfully");
  } catch (err) {
    dispatch(updateUserInfoFailed());
    console.error("Lỗi khi cập nhật thông tin:", err);
  }
};

// Cập nhật avatar
export const updateUserAvatar = async (base64Image, dispatch) => {
  dispatch(updateUserInfoStart());
  try {
    const response = await axios.put(
      "/auth/update-avatar",
      { avatar: base64Image },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    dispatch(updateUserInfoSuccess(response.data));
    console.log("Avatar updated successfully");
  } catch (err) {
    dispatch(updateUserInfoFailed());
    console.error(
      "Lỗi khi cập nhật avatar:",
      err.response ? err.response.data : err.message
    );
  }
};
