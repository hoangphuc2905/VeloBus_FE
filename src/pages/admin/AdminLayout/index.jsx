import React from "react";
import { Link } from "react-router-dom";
import { FaBus, FaUsers, FaChartBar } from "react-icons/fa";
import "./style.scss";

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <h2>Menu Quản Trị</h2>
        <ul>
          <li>
            <Link to="/admin">
              <FaBus className="menu-icon" /> Trang Chủ
            </Link>
          </li>
          <li>
            <Link to="/admin/manage-trips">
              <FaBus className="menu-icon" /> Quản Lý Chuyến Đi
            </Link>
          </li>

          <li>
            <Link to="/admin/add-trip">
              <FaBus className="menu-icon" /> Thêm Chuyến Đi
            </Link>
          </li>
          <li>
            <Link to="/admin/manage-users">
              <FaUsers className="menu-icon" /> Người Dùng
            </Link>
          </li>
          <li>
            <Link to="/admin/statistics">
              <FaChartBar className="menu-icon" /> Thống Kê
            </Link>
          </li>
        </ul>
      </aside>
      <main className="admin-content">{children}</main>
    </div>
  );
};

export default AdminLayout;
