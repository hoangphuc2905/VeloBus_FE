import { memo, FormEvent, useEffect, useState } from "react";
import "./style.scss";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaBuilding, FaPaperPlane } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Handle form submission logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      alert('Cảm ơn bạn đã liên hệ với chúng tôi!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="contact-container">
      <div className="contact-header" data-aos="fade-down">
        <h2>LIÊN HỆ VỚI CHÚNG TÔI</h2>
        <p>Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn</p>
      </div>

      <div className="contact-content">
        <div className="contact-info" data-aos="fade-right">
          <div className="info-card">
            <FaBuilding className="icon" />
            <h3>CÔNG TY CỔ PHẦN XE KHÁCH VELOBUS</h3>
            <p>Địa chỉ: 260 Lê Đức Thọ, phường 6, Gò Vấp, Thành phố Hồ Chí Minh</p>
          </div>

          <div className="info-card">
            <FaPhone className="icon" />
            <h3>Điện thoại</h3>
            <p>0368 564 833</p>
          </div>

          <div className="info-card">
            <FaEnvelope className="icon" />
            <h3>Email</h3>
            <p>hoangphuchm11@gmail.com</p>
          </div>

          <div className="info-card">
            <FaMapMarkerAlt className="icon" />
            <h3>Văn phòng</h3>
            <p>Mở cửa: Thứ 2 - Chủ nhật (8:00 - 20:00)</p>
          </div>
        </div>

        <div className="contact-form" data-aos="fade-left">
          <h3>Gửi thông tin liên hệ</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Họ và tên</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Nhập họ và tên của bạn"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Nhập địa chỉ email của bạn"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Số điện thoại</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                placeholder="Nhập số điện thoại của bạn"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Chủ đề</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                placeholder="Nhập chủ đề liên hệ"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Tin nhắn</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                placeholder="Nhập nội dung tin nhắn của bạn"
                rows={5}
              />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="loading-spinner"></span>
              ) : (
                <>
                  <FaPaperPlane className="icon" />
                  Gửi tin nhắn
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default memo(Contact); 