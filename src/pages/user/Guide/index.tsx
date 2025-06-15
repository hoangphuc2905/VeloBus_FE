import { memo, useEffect } from "react";
import "./style.scss";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaSearch, FaTicketAlt, FaCreditCard, FaCheckCircle, FaBus, FaUser } from "react-icons/fa";

const Guide = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 150,
    });
  }, []);

  const steps = [
    {
      icon: <FaSearch />,
      title: "Tìm kiếm chuyến xe",
      description: "Nhập điểm đi, điểm đến và ngày khởi hành để tìm kiếm các chuyến xe phù hợp với lịch trình của bạn."
    },
    {
      icon: <FaTicketAlt />,
      title: "Chọn chuyến xe",
      description: "Xem thông tin chi tiết về các chuyến xe, bao gồm thời gian khởi hành, giá vé và các tiện ích."
    },
    {
      icon: <FaUser />,
      title: "Đăng nhập/Đăng ký",
      description: "Đăng nhập vào tài khoản của bạn hoặc đăng ký tài khoản mới để tiếp tục quá trình đặt vé."
    },
    {
      icon: <FaCreditCard />,
      title: "Thanh toán",
      description: "Chọn phương thức thanh toán phù hợp và hoàn tất việc thanh toán để xác nhận đặt vé."
    },
    {
      icon: <FaCheckCircle />,
      title: "Xác nhận đặt vé",
      description: "Nhận email xác nhận và mã vé điện tử. Bạn có thể xem thông tin vé trong tài khoản của mình."
    },
    {
      icon: <FaBus />,
      title: "Lên xe",
      description: "Đến điểm đón xe đúng giờ, xuất trình mã vé điện tử và thông tin cá nhân để lên xe."
    }
  ];

  return (
    <div className="guide-container">
      <div className="guide-header" data-aos="fade-down" data-aos-duration="1000">
        <h2>HƯỚNG DẪN ĐẶT VÉ</h2>
        <p>Quy trình đặt vé trực tuyến đơn giản và nhanh chóng</p>
      </div>

      <div className="guide-steps">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className="step-card"
            data-aos="flip-up"
            data-aos-delay={index * 150}
          >
            <div className="step-number">{index + 1}</div>
            <div className="step-icon">{step.icon}</div>
            <div className="step-content">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="guide-tips" data-aos="fade-up" data-aos-duration="1000">
        <h3>Lưu ý quan trọng</h3>
        <ul>
          <li>Vui lòng đến điểm đón xe trước giờ khởi hành ít nhất 30 phút</li>
          <li>Mang theo giấy tờ tùy thân hợp lệ khi lên xe</li>
          <li>Kiểm tra kỹ thông tin vé trước khi thanh toán</li>
          <li>Liên hệ hotline nếu cần hỗ trợ: 0368 564 833</li>
        </ul>
      </div>
    </div>
  );
};

export default memo(Guide); 