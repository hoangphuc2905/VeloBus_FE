import { memo, useEffect, useState, ChangeEvent } from "react";
import "./style.scss";
import axios from "axios";

interface Route {
  from: string;
  to: string;
  busType?: string;
  distance: string;
  duration: string;
  price?: string;
}

const Schedule: React.FC = () => {
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoutes = async (): Promise<void> => {
      try {
        const response = await axios.get<Route[]>("/trip");
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

  const handleSwitch = (): void => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, setter: (value: string) => void): void => {
    setter(e.target.value);
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
          onChange={(e) => handleInputChange(e, setFrom)}
        />
        <button className="switch-button" onClick={handleSwitch}>
          ⇆
        </button>
        <input
          type="text"
          className="search-bar"
          placeholder="Nhập điểm đến"
          value={to}
          onChange={(e) => handleInputChange(e, setTo)}
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