import { memo, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ROUTER } from "utils/router";
import { MdAccountCircle } from "react-icons/md";
import { IoLocation } from "react-icons/io5";

import {
  FcBullish,
  FcContacts,
  FcCurrencyExchange,
  FcExport,
  FcGlobe,
  FcRating,
  FcSynchronize,
} from "react-icons/fc";
import "./style.scss";
import Logo from "assets/user/images/hero/logo1.png";
import { logout } from "../../../../redux/authSlice";

const content = {
  vi: {
    loginText: "Đăng nhập/Đăng ký",
    searchPlaceholder: "Bạn đang tìm gì",
    supportNumber: "0368564833",
    supportText: "Hỗ trợ 24/7",
    menu: [
      { name: "Trang chủ", path: ROUTER.USER.HOME },
      { name: "GIỚI THIỆU", path: ROUTER.USER.INTRODUCE },
      { name: "LỊCH TRÌNH", path: ROUTER.USER.SCHEDULE },
      { name: "TRA CỨU VÉ", path: ROUTER.USER.TICKET_SEARCH },
      { name: "Liên hệ", path: ROUTER.USER.CONTACT },
      { name: "Tin tức", path: ROUTER.USER.NEWS },
      { name: "Hướng dẫn", path: ROUTER.USER.GUIDE },
    ],
  },
  en: {
    loginText: "Login/Register",
    searchPlaceholder: "What are you looking for",
    supportNumber: "0368564833",
    supportText: "24/7 Support",
    menu: [
      { name: "Home", path: ROUTER.USER.HOME },
      { name: "INTRODUCTION", path: ROUTER.USER.INTRODUCE },
      { name: "SCHEDULE", path: ROUTER.USER.SCHEDULE },
      { name: "TICKET INQUIRY", path: ROUTER.USER.TICKET_SEARCH },
      { name: "Contact", path: ROUTER.USER.CONTACT },
      { name: "News", path: ROUTER.USER.NEWS },
      { name: "Guide", path: ROUTER.USER.GUIDE },
    ],
  },
};

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [language, setLanguage] = useState("vi");
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const currentUser = useSelector((state) => state.auth.login.currentUser);

  const currentContent = content[language];

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleUserClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClick = (path) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  return (
    <div className="header-top">
      <div className="container">
        <div className="header-top-inner">
          <div className="header-top-left">
            <div className="language-selector">
              <button
                className="language-button"
                onClick={() => setLanguage(language === "vi" ? "en" : "vi")}
              >
                {language === "vi" ? (
                  <FcRating className="language-icon" />
                ) : (
                  <FcGlobe className="language-icon" />
                )}
                {language === "vi" ? " VI" : " EN"}
              </button>
            </div>

            <div className="logo">
              <Link to={ROUTER.USER.HOME}>
                <img src={Logo} alt="Logo" />
              </Link>
            </div>

            <div className="header-top-right">
              {currentUser ? (
                <div className="user-info">
                  <span onClick={handleUserClick} className="user-name">
                    Chào, {currentUser.username} <MdAccountCircle />
                  </span>

                  {isMenuOpen && (
                    <div className="user-dropdown-menu">
                      <ul>
                        <li onClick={() => handleMenuClick(`${ROUTER.USER.PROFILE}/${ROUTER.USER.PAYMENT}`)}>
                          <FcCurrencyExchange />
                          Thanh toán
                        </li>
                        <li onClick={() => handleMenuClick(`${ROUTER.USER.PROFILE}/${ROUTER.USER.ACCOUNT_INFO}`)}>
                          <FcContacts />
                          Thông tin tài khoản
                        </li>
                        <li onClick={() => handleMenuClick(`${ROUTER.USER.PROFILE}/${ROUTER.USER.TICKET_HISTORY}`)}>
                          <FcBullish />
                          Lịch sử mua vé
                        </li>
                        <li onClick={() => handleMenuClick(`${ROUTER.USER.PROFILE}/${ROUTER.USER.ADDRESS}`)}>
                          <IoLocation />
                          Địa chỉ của bạn
                        </li>
                        <li onClick={() => handleMenuClick(`${ROUTER.USER.PROFILE}/${ROUTER.USER.RESET_PASSWORD}`)}>
                          <FcSynchronize />
                          Đặt lại mật khẩu
                        </li>
                        <li
                          onClick={() => {
                            if (window.confirm("Bạn có chắc chắn muốn đăng xuất?"))
                              
                            dispatch(logout());
                            navigate(ROUTER.USER.LOGIN);
                          }}
                        >
                          <FcExport />
                          Đăng xuất
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <button className="rounded-button">
                  <MdAccountCircle />
                  <Link to={ROUTER.USER.LOGIN}>{currentContent.loginText}</Link>
                </button>
              )}
            </div>
          </div>

          <nav className="header-menu">
            <ul>
              {currentContent.menu.map((menuItem, menuKey) => (
                <li
                  key={menuKey}
                  className={
                    location.pathname.includes(menuItem.path) &&
                    menuItem.path !== ""
                      ? "active"
                      : ""
                  }
                >
                  <Link
                    to={menuItem.path}
                    className={
                      location.pathname.includes(menuItem.path) &&
                      menuItem.path !== ""
                        ? "active"
                        : ""
                    }
                  >
                    {menuItem.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default memo(Header);
