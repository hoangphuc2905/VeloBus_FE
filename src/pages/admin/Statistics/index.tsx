import React, { useEffect, useState, ChangeEvent } from "react";
import { Bar, Pie } from "react-chartjs-2";
import axios from "axios";
import AdminLayout from "../AdminLayout";
import "./style.scss";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  Tooltip,
  Legend
);

interface RevenueItem {
  _id: number | string;
  revenue: number;
}

interface TicketItem {
  _id: number | string;
  ticketsSold: number;
}

const Statistics: React.FC = () => {
  const [revenueData, setRevenueData] = useState<RevenueItem[]>([]);
  const [ticketData, setTicketData] = useState<TicketItem[]>([]);
  const [monthlyTicketData, setMonthlyTicketData] = useState<TicketItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const revenueResponse = await axios.get("/statistics/revenue");
        const ticketResponse = await axios.get("/statistics/tickets");
        const monthlyTicketResponse = await axios.get(
          "/statistics/tickets/month"
        );

        setRevenueData(revenueResponse.data);
        setTicketData(ticketResponse.data);
        setMonthlyTicketData(monthlyTicketResponse.data);

        console.log("Dữ liệu thống kê doanh thu:", revenueResponse.data);
        console.log("Dữ liệu thống kê vé bán:", ticketResponse.data);
        console.log(
          "Dữ liệu thống kê vé bán theo tháng:",
          monthlyTicketResponse.data
        );
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu thống kê:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleMonthChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value);
  };

  const filteredRevenueData = revenueData.filter(
    (item) => !selectedMonth || item._id.toString() === selectedMonth.toString()
  );

  const filteredTicketData = ticketData.filter(
    (item) => !selectedMonth || item._id.toString() === selectedMonth.toString()
  );

  const filteredMonthlyTicketData = monthlyTicketData.filter(
    (item) => !selectedMonth || item._id.toString() === selectedMonth.toString()
  );

  const revenueChart = {
    labels: filteredRevenueData.map((item) => `Tháng ${item._id}`),
    datasets: [
      {
        label: "Doanh thu (VND)",
        data: filteredRevenueData.map((item) => item.revenue),
        backgroundColor: "#4caf50",
        borderWidth: 1,
      },
    ],
  };

  const ticketChart = {
    labels: filteredTicketData.map((item) => item._id),
    datasets: [
      {
        label: "Số lượng vé",
        data: filteredTicketData.map((item) => item.ticketsSold),
        backgroundColor: ticketData.map((_, index) => {
          const colors = [
            "#ff6384",
            "#36a2eb",
            "#ffce56",
            "#4caf50",
            "#ff5733",
            "#9b59b6",
            "#f39c12",
          ];
          return colors[index % colors.length];
        }),
        borderWidth: 1,
      },
    ],
  };

  const monthlyTicketChart = {
    labels: filteredMonthlyTicketData.map((item) => `Tháng ${item._id}`),
    datasets: [
      {
        label: "Vé bán theo tháng",
        data: filteredMonthlyTicketData.map((item) => item.ticketsSold),
        fill: false,
        backgroundColor: "#2196f3",
        tension: 0.1,
      },
    ],
  };

  return (
    <AdminLayout>
      <div className="statistics-container">
        <h2>Thống Kê Doanh Thu và Vé Bán</h2>
        {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : (
          <div className="filter-container">
            <label htmlFor="month">Chọn tháng: </label>
            <select
              id="month"
              value={selectedMonth}
              onChange={handleMonthChange}
            >
              <option value="">Tất cả</option>
              {revenueData.map((item) => (
                <option key={item._id} value={item._id}>
                  Tháng {item._id}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="chart-container">
          <div className="bar-chart">
            <h3>Doanh Thu Theo Tháng</h3>
            {filteredRevenueData.length > 0 ? (
              <Bar data={revenueChart} />
            ) : (
              <p>Không có dữ liệu doanh thu.</p>
            )}
          </div>

          <div className="line-chart">
            <h3>Vé Bán Theo Tháng</h3>
            {filteredMonthlyTicketData.length > 0 ? (
              <Bar data={monthlyTicketChart} />
            ) : (
              <p>Không có dữ liệu vé bán theo tháng.</p>
            )}
          </div>

          <div className="pie-chart">
            <h3>Số Lượng Vé Bán Theo Tuyến</h3>
            {filteredTicketData.length > 0 ? (
              <Pie data={ticketChart} />
            ) : (
              <p>Không có dữ liệu vé bán.</p>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Statistics; 