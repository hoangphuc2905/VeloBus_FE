import { memo, useState } from "react";
import "./style.scss";

const TicketSearch = () => {
  const [phone, setPhone] = useState("");
  const [ticketCode, setTicketCode] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8000/invoice/invoiceandphone/${ticketCode}/${phone}`
      );

      if (!response.ok) {
        throw new Error("Không tìm thấy hóa đơn.");
      }

      const data = await response.json();
      setResult(data);
      setError("");
    } catch (err) {
      setResult(null);
      setError(err.message);
    }
  };

  return (
    <div className="ticket-search-container">
      <div className="section-title">
        <h2>Tra Cứu Thông Tin Đặt Vé</h2>
      </div>

      <div className="search-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="phone">Số điện thoại</label>
            <input
              type="text"
              id="phone"
              placeholder="Nhập số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="ticketCode">Mã vé</label>
            <input
              type="text"
              id="ticketCode"
              placeholder="Nhập mã vé"
              value={ticketCode}
              onChange={(e) => setTicketCode(e.target.value)}
            />
          </div>

          <div className="form-group">
            <button type="submit">Tìm kiếm</button>
          </div>
        </form>

        {error && <p className="error">{error}</p>}

        {result && (
          <div className="result">
            <h3>Kết Quả Tìm Kiếm:</h3>
            <p><strong>Mã hóa đơn:</strong> {result.invoiceNumber}</p>
            <p><strong>Số điện thoại:</strong> {result.user}</p>
            <p><strong>Tổng tiền:</strong> {result.totalAmount} VND</p>
            <p><strong>Phương thức thanh toán:</strong> {result.paymentMethod}</p>
            <p><strong>Trạng thái:</strong> {result.status}</p>
            <p><strong>Ghi chú:</strong> {result.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(TicketSearch);
