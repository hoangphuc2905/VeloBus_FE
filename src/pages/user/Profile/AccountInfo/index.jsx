import React, { useState } from "react";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo } from "../../../../redux/apiRequest";
import { updateUserInfoSuccess } from "../../../../redux/authSlice";

const AccountInfo = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    dateOfBirth: currentUser?.dateOfBirth || "",
    address: currentUser?.address || "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  if (!currentUser) {
    return <p>Không có thông tin tài khoản</p>;
  }

  const isAgeValid = (dob) => {
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const maxSize = 1 * 1024 * 1024; // 1MB
    if (file.size > maxSize) {
      alert("File phải nhỏ hơn 1MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      setSelectedFile(reader.result);
      await updateUserInfo({ avatar: reader.result }, dispatch);
      dispatch(updateUserInfoSuccess({ avatar: reader.result }));
      alert("Cập nhật thành công ảnh đại diện!");
    };
    reader.onerror = (error) => {
      console.error("Lỗi khi đọc file:", error);
    };
    reader.readAsDataURL(file);
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      setSaveSuccess(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const handleSave = async () => {
    if (!isAgeValid(userInfo.dateOfBirth)) {
      alert("Bạn phải ít nhất 15 tuổi để cập nhật thông tin.");
      return;
    }

    try {
      setIsSaving(true);
      const cleanUserInfo = {
        username: userInfo.username,
        email: userInfo.email,
        dateOfBirth: userInfo.dateOfBirth,
        address: userInfo.address,
      };

      await updateUserInfo(cleanUserInfo, dispatch);
      dispatch(updateUserInfoSuccess(cleanUserInfo));
      setSaveSuccess(true);
      setIsEditing(false);
    } catch (error) {
      console.error("Lỗi khi lưu thông tin:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="account-info-container">
      <div className="content">
        <h2>Thông tin tài khoản</h2>
        <div className="avatar-container">
          <div className="avatar">
            <img
              src={
                selectedFile ||
                currentUser.avatar ||
                "https://picsum.photos/100/100?random=1"
              }
              alt="Avatar"
            />
          </div>
        </div>
        <div className="file-upload">
          <label className="file-upload-label">
            Chọn ảnh
            <input
              type="file"
              accept=".jpeg,.jpg,.png"
              onChange={handleFileChange}
            />
          </label>
          <p>Dung lượng file tối đa 1 MB Định dạng: .JPEG, .PNG</p>
        </div>

        <div className="info-details">
          <div className="info-item">
            <span className="info-label">Họ và tên:</span>
            {isEditing ? (
              <input
                type="text"
                name="username"
                value={userInfo.username}
                onChange={handleChange}
              />
            ) : (
              <span className="info-value">{currentUser.username}</span>
            )}
          </div>
          <div className="info-item">
            <span className="info-label">Số điện thoại:</span>
            <span className="info-value">{currentUser.phone}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Email:</span>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
              />
            ) : (
              <span className="info-value">{currentUser.email}</span>
            )}
          </div>
          <div className="info-item">
            <span className="info-label">Ngày sinh:</span>
            {isEditing ? (
              <input
                type="date"
                name="dateOfBirth"
                value={formatDate(userInfo.dateOfBirth)}
                onChange={handleChange}
              />
            ) : (
              <span className="info-value">
                {formatDate(currentUser.dateOfBirth)}
              </span>
            )}
          </div>
          <div className="info-item">
            <span className="info-label">Địa chỉ:</span>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={userInfo.address}
                onChange={handleChange}
              />
            ) : (
              <span className="info-value">{currentUser.address}</span>
            )}
          </div>
          <button
            className="btn-update"
            onClick={isEditing ? handleSave : handleEditClick}
          >
            {isEditing
              ? isSaving
                ? "Đang lưu..."
                : "Lưu thông tin"
              : "Cập nhật thông tin"}
          </button>
          {saveSuccess && !isEditing && (
            <p className="update-success">Cập nhật thành công!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
