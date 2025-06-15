import axios from "axios";
import { AppDispatch } from "./store";
import {
  loginStart,
  loginSuccess,
  loginFailed,
  updateUserInfoStart,
  updateUserInfoSuccess,
  updateUserInfoFailed,
  logout as logoutAction,
} from "./authSlice";
import { ROUTER } from "utils/router";

interface User {
  _id?: string;
  username?: string;
  phone: string;
  password: string;
  email?: string;
  dateOfBirth?: string;
  avatar?: string;
  address?: string;
}

interface LoginResponse {
  accessToken: string;
  user: User;
}

// Đăng nhập
export const loginUser = async (
  user: Pick<User, "phone" | "password">,
  dispatch: AppDispatch,
  navigate: (path: string) => void
) => {
  dispatch(loginStart());
  try {
    const res = await axios.post<LoginResponse>("/auth/login", user);
    const { accessToken, user: userData } = res.data;
    dispatch(loginSuccess(userData));
    localStorage.setItem("accessToken", accessToken);
    navigate(`/${ROUTER.USER.HOME}`);
  } catch (err) {
    dispatch(loginFailed());
    console.error("Login failed", err);
  }
};

// Đăng ký
export const registerUser = async (
  user: User,
  dispatch: AppDispatch,
  navigate: (path: string) => void
) => {
  dispatch(loginStart());
  try {
    const res = await axios.post<LoginResponse>("/auth/register", user);
    const { user: userData } = res.data;
    dispatch(loginSuccess(userData));
    navigate(`/${ROUTER.USER.LOGIN}`);
  } catch (err) {
    dispatch(loginFailed());
    console.error("Register failed", err);
  }
};

// Đăng xuất
export const logout = (dispatch: AppDispatch) => {
  dispatch(logoutAction());
  localStorage.removeItem("accessToken");
};

// Cập nhật thông tin người dùng
export const updateUserInfo = async (
  userInfo: Partial<User>,
  dispatch: AppDispatch
) => {
  dispatch(updateUserInfoStart());
  try {
    const response = await axios.put<User>(
      "/auth/update-info",
      userInfo,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    dispatch(updateUserInfoSuccess(response.data));
    console.log("User info updated successfully");
  } catch (err) {
    dispatch(updateUserInfoFailed());
    console.error("Lỗi khi cập nhật thông tin:", err);
  }
};

// Cập nhật avatar
export const updateUserAvatar = async (
  base64Image: string,
  dispatch: AppDispatch
) => {
  dispatch(updateUserInfoStart());
  try {
    const response = await axios.put<User>(
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
      err instanceof Error ? err.message : "Unknown error"
    );
  }
};