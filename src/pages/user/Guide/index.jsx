import { memo } from "react";
import "./style.scss";

const Guide = () => {
  return (
    <div className="guide-container">
      <div className="guide-header">
        <h1>Hướng dẫn sử dụng</h1>
        <p>Hãy làm theo các bước dưới đây để sử dụng dịch vụ một cách dễ dàng.</p>
      </div>
      <div className="guide-steps">
        <div className="step">
          <span className="step-number">1</span>
          <div className="step-content">
            <h3>Đăng ký tài khoản</h3>
            <p>Bạn cần đăng ký một tài khoản để bắt đầu sử dụng dịch vụ của chúng tôi.</p>
          </div>
        </div>
        <div className="step">
          <span className="step-number">2</span>
          <div className="step-content">
            <h3>Xác thực email</h3>
            <p>Kiểm tra email của bạn để hoàn thành xác thực tài khoản.</p>
          </div>
        </div>
        <div className="step">
          <span className="step-number">3</span>
          <div className="step-content">
            <h3>Hoàn tất hồ sơ cá nhân</h3>
            <p>Điền đầy đủ thông tin cá nhân trong hồ sơ để bắt đầu sử dụng dịch vụ.</p>
          </div>
        </div>
        <div className="step">
          <span className="step-number">4</span>
          <div className="step-content">
            <h3>Bắt đầu sử dụng dịch vụ</h3>
            <p>Giờ đây, bạn đã sẵn sàng để trải nghiệm tất cả các tính năng tuyệt vời của chúng tôi.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Guide);
