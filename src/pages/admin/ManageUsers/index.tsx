import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import AdminLayout from "../AdminLayout";
import "./style.scss";

interface User {
  _id: string;
  username: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  password?: string;
  avatar?: string;
  address?: string;
  admin: boolean;
}

interface UserData {
  username: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  password?: string;
  avatar?: string;
  address?: string;
  admin: boolean;
}

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData>({
    username: "",
    phone: "",
    email: "",
    dateOfBirth: "",
    password: "",
    avatar: "",
    address: "",
    admin: false,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setUserData({
      ...userData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleEditClick = (user: User) => {
    setEditingUser(user._id);
    setUserData({
      ...user,
      dateOfBirth: new Date(user.dateOfBirth).toISOString().split("T")[0],
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.put(`/user/${editingUser}`, userData);
      setEditingUser(null);
      const response = await axios.get("/user");
      setUsers(response.data);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/user/${id}`);
      const response = await axios.get("/user");
      setUsers(response.data);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <AdminLayout>
      <div className="all-users-container">
        <h2>Danh Sách Người Dùng</h2>
        {users.map((user) => (
          <div key={user._id} className="user-item">
            {editingUser === user._id ? (
              <form className="edit-user-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Tên người dùng:</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={userData.username}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Số điện thoại:</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={userData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="dateOfBirth">Ngày sinh:</label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={userData.dateOfBirth}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Địa chỉ:</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={userData.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="admin">Quản trị viên:</label>
                  <input
                    type="checkbox"
                    id="admin"
                    name="admin"
                    checked={userData.admin}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="submit-button">
                  Lưu Chỉnh Sửa
                </button>
              </form>
            ) : (
              <div className="user-details">
                <p>Tên người dùng: {user.username}</p>
                <p>Số điện thoại: {user.phone}</p>
                <p>Email: {user.email}</p>
                <p>
                  Ngày sinh:{" "}
                  {new Date(user.dateOfBirth).toLocaleDateString("vi-VN")}
                </p>
                <p>Địa chỉ: {user.address}</p>
                <p>Quản trị viên: {user.admin ? "Có" : "Không"}</p>

                <button
                  onClick={() => handleEditClick(user)}
                  className="edit-button"
                >
                  Chỉnh Sửa
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="delete-button"
                >
                  Xoá
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default ManageUsers; 