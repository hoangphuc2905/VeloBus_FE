import { memo } from "react";
import "./style.scss";

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="content">
        <h3>LIÊN HỆ VỚI CHÚNG TÔI</h3>
        <h3>CÔNG TY CỔ PHẦN XE KHÁCH PHÚC AN</h3>
        <p>Địa chỉ: 260 Lê Đức Thọ, phường 6, Gò Vấp, Thành phố Hồ Chí Minh</p>
        <p>Điện thoại: 0368 564 833</p>
        <p>Email: hoangphuchm11@gmail.com</p>
      </div>
      <div className="form">
        <h3>Gửi thông tin liên hệ đến chúng tôi</h3>
        <form>
          <label for="name">Họ và tên:</label>
          <input type="text" id="name" name="name" required />

          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required />

          <label for="phone">Số điện thoại:</label>
          <input type="text" id="phone" name="phone" required />

          <label for="subject">Chủ đề:</label>
          <input type="text" id="subject" name="subject" required />

          <label for="message">Tin nhắn:</label>
          <textarea id="message" name="message" required></textarea>

          <button type="submit">Gửi</button>
        </form>
      </div>
    </div>
  );
};

export default memo(Contact);
