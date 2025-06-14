import React from "react";
import AdminLayout from "../AdminLayout";
import { Link } from "react-router-dom";
import { FaBus, FaUsers, FaChartBar } from "react-icons/fa";
import { ROUTER } from "utils/router";
import './style.scss'; 

const HomePageAdmin: React.FC = () => {
  return (
    <AdminLayout>
      <div className="homepage-admin">
        <h1 className="title">Chào Mừng Đến Với Trang Quản Trị</h1>
        <div className="admin-dashboard">
          <div className="dashboard-item">
            <FaBus className="dashboard-icon" />
            <h2>Chuyến Đi</h2>
            <p>Quản lý các chuyến đi của bạn.</p>
            <Link to={ROUTER.ADMIN.ADDTRIP} className="link-button">
              Thêm Chuyến Đi
            </Link>
          </div>
          <div className="dashboard-item">
            <FaUsers className="dashboard-icon" />
            <h2>Chuyến đi</h2>
            <p>Quản lý chuyến đi của bạn.</p>
            <Link to="/admin/manage-trips" className="link-button">
              Quản Lý Chuyến Đi
            </Link>
          </div>
          <div className="dashboard-item">
            <FaUsers className="dashboard-icon" />
            <h2>Người Dùng</h2>
            <p>Quản lý người dùng của bạn.</p>
            <Link to="/admin/manage-users" className="link-button">
              Quản Lý Người Dùng
            </Link>
          </div>
          <div className="dashboard-item">
            <FaChartBar className="dashboard-icon" />
            <h2>Thống Kê</h2>
            <p>Xem thống kê về chuyến đi và người dùng.</p>
            <Link to="/admin/statistics" className="link-button">
              Xem Thống Kê
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default HomePageAdmin; 