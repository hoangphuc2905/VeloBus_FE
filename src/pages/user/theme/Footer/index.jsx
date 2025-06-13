import { memo } from "react";
import { useEffect } from "react";
import "./style.scss";
import { Link, useLocation } from "react-router-dom";
import { FaSquareFacebook } from "react-icons/fa6";
import { ROUTER } from "utils/router";

const Footer = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
            <div className="footer-about">
              <h1 className="footer-about-logo">PHÚC AN</h1>
              <ul>
                <li>Địa chỉ: 260 Lê Đức Thọ, Quận Gò Vấp, TP.HCM</li>
                <li>Phone: 0368564833 </li>
                <li>Email: hoangphuchm11@gmail.com </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div className="footer-widget">
              <h6>Hãy khám phá</h6>
              <ul>
                <li>
                  <Link to={ROUTER.USER.HOME}>Trang chủ</Link>
                </li>

                <li>
                  <Link to={ROUTER.USER.CONTACT}>Liên hệ</Link>
                </li>

                <li>
                  <Link to={ROUTER.USER.INTRODUCE}>Giới thiệu</Link>
                </li>
                <li>
                  <Link to={ROUTER.USER.NEWS}>Tin tức</Link>
                </li>
              </ul>

              <ul>
                <li>
                  <Link to={ROUTER.USER.SCHEDULE}>Lịch trình</Link>
                </li>
                <li>
                  <Link to={ROUTER.USER.GUIDE }>Hướng dẫn</Link>
                </li>

                <li>
                  <Link to={ROUTER.USER.TICKET_SEARCH}>Tra cứu vé</Link>
                </li>
                <li>
                  <Link to={ROUTER.USER.LOGIN}>Đăng nhập</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12">
            <div className="footer-widget">
              <h6>Khuyến mãi và ưu đãi khác</h6>
              <p>Đăng ký nhận thông tin tại đây</p>
              <form action="#">
                <div className="input-group">
                  <input type="text" placeholder="Nhập email của bạn" />
                  <button type="submit" className="button-submit">
                    Đăng ký
                  </button>
                </div>
                <div className="footer-widget-social">
                  <div>
                    <FaSquareFacebook />
                  </div>
                  <div>
                    <FaSquareFacebook />
                  </div>
                  <div>
                    <FaSquareFacebook />
                  </div>
                  <div>
                    <FaSquareFacebook />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-inner">
            <p>© 2024 | Bản quyền thuộc về Hoàng Phúc</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
