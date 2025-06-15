import { memo, useState, FormEvent, ChangeEvent, useEffect } from "react";
import "./style.scss";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaSearch, FaTicketAlt, FaUser, FaMoneyBillWave, FaCreditCard, FaInfoCircle } from "react-icons/fa";

interface TicketResult {
  invoiceNumber: string;
  user: string;
  totalAmount: number;
  paymentMethod: string;
  status: string;
  notes: string;
}

const TicketSearch: React.FC = () => {
  const [phone, setPhone] = useState<string>("");
  const [ticketCode, setTicketCode] = useState<string>("");
  const [result, setResult] = useState<TicketResult | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(
        `http://localhost:8000/invoice/invoiceandphone/${ticketCode}/${phone}`
      );

      if (!response.ok) {
        throw new Error("Không tìm thấy hóa đơn.");
      }

      const data: TicketResult = await response.json();
      setResult(data);
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, setter: (value: string) => void): void => {
    setter(e.target.value);
  };

  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'completed':
        return '#4CAF50';
      case 'pending':
        return '#FFC107';
      case 'cancelled':
        return '#F44336';
      default:
        return '#2196F3';
    }
  };

  return (
    <div className="ticket-search-container">
      <div className="section-title" data-aos="fade-down">
        <h2>Tra Cứu Thông Tin Đặt Vé</h2>
        <p>Nhập thông tin để tra cứu trạng thái vé của bạn</p>
      </div>

      <div className="search-form" data-aos="fade-up">
        <form onSubmit={handleSubmit}>
          <div className="form-group" data-aos="fade-right" data-aos-delay="100">
            <label htmlFor="phone">
              <FaUser className="icon" />
              Số điện thoại
            </label>
            <input
              type="text"
              id="phone"
              placeholder="Nhập số điện thoại"
              value={phone}
              onChange={(e) => handleInputChange(e, setPhone)}
            />
          </div>

          <div className="form-group" data-aos="fade-right" data-aos-delay="200">
            <label htmlFor="ticketCode">
              <FaTicketAlt className="icon" />
              Mã vé
            </label>
            <input
              type="text"
              id="ticketCode"
              placeholder="Nhập mã vé"
              value={ticketCode}
              onChange={(e) => handleInputChange(e, setTicketCode)}
            />
          </div>

          <div className="form-group" data-aos="fade-up" data-aos-delay="300">
            <button type="submit" disabled={isLoading}>
              {isLoading ? (
                <span className="loading-spinner"></span>
              ) : (
                <>
                  <FaSearch className="icon" />
                  Tìm kiếm
                </>
              )}
            </button>
          </div>
        </form>

        {error && (
          <div className="error-message" data-aos="fade-up">
            <FaInfoCircle className="icon" />
            {error}
          </div>
        )}

        {result && (
          <div className="result" data-aos="fade-up">
            <h3>Kết Quả Tìm Kiếm</h3>
            <div className="result-grid">
              <div className="result-item">
                <FaTicketAlt className="icon" />
                <div className="info">
                  <span className="label">Mã hóa đơn</span>
                  <span className="value">{result.invoiceNumber}</span>
                </div>
              </div>
              <div className="result-item">
                <FaUser className="icon" />
                <div className="info">
                  <span className="label">Số điện thoại</span>
                  <span className="value">{result.user}</span>
                </div>
              </div>
              <div className="result-item">
                <FaMoneyBillWave className="icon" />
                <div className="info">
                  <span className="label">Tổng tiền</span>
                  <span className="value">{result.totalAmount.toLocaleString('vi-VN')} VND</span>
                </div>
              </div>
              <div className="result-item">
                <FaCreditCard className="icon" />
                <div className="info">
                  <span className="label">Phương thức thanh toán</span>
                  <span className="value">{result.paymentMethod}</span>
                </div>
              </div>
              <div className="result-item">
                <FaInfoCircle className="icon" />
                <div className="info">
                  <span className="label">Trạng thái</span>
                  <span className="value" style={{ color: getStatusColor(result.status) }}>
                    {result.status}
                  </span>
                </div>
              </div>
              {result.notes && (
                <div className="result-item full-width">
                  <FaInfoCircle className="icon" />
                  <div className="info">
                    <span className="label">Ghi chú</span>
                    <span className="value">{result.notes}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(TicketSearch); 