import { memo, useState, useRef, ChangeEvent, FormEvent, KeyboardEvent } from "react";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../../redux/apiRequest";
import { RootState } from "../../redux/store";

const BannerLogin = require("assets/user/images/hero/banner_login.png");

interface AuthState {
  login: {
    currentUser: any;
    isFetching: boolean;
    error: boolean;
  };
  register: {
    isFetching: boolean;
    error: boolean;
    success: boolean;
  };
  updateUserInfo: {
    isFetching: boolean;
    error: boolean;
    success: boolean;
  };
}

interface User {
  username?: string;
  phone: string;
  password: string;
  email?: string;
  dateOfBirth?: string;
  avatar?: string;
  address?: string;
}

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [showOTP, setShowOTP] = useState<boolean>(false);
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false);
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state: RootState) => state.auth.login.isFetching);
  const error = useSelector((state: RootState) => state.auth.login.error);

  // Helper function to check if the user is at least 15 years old
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

  // Đăng nhập
  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser: User = {
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
  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isAgeValid(dateOfBirth)) {
      alert("Bạn phải ít nhất 15 tuổi để đăng ký.");
      return;
    }

    const newUser: User = {
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

  const otpInputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleToggleForm = (): void => {
    setIsRegistering(!isRegistering);
    setIsForgotPassword(false);
    setIsOtpSent(false);
  };

  const handleForgotPassword = (): void => {
    setIsForgotPassword(true);
    setIsRegistering(false);
    setIsOtpSent(false);
  };

  const togglePasswordVisibility = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  const handleOtpChange = (e: ChangeEvent<HTMLInputElement>, index: number): void => {
    const { value } = e.target;
    if (/^\d$/.test(value)) {
      if (otpInputs.current[index]) {
        otpInputs.current[index]!.value = value;
        if (index < otpInputs.current.length - 1) {
          otpInputs.current[index + 1]?.focus();
        }
      }
    } else if (value === "") {
      if (index > 0) {
        otpInputs.current[index - 1]?.focus();
      }
    }
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
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
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
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
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                    required
                  />
                  <label htmlFor="phone">Số điện thoại:</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                    required
                  />
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    required
                  />
                  <label htmlFor="dateOfBirth">Ngày sinh:</label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={dateOfBirth}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setDateOfBirth(e.target.value)}
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
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
                  />
                  <label htmlFor="password">Mật khẩu:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
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
                        maxLength={1}
                        required
                        className="otp-input"
                        ref={(el) => (otpInputs.current[index] = el)}
                        onChange={(e) => handleOtpChange(e, index)}
                        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                          if (e.key === "Backspace" && e.currentTarget.value === "") {
                            if (index > 0) {
                              otpInputs.current[index - 1]?.focus();
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
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                required
              />
              <label htmlFor="password">Mật khẩu:</label>
              <div className="password-container">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
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