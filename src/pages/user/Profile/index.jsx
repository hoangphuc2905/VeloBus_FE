import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FcCurrencyExchange, FcContacts, FcBullish, FcSynchronize, FcExport } from "react-icons/fc";
import { IoLocation } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/authSlice";
import "./style.scss";

const Profile = () => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(() => {
    return location.pathname.split('/').pop() || 'payment';
  });
    const dispatch = useDispatch();

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const handleLogout = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      dispatch(logout());
    }
    else {
      return false;
    }
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
