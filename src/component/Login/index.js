import { memo, useState, useRef } from "react";
import "./style.scss";
import BannerLogin from "assets/user/images/hero/banner_login.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../../redux/apiRequest";

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [avatar, setAvatar] = useState("");
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);

  // Helper function to check if the user is at least 15 years old
  const isAgeValid = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Adjust age if the birth month and day haven't occurred yet this year
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      return age - 1 >= 15;
    }

    return age >= 15;
  };

  // Đăng nhập
  const handleLogin = (e) => {
    e.preventDefault();
    const newUser = {
      phone: phone,
      password: password,
    };
    console.log("newUser", newUser);

    const adminPhone = "admin";
    if (phone === adminPhone) {
      navigate("/admin");
    } else {
      loginUser(newUser, dispatch, navigate);
    }
  };

  // Đăng ký
  const handleRegister = (e) => {
    e.preventDefault();

    if (!isAgeValid(dateOfBirth)) {
      alert("Bạn phải ít nhất 15 tuổi để đăng ký.");
      return;
    }

    const newUser = {
      username: username,
      phone: phone,
      password: password,
      email: email,
      dateOfBirth: dateOfBirth,
      avatar: avatar, 
      address: address,
    };
    registerUser(newUser, dispatch, navigate);
    navigate("/login");
  };

  const otpInputs = useRef([]);

  const handleToggleForm = () => {
    setIsRegistering(!isRegistering);
    setIsForgotPassword(false);
    setIsOtpSent(false);
  };

  const handleForgotPassword = () => {
    setIsForgotPassword(true);
    setIsRegistering(false);
    setIsOtpSent(false);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleOtpChange = (e, index) => {
    const { value } = e.target;
    if (/^\d$/.test(value)) {
      otpInputs.current[index].value = value;
      if (index < otpInputs.current.length - 1) {
        otpInputs.current[index + 1].focus();
      }
    } else if (value === "") {
      if (index > 0) {
        otpInputs.current[index - 1].focus();
      }
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="login-container">
      <div className="content">
        <img src={BannerLogin} alt="Example" className="login-image" />
      </div>
      <div className="form">
        {isForgotPassword ? (
          <div>
            <h3>Khôi phục mật khẩu</h3>
            <form>
              <label htmlFor="phone">Số điện thoại:</label>
              <input
                type="text"
                id="phone"
                name="phone"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <button type="submit">Gửi liên kết khôi phục</button>
            </form>
            <button
              className="toggle-button"
              onClick={() => setIsForgotPassword(false)}
            >
              Quay lại
            </button>
          </div>
        ) : isRegistering ? (
          <div>
            <h3>Đăng ký tài khoản</h3>
            {!isOtpSent ? (
              <div>
                <form onSubmit={handleRegister}>
                  <label htmlFor="username">Họ và tên:</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <label htmlFor="phone">Số điện thoại:</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label htmlFor="dateOfBirth">Ngày sinh:</label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    required
                  />
                  <label htmlFor="avatar">Avatar:</label>
                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                  {avatar && (
                    <img
                      src={avatar}
                      alt="Avatar Preview"
                      className="avatar-preview"
                    />
                  )}
                  <label htmlFor="address">Địa chỉ:</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <label htmlFor="password">Mật khẩu:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button type="submit">Đăng ký</button>
                </form>
                <button className="toggle-button" onClick={handleToggleForm}>
                  Đã có tài khoản? Đăng nhập
                </button>
              </div>
            ) : (
              <div>
                <h3>Xác nhận mã OTP</h3>
                <form>
                  <div className="otp-container">
                    {[...Array(6)].map((_, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength="1"
                        required
                        className="otp-input"
                        ref={(el) => (otpInputs.current[index] = el)}
                        onChange={(e) => handleOtpChange(e, index)}
                        onKeyDown={(e) => {
                          if (e.key === "Backspace" && e.target.value === "") {
                            if (index > 0) {
                              otpInputs.current[index - 1].focus();
                            }
                          }
                        }}
                      />
                    ))}
                  </div>
                  <button type="submit">Xác nhận OTP</button>
                </form>
                <button className="toggle-button" onClick={handleToggleForm}>
                  Đã có tài khoản? Đăng nhập
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>
            {isLoading && <p>Loading...</p>}

            <h3>Đăng nhập vào tài khoản</h3>
            <form onSubmit={handleLogin}>
              <label htmlFor="phone">Số điện thoại:</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <label htmlFor="password">Mật khẩu:</label>
              <div className="password-container">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? "Ẩn" : "Hiện"}
                </button>
              </div>
              {error && (
                <p style={{ color: "red" }}>Sai thông tin đăng nhập!</p>
              )}
              <button type="submit">Đăng nhập</button>
            </form>
            <button className="toggle-button" onClick={handleToggleForm}>
              Chưa có tài khoản? Đăng ký
            </button>
            <button className="forgot-password" onClick={handleForgotPassword}>
              Quên mật khẩu?
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Login);
