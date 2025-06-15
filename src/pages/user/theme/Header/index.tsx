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
import { logout } from "../../../../redux/authSlice";
import { RootState } from "../../../../redux/store";

const Logo = require("assets/user/images/hero/logo1.png");

interface MenuItem {
  name: string;
  path: string;
}

interface Content {
  loginText: string;
  searchPlaceholder: string;
  supportNumber: string;
  supportText: string;
  menu: MenuItem[];
}

interface AllContent {
  vi: Content;
  en: Content;
}

const content: AllContent = {
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
      { name: "Guide", path: ROUTER.USER.GUIDE },
    ],
  },
};

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [language, setLanguage] = useState<"vi" | "en">("vi");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const currentUser = useSelector((state: RootState) => state.auth.login.currentUser);
  const currentContent = content[language];

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleUserClick = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClick = (path: string): void => {
    const absolutePath = path === ROUTER.USER.HOME ? "/" : `/${path}`;
    setIsMenuOpen(false);
    navigate(absolutePath);
  };

  const isActivePath = (path: string): boolean => {
    if (path === ROUTER.USER.HOME) {
      return location.pathname === "/" || location.pathname === `/${ROUTER.USER.HOME}`;
    }
    return location.pathname.startsWith(`/${path}`);
  };

  return (
    <div className="header-top">
      <div className="header-top-bar-wrapper">
        <div className="container">
          <div className="header-top-bar-inner">
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
                <Link to={ROUTER.USER.HOME === "home" ? "/" : `/${ROUTER.USER.HOME}`}>
                  <img src={Logo} alt="Logo" />
                </Link>
              </div>
            </div>

            <div className="header-top-center">
              <div className="support-info">
                <span className="support-text">{currentContent.supportText}</span>
              </div>
            </div>

            <div className="header-top-right">
              <div className="user-actions">
                {currentUser ? (
                  <div className="user-menu">
                    <button className="user-button" onClick={handleUserClick}>
                      <MdAccountCircle />
                      {currentUser.username}
                    </button>
                    {isMenuOpen && (
                      <div className="user-dropdown">
                        <ul>
                          <li onClick={() => handleMenuClick(ROUTER.USER.PROFILE)}>
                            <FcContacts />
                            Thông tin cá nhân
                          </li>
                          <li onClick={() => handleMenuClick(ROUTER.USER.TICKET_HISTORY)}>
                            <FcBullish />
                            Lịch sử mua vé
                          </li>
                          <li onClick={() => handleMenuClick(ROUTER.USER.PAYMENT)}>
                            <FcCurrencyExchange />
                            Thanh toán
                          </li>
                          <li onClick={() => handleMenuClick(ROUTER.USER.ADDRESS)}>
                            <IoLocation />
                            Địa chỉ
                          </li>
                          <li onClick={() => handleMenuClick(ROUTER.USER.RESET_PASSWORD)}>
                            <FcSynchronize />
                            Đổi mật khẩu
                          </li>
                          <li onClick={() => dispatch(logout())}>
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
                    <Link to={`/${ROUTER.USER.LOGIN}`}>
                      {currentContent.loginText}
                    </Link>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav className="header-menu">
        <div className="container">
          <ul>
            {currentContent.menu.map((menuItem, menuKey) => (
              <li
                key={menuKey}
                className={isActivePath(menuItem.path) ? "active" : ""}
              >
                <Link
                  to={menuItem.path === ROUTER.USER.HOME ? "/" : `/${menuItem.path}`}
                  className={isActivePath(menuItem.path) ? "active" : ""}
                >
                  {menuItem.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default memo(Header);
