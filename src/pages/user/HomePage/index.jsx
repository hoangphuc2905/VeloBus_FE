import { memo, useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import category from "assets/user/images/categories/khuyenmai1.png";
import category2 from "assets/user/images/categories/khuyenmai2.png";
import category3 from "assets/user/images/categories/khuyenmai3.png";
import category4 from "assets/user/images/categories/khuyenmai4.png";
import category5 from "assets/user/images/categories/khuyenmai5.png";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import { ROUTER } from "utils/router";
import { MdEventSeat, MdMyLocation } from "react-icons/md";
import { GrLocation } from "react-icons/gr";

const HomePage = () => {
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [departureDate, setDepartureDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [returnDate, setReturnDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [filters, setFilters] = useState({
    departureTime: [],
    busType: [],
    seatRow: [],
    floor: [],
  });

  const handleTabChange = () => {
    setIsRoundTrip(!isRoundTrip);
  };

  const handleDepartureDateChange = (event) => {
    setDepartureDate(event.target.value);
    if (event.target.value > returnDate) {
      setReturnDate(event.target.value);
    }
  };

  const handleReturnDateChange = (event) => {
    setReturnDate(event.target.value);
  };

  const handleFilterChange = (category, value) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      if (newFilters[category].includes(value)) {
        newFilters[category] = newFilters[category].filter(
          (item) => item !== value
        );
      } else {
        newFilters[category].push(value);
      }
      return newFilters;
    });
  };

  const deleteAllFilters = () => {
    setFilters({
      departureTime: [],
      busType: [],
      seatRow: [],
      floor: [],
    });
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const sliderItems = [
    { id: 1, image: category },
    { id: 2, image: category2 },
    { id: 3, image: category3 },
    { id: 4, image: category4 },
    { id: 5, image: category5 },
  ];

  const tripInfo = [
    {
      id: 1,
      image: category,
      title: "Đà Lạt",
      price: "290,000 VND",
      content: "305km - 8 giờ",
    },
    {
      id: 2,
      image: category2,
      title: "Nha Trang",
      price: "290,000 VND",
      content: "305km - 8 giờ",
    },
    {
      id: 3,
      image: category3,
      title: "Phan Thiết",
      price: "290,000 VND",
      content: "305km - 8 giờ",
    },
  ];

  const [hasSearched, setHasSearched] = useState(false);
  const [trip, setTrip] = useState({});

  useEffect(() => {
    const fetchTrips = async () => {
      const response = await fetch("http://localhost:8000/trip");
      const data = await response.json();
      setTrip(data);
    };
    fetchTrips();
  }, []);

  const handleSearch = () => {
    setHasSearched(true);

    const fetchTrips = async () => {
      const response = await fetch(
        `http://localhost:8000/trip/fromto/${from}/${to}`
      );
      const data = await response.json();
      setTrip(data);
    };

    fetchTrips();
  };

  const [activeSection, setActiveSection] = useState({});

  const handleButtonClick = (section, index) => {
    setActiveSection((prevSections) => ({
      ...prevSections,
      [index]: section,
    }));
  };
  const navigate = useNavigate();

  const handleBookTicket = (tripId) => {
    navigate(`${ROUTER.USER.BOOK_TICKET}/${tripId}`);
  };


  return (
    <>
      <div className="hero-item"></div>
      <div className="box">
        <div className="box_header">
          <div className="box_header_left col-lg-9">
            <input
              type="radio"
              name="tab"
              id="tab1"
              checked={!isRoundTrip}
              onChange={handleTabChange}
            />
            <label htmlFor="tab1">Một chiều</label>
            <input
              type="radio"
              name="tab"
              id="tab2"
              checked={isRoundTrip}
              onChange={handleTabChange}
            />
            <label htmlFor="tab2">Khứ hồi</label>
          </div>
          <div className="box_header_right col-lg-3">
            <Link to={ROUTER.USER.HOME}>Hướng dẫn mua vé</Link>
          </div>
        </div>
        <div className="box-content">
          <div className="box-content_left">
            <div className="box-content_left_top">
              <div className="box-content_left_top_item">
                <h6>Điểm đi</h6>
                <input
                  type="text"
                  placeholder="Nơi đi"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                />
              </div>
              <div className="box-content_left_top_item">
                <h6>Điểm đến</h6>
                <input
                  type="text"
                  placeholder="Nơi đến"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
              </div>
              <div className="box-content_left_top_item">
                <h6>Ngày đi</h6>
                <input
                  type="date"
                  value={departureDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={handleDepartureDateChange}
                />
              </div>
              {isRoundTrip && (
                <div className="box-content_left_top_item">
                  <h6>Ngày về</h6>
                  <input
                    type="date"
                    value={returnDate}
                    min={departureDate}
                    onChange={handleReturnDateChange}
                  />
                </div>
              )}
              <div className="box-content_left_top_item">
                <h6>Số vé</h6>
                <input type="number" placeholder="Số lượng" min="1" max="5" />
              </div>
            </div>
          </div>
        </div>
        <div className="box-footer">
          <button onClick={handleSearch}>Tìm chuyến xe</button>
        </div>
      </div>

      {!hasSearched ? (
        <>
          <div className="container container_categories_slider">
            <div className="section_title_categories_slider">
              <h2 className="section_title_categories_slider_h2">
                KHUYẾN MÃI NỔI BẬT
              </h2>
            </div>
            <Carousel responsive={responsive} className="categories_slider">
              {sliderItems.map((item, key) => (
                <div className="categories_slider_item" key={key}>
                  <div
                    className="image-container"
                    style={{ backgroundImage: `url(${item.image})` }}
                  ></div>
                </div>
              ))}
            </Carousel>
          </div>

          <div className="container">
            <div className="featured">
              <div className="section_title">
                <h2>TUYẾN PHỔ BIẾN</h2>
                <h4>Được khách hàng tin tưởng và lựa chọn</h4>
              </div>
              <div className="popular-routes">
                <div className="trip-info">
                  {tripInfo.map((trip, key) => (
                    <div className="trip-info-item" key={key}>
                      <div className="trip-info-content">
                        <div
                          className="image-container-trip"
                          style={{ backgroundImage: `url(${trip.image})` }}
                        ></div>
                        <div className="trip-details">
                          {[...Array(3)].map((_, index) => (
                            <div className="trip-detail-item" key={index}>
                              <h5>{trip.title}</h5>
                              <p className="price">{trip.price}</p>
                              <p className="content">{trip.content}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="featured">
              <div className="section_title">
                <h2>CHẤT LƯỢNG LÀ SỨ MỆNH</h2>
                <h4>Được khách hàng tin tưởng và lựa chọn</h4>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="container search-page">
          <div className="search-filters">
            <h3>BỘ LỌC TÌM KIẾM</h3>
            <button onClick={deleteAllFilters}>Bỏ lọc</button>
            <div className="filter-section">
              <h4>Giờ đi</h4>
              <label>
                <input
                  type="checkbox"
                  checked={filters.departureTime.includes("00:00 - 06:00")}
                  onChange={() =>
                    handleFilterChange("departureTime", "00:00 - 06:00")
                  }
                />{" "}
                Sáng sớm 00:00 - 06:00 (0)
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={filters.departureTime.includes("06:00 - 12:00")}
                  onChange={() =>
                    handleFilterChange("departureTime", "06:00 - 12:00")
                  }
                />{" "}
                Buổi sáng 06:00 - 12:00 (1)
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={filters.departureTime.includes("12:00 - 18:00")}
                  onChange={() =>
                    handleFilterChange("departureTime", "12:00 - 18:00")
                  }
                />{" "}
                Buổi chiều 12:00 - 18:00 (19)
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={filters.departureTime.includes("18:00 - 24:00")}
                  onChange={() =>
                    handleFilterChange("departureTime", "18:00 - 24:00")
                  }
                />{" "}
                Buổi tối 18:00 - 24:00 (11)
              </label>
            </div>
            <div className="filter-section">
              <h4>Loại xe</h4>
              <label>
                <input
                  type="checkbox"
                  checked={filters.busType.includes("Ghế")}
                  onChange={() => handleFilterChange("busType", "Ghế")}
                />{" "}
                Ghế
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={filters.busType.includes("Giường")}
                  onChange={() => handleFilterChange("busType", "Giường")}
                />{" "}
                Giường
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={filters.busType.includes("Limousine")}
                  onChange={() => handleFilterChange("busType", "Limousine")}
                />{" "}
                Limousine
              </label>
            </div>
            <div className="filter-section">
              <h4>Hàng ghế</h4>
              <label>
                <input
                  type="checkbox"
                  checked={filters.seatRow.includes("Hàng đầu")}
                  onChange={() => handleFilterChange("seatRow", "Hàng đầu")}
                />{" "}
                Hàng đầu
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={filters.seatRow.includes("Hàng giữa")}
                  onChange={() => handleFilterChange("seatRow", "Hàng giữa")}
                />{" "}
                Hàng giữa
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={filters.seatRow.includes("Hàng cuối")}
                  onChange={() => handleFilterChange("seatRow", "Hàng cuối")}
                />{" "}
                Hàng cuối
              </label>
            </div>
            <div className="filter-section">
              <h4>Tầng</h4>
              <label>
                <input
                  type="checkbox"
                  checked={filters.floor.includes("Tầng trên")}
                  onChange={() => handleFilterChange("floor", "Tầng trên")}
                />{" "}
                Tầng trên
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={filters.floor.includes("Tầng dưới")}
                  onChange={() => handleFilterChange("floor", "Tầng dưới")}
                />{" "}
                Tầng dưới
              </label>
            </div>
          </div>

          <div className="search-results">
            <h3>KẾT QUẢ TÌM KIẾM (0)</h3>
            {trip.map((item, index) => (
              <div className="search-result-item" key={index}>
                <div className="result-info">
                  <div className="result-details">
                    <div className="form-time">{formatDate(item.formTime)}</div>
                    <div className="duration">
                      <MdMyLocation className="icon icon-left" />
                      ........
                      <div className="text">{item.duration}</div>
                      ........
                      <GrLocation className="icon icon-right" />
                    </div>

                    <div className="to-time">{formatDate(item.toTime)}</div>
                    <div className="bus-type">{item.busType}</div>
                    <div className="seats">
                      {item.seats.tangDuoi.length + item.seats.tangTren.length}{" "}
                      ghế
                    </div>
                    <div className="from">{item.from}</div>
                    <div className="to">{item.to}</div>
                    <div className="price">{item.price}</div>
                  </div>
                </div>
                <div className="result-actions">
                  <button onClick={() => handleButtonClick("seats", index)}>
                    Chọn ghế
                  </button>
                  <button onClick={() => handleButtonClick("schedule", index)}>
                    Lịch trình
                  </button>
                  <button onClick={() => handleButtonClick("transit", index)}>
                    Trung chuyển
                  </button>
                  <button onClick={() => handleButtonClick("policy", index)}>
                    Chính sách
                  </button>
                  <button
                    className="align-right"
                    onClick={() => handleBookTicket(item.id)}
                  >
                    Chọn chuyến
                  </button>
                </div>

                <div className="result-content">
                  {activeSection[index] === "seats" && (
                    <div className="seat-selection">
                      <div className="seat-legend">
                        <div className="seat sold">Đã bán</div>
                        <div className="seat available">Còn trống</div>
                        <div className="seat selected">Đang chọn</div>
                      </div>
                      <div className="seat-sections">
                        {trip && trip.length > 0 && trip[0].seats ? (
                          <>
                            <div className="seat-section">
                              <h3>Tầng dưới</h3>
                              <div className="seats">
                                {trip[0].seats.tangDuoi.map((seat) => (
                                  <div
                                    key={seat._id}
                                    className={`seat ${seat.status}`}
                                  >
                                    <MdEventSeat style={{ fontSize: "24px" }} />
                                    <span>{seat.id}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="seat-section">
                              <h3>Tầng trên</h3>
                              <div className="seats">
                                {trip[0].seats.tangTren.map((seat) => (
                                  <div
                                    key={seat._id}
                                    className={`seat ${seat.status}`}
                                  >
                                    <MdEventSeat style={{ fontSize: "24px" }} />
                                    <span>{seat.id}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </>
                        ) : (
                          <p>Đang tải dữ liệu ghế...</p>
                        )}
                      </div>
                    </div>
                  )}

                  {activeSection[index] === "schedule" && (
                    <div className="schedule-info">
                      <br />
                      <h3>Lịch trình</h3>
                      <p>
                        - Thời gian khởi hành: {formatDate(item.formTime)}
                        <br />- Thời gian đến: {formatDate(item.toTime)}
                        <br />- Thời gian di chuyển: {item.duration}
                      </p>

                      <p>
                        Lưu ý
                        <br />
                        Thời gian trên chỉ mang tính chất tham khảo, có thể thay
                        đổi tùy theo điều kiện giao thông.
                      </p>
                    </div>
                  )}

                  {activeSection[index] === "transit" && (
                    <div className="transit-info">
                      <br />
                      <h3>Đón/ trả tận nơi: </h3>
                      <p>
                        - Thời gian nhận khách : Trước 4 tiếng.
                        <br />
                        - Thời gian xe đón : Chuẩn bị trước 2 -3 tiếng, do mật
                        độ giao thông trong thành phố và sẽ kết hợp đón nhiều
                        điểm khác nhau nên thời gian đón cụ thể tài xế sẽ liên
                        hệ hẹn giờ.
                        <br />
                        - Hẻm nhỏ xe không quay đầu được : Xe trung chuyển sẽ
                        đón Khách đầu hẻm/ đầu đường.
                        <br />
                        - Khu vực có biển cấm dừng đỗ xe không đón được : Xe
                        trung chuyển sẽ đón tại vị trí gần nhất có thể.
                        <br />- Hành lý : Hành lý nhỏ gọn dưới 20 kg, không vận
                        chuyển kèm động vật , thú cưng, không mang đồ có mùi, đồ
                        chảy nước trên xe.
                      </p>
                    </div>
                  )}

                  {activeSection[index] === "policy" && (
                    <div className="policy-info">
                      <br />
                      <h3>Chính sách huỷ vé</h3>
                      <ul>
                        <li>Chỉ được chuyển đổi vé 1 lần duy nhất.</li>
                        <li>
                          Chi phí hủy vé từ 10% – 30% giá vé tùy thuộc thời gian
                          hủy vé so với giờ khởi hành ghi trên vé và số lượng vé
                          cá nhân/tập thể áp dụng theo các quy định hiện hành.
                        </li>
                        <li>
                          Quý khách khi có nhu cầu muốn thay đổi hoặc hủy vé đã
                          thanh toán, cần liên hệ với Trung tâm tổng đài 1900
                          6067 hoặc quầy vé chậm nhất trước 24h so với giờ xe
                          khởi hành được ghi trên vé, trên email hoặc tin nhắn
                          để được hướng dẫn thêm.
                        </li>
                        <br />
                      </ul>

                      <h3>Yêu cầu khi lên xe</h3>
                      <ul>
                        <li>
                          Có mặt tại Văn phòng/Bến xe (Địa điểm xe đón trực
                          tiếp) trước 30 phút để làm thủ tục lên xe (đối với
                          ngày lễ tết cần ra trước 60 phút).
                        </li>
                        <li>
                          Xuất trình thông tin vé được gửi qua SMS/Email/Futa
                          App hoặc liên hệ quầy vé để nhận thông tin vé trước
                          khi lên xe.
                        </li>
                        <li>Không mang thức ăn/đồ uống có mùi lên xe.</li>
                        <li>
                          Không hút thuốc, không sử dụng đồ uống có cồn hoặc sử
                          dụng chất kích thích trên xe.
                        </li>
                        <li>Không mang các vật dễ cháy nổ lên xe.</li>
                        <li>Không vứt rác trên xe.</li>
                        <li>Không mang động vật lên xe.</li>
                      </ul>
                      <br />
                      <h3>Hành lý xách tay</h3>
                      <ul>
                        <li>Tổng trọng lượng hành lý không vượt quá 20kg.</li>
                        <li>Không vận chuyển hàng hoá cồng kềnh.</li>
                      </ul>
                      <br />
                      <h3>Trẻ em dưới 6 tuổi và phụ nữ có thai</h3>
                      <ul>
                        <li>
                          Trẻ em dưới 6 tuổi, cao từ 1.3m trở xuống, cân nặng
                          dưới 30kg thì không phải mua vé.
                        </li>
                        <li>
                          Trong trường hợp trẻ em không thoả 1 trong 3 tiêu chí
                          trên sẽ mua 01 vé tương đương với người lớn.
                        </li>
                        <li>Mỗi người lớn sẽ đi kèm tối đa một trẻ em.</li>
                        <li>
                          Phụ nữ có thai cần đảm bảo sức khoẻ trong suốt quá
                          trình di chuyển.
                        </li>
                      </ul>
                      <br />
                      <h3>Vé đón đường</h3>
                      <ul>
                        <li>
                          Trường hợp có nhu cầu lên xe dọc đường, Quý khách vui
                          lòng liên hệ tổng đài 1900 6067 để đăng kí trước ít
                          nhất 2 tiếng so với giờ xe khởi hành và vui lòng chuẩn
                          bị hành lý nhỏ gọn (tối đa 20kg).
                        </li>
                        <li>
                          Lưu ý, chúng tôi chỉ hỗ trợ đón ở một số địa điểm
                          thuận tiện nằm trên lộ trình.
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default memo(HomePage);
