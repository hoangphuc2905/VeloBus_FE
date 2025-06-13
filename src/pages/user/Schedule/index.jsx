import { memo, useEffect, useState } from "react";
import "./style.scss";
import axios from "axios";

const Schedule = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await axios.get("/trip");
        setRoutes(response.data);
      } catch (error) {
        setError("Không thể tải dữ liệu. Vui lòng thử lại sau.");
        console.error("Error fetching routes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoutes();
  }, []);

  const handleSwitch = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const filteredRoutes = routes.filter(
    (route) =>
      route.from.toLowerCase().includes(from.toLowerCase()) &&
      route.to.toLowerCase().includes(to.toLowerCase())
  );

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }



  return (
    <div className="schedule-container">
      <div className="search-section">
        <input
          type="text"
          className="search-bar"
          placeholder="Nhập điểm đi"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <button className="switch-button" onClick={handleSwitch}>
          ⇆
        </button>
        <input
          type="text"
          className="search-bar"
          placeholder="Nhập điểm đến"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
      </div>
      <div className="routes-header">
        <div className="header-item">Tuyến xe</div>
        <div className="header-item">Loại xe</div>
        <div className="header-item">Quãng đường</div>
        <div className="header-item">Thời gian</div>
        <div className="header-item">Giá vé</div>
        <div className="header-item"></div>
      </div>
      <div className="routes-list">
        {filteredRoutes.length > 0 ? (
          filteredRoutes.map((route, index) => (
            <div className="route" key={index}>
              <div className="route-info">
                <div className="route-detail">
                  <span className="location">{route.from}</span>
                  <span className="arrow">→</span>
                  <span className="location">{route.to}</span>
                </div>
                {route.busType && <div className="type">{route.busType}</div>}
                <div className="distance">{route.distance}</div>
                <div className="time">{route.duration}</div>
                <div className="price">{route.price || "N/A"}</div>
                <div className="book-button">Tìm tuyến xe</div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">Không tìm thấy tuyến xe phù hợp.</div>
        )}
      </div>
    </div>
  );
};

export default memo(Schedule);
