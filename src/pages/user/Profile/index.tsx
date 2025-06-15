import React, { useState, ChangeEvent } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FcCurrencyExchange, FcContacts, FcBullish, FcSynchronize, FcExport } from "react-icons/fc";
import { IoLocation } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/apiRequest";
import { RootState } from "../../../redux/store";
import "./style.scss";

type MenuItem = "payment" | "account-info" | "ticket-history" | "address" | "reset-password";

const Profile: React.FC = () => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState<MenuItem>(() => {
    const path = location.pathname.split('/').pop();
    return (path as MenuItem) || 'payment';
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state: RootState) => state.auth.login.currentUser);

  const handleMenuClick = (menu: MenuItem): void => {
    setActiveMenu(menu);
  };

  const handleLogout = (): void => {
    logout(dispatch);
    navigate("/");
  };

  const isAgeValid = (dob: string): boolean => {
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      return age - 1 >= 15;
    }

    return age >= 15;
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (!file) return;

    const maxSize = 1 * 1024 * 1024; // 1MB
    if (file.size > maxSize) {
      alert("File phải nhỏ hơn 1MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const result = reader.result as string;
      // Handle file upload logic here
    };
    reader.readAsDataURL(file);
  };

  const handleEditClick = (): void => {
    // Handle edit click logic here
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    // Handle input change logic here
  };

  const formatDate = (dateString: string): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const handleSave = async (): Promise<void> => {
    // Handle save logic here
  };

  return (
    <div className="user-profile-page">
      <div className="user-profile-menu">
        <ul>
          <li className={activeMenu === "payment" ? "active" : ""} onClick={() => handleMenuClick("payment")}>
            <Link to="payment"><FcCurrencyExchange /> Thanh toán</Link>
          </li>
          <li className={activeMenu === "account-info" ? "active" : ""} onClick={() => handleMenuClick("account-info")}>
            <Link to="account-info"><FcContacts /> Thông tin cá nhân</Link>
          </li>
          <li className={activeMenu === "ticket-history" ? "active" : ""} onClick={() => handleMenuClick("ticket-history")}>
            <Link to="ticket-history"><FcBullish /> Lịch sử mua vé</Link>
          </li>
          <li className={activeMenu === "address" ? "active" : ""} onClick={() => handleMenuClick("address")}>
            <Link to="address"><IoLocation /> Địa chỉ của bạn</Link>
          </li>
          <li className={activeMenu === "reset-password" ? "active" : ""} onClick={() => handleMenuClick("reset-password")}>
            <Link to="reset-password"><FcSynchronize /> Đặt lại mật khẩu</Link>
          </li>
          <li onClick={handleLogout}>
            <FcExport /> Đăng xuất
          </li>
        </ul>
      </div>

      <div className="user-profile-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile; 