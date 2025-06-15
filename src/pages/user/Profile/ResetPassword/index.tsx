import React, { useState } from "react";
import axios from "axios";
import "./style.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

interface User {
  phone: string;
  username?: string;
  email?: string;
  dateOfBirth?: string;
  avatar?: string;
  address?: string;
}

const ResetPassword: React.FC = () => {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [errorField, setErrorField] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const currentUser = useSelector((state: RootState) => state.auth.login.currentUser);

  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const validatePassword = (password: string): boolean => {
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!currentUser) {
      setError("Vui lòng đăng nhập để thực hiện chức năng này.");
      return;
    }

    setErrorField("");

    if (newPassword !== confirmPassword) {
      setError("Mật khẩu không khớp. Vui lòng thử lại.");
      setErrorField("confirmPassword");
      setSuccess(false);
      return;
    }

    if (!newPassword) {
      setError("Vui lòng nhập mật khẩu mới.");
      setErrorField("newPassword");
      setSuccess(false);
      return;
    }

    if (!validatePassword(newPassword)) {
      setError("Mật khẩu không đáp ứng yêu cầu bảo mật: ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.");
      setErrorField("newPassword");
      setSuccess(false);
      return;
    }

    try {
      const response = await axios.post(
        "/auth/reset-password",
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      setError("");
      setSuccess(true);
      alert("Mật khẩu đã được đặt lại thành công!");
      console.log(response.data);
    } catch (err: any) {
      alert(err.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại.");
      setSuccess(false);
    }
  };

  const getInputClassName = (field: string): string => {
    return field === errorField ? "password-input-container error" : "password-input-container";
  };

  if (!currentUser) {
    return (
      <div className="reset-password-container">
        <h2>Đặt lại mật khẩu</h2>
        <p>Vui lòng đăng nhập để thực hiện chức năng này.</p>
      </div>
    );
  }

  return (
    <div className="reset-password-container">
      <h2>Đặt lại mật khẩu</h2>
      <p>
        Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác.
      </p>
      <p>(+84) {currentUser.phone}</p>
      <form onSubmit={handleSubmit} className="reset-password-form">
        {/* Mật khẩu cũ */}
        <div className="form-group">
          <label htmlFor="oldPassword">Mật khẩu cũ:</label>
          <div className={getInputClassName("oldPassword")}>
            <input
              type={showOldPassword ? "text" : "password"}
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
            <span
              className="password-toggle-icon"
              onClick={() => setShowOldPassword(!showOldPassword)}
            >
              {showOldPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
        </div>

        {/* Mật khẩu mới */}
        <div className="form-group">
          <label htmlFor="newPassword">Mật khẩu mới:</label>
          <div className={getInputClassName("newPassword")}>
            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <span
              className="password-toggle-icon"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
        </div>

        {/* Xác nhận mật khẩu */}
        <div className="form-group">
          <label htmlFor="confirmPassword">Xác nhận mật khẩu mới:</label>
          <div className={getInputClassName("confirmPassword")}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span
              className="password-toggle-icon"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
        </div>

        {error && <p className="error-message">{error}</p>}
        {success && (
          <p className="success-message">
            Mật khẩu đã được đặt lại thành công!
          </p>
        )}
        <button type="submit" className="btn-submit">
          Đặt lại mật khẩu
        </button>
      </form>
    </div>
  );
};

export default ResetPassword; 