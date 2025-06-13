import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./style.scss";

const TicketHistory = () => {
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const [ticketHistory, setTicketHistory] = useState([]);
  const [tripDetails, setTripDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTicketHistory = async () => {
      if (!currentUser || !currentUser.phone) {
        console.error("User ID is not defined or is empty:", currentUser);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:8000/invoice/user/${currentUser.phone}`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setTicketHistory(data);

        const uniqueTripIds = [
          ...new Set(
            data.flatMap((ticket) =>
              ticket.invoiceDetails.map((detail) => detail.trip)
            )
          ),
        ];

        await fetchTripDetails(uniqueTripIds);
      } catch (error) {
        console.error("Lỗi khi tải lịch sử vé:", error);
      }
    };

    const fetchTripDetails = async (tripIds) => {
      try {
        const tripResponses = await Promise.all(
          tripIds.map((id) =>
            fetch(`http://localhost:8000/trip/${id}`).then((res) => res.json())
          )
        );

        const tripData = tripResponses.reduce((acc, trip) => {
          acc[trip.id] = trip;
          return acc;
        }, {});

        setTripDetails(tripData);
        setIsLoading(false);
      } catch (error) {
        console.error("Lỗi khi tải thông tin tuyến đường:", error);
        setIsLoading(false);
      }
    };

    fetchTicketHistory();
  }, [currentUser]);

  if (isLoading) {
    return <div>Đang tải dữ liệu lịch sử vé...</div>;
  }

  return (
    <div className="ticket-history">
      <h2>Lịch sử Mua Vé</h2>
      <p>Theo dõi và quản lý quá trình mua vé của bạn.</p>

      {ticketHistory.map((ticket) => (
        <div className="invoice-detail" key={ticket._id}>
          <div className="title">Mã hóa đơn: {ticket.invoiceNumber}</div>
          <div className="info">
            <span>Điện thoại: {ticket.user}</span>
            <span>Ngày phát hành: {new Date(ticket.issueDate).toLocaleDateString()}</span>
          </div>
          <table>
            <thead>
              <tr>
                <th>Tuyến đường</th>
                <th>Đơn giá</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
                <th>Thanh toán</th>
              </tr>
            </thead>
            <tbody>
              {ticket.invoiceDetails.map((detail) => (
                <tr key={detail._id}>
                  <td>
                    {tripDetails[detail.trip]
                      ? `${tripDetails[detail.trip].from} - ${tripDetails[detail.trip].to}`
                      : "Chưa có thông tin"}
                  </td>
                  <td>{detail.unitPrice.toLocaleString()} VND</td>
                  <td>{detail.totalPrice.toLocaleString()} VND</td>
                  <td>{ticket.status}</td>
                  <td>{ticket.paymentMethod}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default TicketHistory;
