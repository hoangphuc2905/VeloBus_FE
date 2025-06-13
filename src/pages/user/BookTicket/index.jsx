import React, { useState, useEffect } from "react";
import { MdEventSeat } from "react-icons/md";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./style.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const BookTicket = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isTermsDialogOpen, setIsTermsDialogOpen] = useState(false);
  const currentUser = useSelector((state) => state.auth.login.currentUser);

  const [customerInfo, setCustomerInfo] = useState({
    username: currentUser?.username || "",
    phone: currentUser?.phone || "",
    email: currentUser?.email || "",
  });

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/trip/${tripId}`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setTrip(data);
      } catch (error) {
        console.error("Failed to fetch trip:", error);
      }
    };
    fetchTripDetails();
  }, [tripId]);

  useEffect(() => {
    setTotalPrice(selectedSeats.length * (trip?.price || 0));
  }, [selectedSeats, trip]);

  const handleSeatClick = (seat) => {
    if (seat.status === "sold") {
      alert("Ghế này đã được bán.");
      return;
    }
    setSelectedSeats((prevSeats) =>
      prevSeats.includes(seat.id)
        ? prevSeats.filter((s) => s !== seat.id)
        : [...prevSeats, seat.id]
    );
  };

  const handleOpenDialog = () => setIsTermsDialogOpen(true);
  const handleCloseTermsDialog = () => setIsTermsDialogOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const generateInvoicePDF = () => {
    const doc = new jsPDF();
    doc.setFont("Bahnschrift", "normal");
    doc.text("HÓA ĐƠN THANH TOÁN", 20, 20);
    doc.text(`Khách hàng: ${customerInfo.username}`, 20, 30);
    doc.text(`Số điện thoại: ${customerInfo.phone}`, 20, 40);
    doc.text(`Email: ${customerInfo.email}`, 20, 50);
    doc.text(`Tuyến xe: ${trip.from} - ${trip.to}`, 20, 60);
    doc.text(
      `Thời gian: ${new Date(trip.formTime).toLocaleString("vi-VN")}`,
      20,
      70
    );
    doc.text(`Số ghế: ${selectedSeats.join(", ")}`, 20, 80);
    doc.text(`Tổng tiền: ${totalPrice.toLocaleString("vi-VN")}đ`, 20, 90);

    doc.autoTable({
      startY: 100,
      head: [["STT", "Ghế", "Đơn giá", "Thành tiền"]],
      body: selectedSeats.map((seatId, index) => [
        index + 1,
        seatId,
        `${trip.price.toLocaleString("vi-VN")}đ`,
        `${trip.price.toLocaleString("vi-VN")}đ`,
      ]),
    });

    doc.text(
      `Cảm ơn quý khách đã sử dụng dịch vụ của chúng tôi!`,
      20,
      doc.lastAutoTable.finalY + 20
    );

    const pdfBlob = doc.output("blob");
    const url = URL.createObjectURL(pdfBlob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "hoa_don_thanh_toan.pdf";
    link.click();

    URL.revokeObjectURL(url);
  };

  const handlePayment = async () => {
    if (selectedSeats.length === 0) {
      alert("Vui lòng chọn ít nhất một ghế.");
      return;
    }

    try {
      const paymentData = {
        user: customerInfo.phone,
        trip: tripId,
        totalAmount: totalPrice,
        status: "PENDING",
        paymentMethod: "CASH",
        notes: "Thank you for your purchase!",
        invoiceDetails: [
          {
            trip: tripId,
            quantity: selectedSeats.length,
            unitPrice: totalPrice / selectedSeats.length,
            totalPrice: totalPrice,
          },
        ],
      };

      const response = await fetch("http://localhost:8000/invoice/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) throw new Error("Thanh toán thất bại");

      const updateSeatPromises = selectedSeats.map((seatId) =>
        fetch(`http://localhost:8000/trip/updateSeatStatus/${tripId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ seatId, status: "sold" }),
        })
      );

      await Promise.all(updateSeatPromises);

      alert("Thanh toán thành công!");
      generateInvoicePDF();
      navigate(-1);
    } catch (error) {
      console.error("Lỗi thanh toán:", error);
      alert(`Thanh toán thất bại: ${error.message}`);
    }
  };

  const handleCancelPayment = () => navigate(-1);

  if (!trip) {
    return <div>Không có thông tin chuyến đi.</div>;
  }

  return (
    <div className="book-ticket-page">
      <div className="main-content">
        <div className="left-column">
          <section className="seat-selection">
            <h2>Chọn ghế</h2>
            <div className="seat-info">
              <div className="seat-section">
                <h4>Tầng dưới</h4>
                <div className="seats">
                  {trip.seats.tangDuoi.map((seat) => (
                    <div
                      key={seat.id}
                      className={`seat ${seat.status} ${
                        selectedSeats.includes(seat.id) ? "selected" : ""
                      }`}
                      onClick={() => handleSeatClick(seat)}
                    >
                      <MdEventSeat className="seat-icon" />
                      {seat.id}
                    </div>
                  ))}
                </div>
              </div>
              <div className="seat-section">
                <h4>Tầng trên</h4>
                <div className="seats">
                  {trip.seats.tangTren.map((seat) => (
                    <div
                      key={seat.id}
                      className={`seat ${seat.status} ${
                        selectedSeats.includes(seat.id) ? "selected" : ""
                      }`}
                      onClick={() => handleSeatClick(seat)}
                    >
                      <MdEventSeat className="seat-icon" />
                      {seat.id}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="seat-legend">
              <div className="seat-status sold">Đã bán</div>
              <div className="seat-status available">Còn trống</div>
              <div className="seat-status selected">Đang chọn</div>
            </div>
          </section>
        </div>

        <div className="right-column">
          <section className="trip-info">
            <h2>Thông tin chuyến đi</h2>
            <p>
              Tuyến xe: {trip.from} - {trip.to}
            </p>
            <p>
              Thời gian xuất bến:{" "}
              {new Date(trip.formTime).toLocaleString("vi-VN")}
            </p>
            <p>Số lượng ghế: {selectedSeats.length} Ghế</p>
            <p>Số ghế: {selectedSeats.join(", ")}</p>
            <p>Điểm trả khách: {trip.to}</p>
            <p>Tổng tiền: {totalPrice.toLocaleString("vi-VN")}đ</p>
          </section>
          <section className="price-details">
            <h2>Chi tiết giá</h2>
            <p>Giá vé: {trip.price.toLocaleString("vi-VN")}đ</p>
            <p>Phí thanh toán: 0đ</p>
            <p>Tổng tiền: {totalPrice.toLocaleString("vi-VN")}đ</p>
          </section>
        </div>
      </div>

      <div className="bottom-content">
        <div className="top-bottom-content">
          <div className="left-bottom-column">
            <section className="customer-info">
              <h2>Thông tin khách hàng</h2>
              <form>
                <label>
                  Họ và tên
                  <input
                    type="text"
                    name="username"
                    value={customerInfo.username}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Số điện thoại
                  <input
                    type="text"
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Email
                  <input
                    type="email"
                    name="email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    required
                  />
                </label>

                <div className="checkbox-container">
                  <input type="checkbox" id="agreeTerms" required />
                  <label htmlFor="agreeTerms">
                    Tôi đồng ý với{" "}
                    <button
                      type="button"
                      className="link-button"
                      onClick={handleOpenDialog}
                    >
                      điều khoản
                    </button>{" "}
                    của chúng tôi
                  </label>
                </div>
              </form>
            </section>
          </div>

          <div className="right-bottom-column">
            <section className="terms">
              <h2>Điều khoản</h2>
              <p>
                Khi đặt vé, quý khách đồng ý với các điều khoản của chúng tôi.
                Vui lòng kiểm tra thông tin trước khi xác nhận.
              </p>
            </section>
          </div>
        </div>

        <section className="pickup-info">
          <h2>Thông tin đón trả</h2>
          <div className="pickup-dropoff-container">
            <div className="pickup-point">
              <h3>Điểm đón</h3>
              <select>
                <option value="ben-xe-mien-tay">Bến xe Miền Tây</option>
                <option value="ben-xe-an-suong">Bến xe An Sương</option>
                <option value="ben-xe-mien-dong">Bến xe Miền Đông</option>
              </select>
              <p>Trước 21:45 29/08/2024</p>
            </div>
            <div className="drop-off-point">
              <h3>Điểm trả</h3>
              <select>
                <option value="ben-xe-mien-tay">Bến xe Miền Tây</option>
                <option value="ben-xe-an-suong">Bến xe An Sương</option>
                <option value="ben-xe-mien-dong">Bến xe Miền Đông</option>
              </select>
              <p>Trước 21:45 29/08/2024</p>
            </div>
          </div>
        </section>

        <section className="payment">
          <div className="payment-content">
            <div className="total-amount">
              <h3>Tổng số tiền thanh toán:</h3>
              <p>{totalPrice.toLocaleString("vi-VN")}đ</p>
            </div>
            <div className="payment-buttons">
              <button className="cancel-button" onClick={handleCancelPayment}>
                Hủy
              </button>
              <button className="pay-button" onClick={handlePayment}>
                Thanh toán
              </button>
            </div>
          </div>
        </section>

        {isTermsDialogOpen && (
          <div className="dialog-overlay">
            <div className="dialog">
              <h2>Điều khoản và điều kiện</h2>
              <p>
                Các điều khoản và điều kiện khi đặt vé. Vui lòng đọc kỹ trước
                khi tiếp tục.
              </p>
              <button onClick={handleCloseTermsDialog}>Đóng</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookTicket;
