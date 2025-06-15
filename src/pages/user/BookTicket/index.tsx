import React, { useState, useEffect, ChangeEvent } from "react";
import { MdEventSeat } from "react-icons/md";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./style.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { FaUser, FaCalendarAlt, FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { MdOutlineAirlineSeatReclineNormal } from "react-icons/md";
import { BsArrowLeftRight } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface Seat {
  id: string;
  status: "available" | "sold" | "selected";
}

interface Trip {
  id: string;
  from: string;
  to: string;
  formTime: string;
  price: number;
  seats: {
    tangDuoi: Seat[];
    tangTren: Seat[];
  };
}

interface CustomerInfo {
  username: string;
  phone: string;
  email: string;
}

interface PaymentData {
  user: string;
  trip: string;
  totalAmount: number;
  status: "PENDING" | "COMPLETED" | "CANCELLED";
  paymentMethod: "CASH" | "CARD" | "BANK_TRANSFER";
  notes: string;
  invoiceDetails: {
    trip: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];
}

const BookTicket = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const navigate = useNavigate();

  const [trip, setTrip] = useState<Trip | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isTermsDialogOpen, setIsTermsDialogOpen] = useState<boolean>(false);
  const currentUser = useSelector((state: RootState) => state.auth.login.currentUser);

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    username: currentUser?.username || "",
    phone: currentUser?.phone || "",
    email: currentUser?.email || "",
  });

  useEffect(() => {
    const fetchTripDetails = async (): Promise<void> => {
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

  const handleSeatClick = (seat: Seat): void => {
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

  const handleOpenDialog = (): void => setIsTermsDialogOpen(true);
  const handleCloseTermsDialog = (): void => setIsTermsDialogOpen(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setCustomerInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const generateInvoicePDF = (): void => {
    if (!trip) return;

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

  const handlePayment = async (): Promise<void> => {
    if (!trip) return;

    if (selectedSeats.length === 0) {
      alert("Vui lòng chọn ít nhất một ghế.");
      return;
    }

    try {
      const paymentData: PaymentData = {
        user: customerInfo.phone,
        trip: tripId!,
        totalAmount: totalPrice,
        status: "PENDING",
        paymentMethod: "CASH",
        notes: "Thank you for your purchase!",
        invoiceDetails: [
          {
            trip: tripId!,
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
      alert(`Thanh toán thất bại: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };

  const handleCancelPayment = (): void => navigate(-1);

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
                    type="tel"
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
              </form>
            </section>
          </div>
        </div>
        <div className="bottom-bottom-content">
          <button className="cancel-button" onClick={handleCancelPayment}>
            Hủy
          </button>
          <button className="payment-button" onClick={handlePayment}>
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookTicket; 