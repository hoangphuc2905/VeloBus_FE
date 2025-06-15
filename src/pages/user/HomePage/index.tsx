import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { updateUserInfo } from "../../../redux/apiRequest";
import { FaUser, FaCalendarAlt, FaMapMarkerAlt, FaSearch, FaShieldAlt, FaClock, FaBus, FaTicketAlt } from "react-icons/fa";
import { MdOutlineAirlineSeatReclineNormal } from "react-icons/md";
import { BsArrowLeftRight } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { Carousel as ResponsiveCarousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./style.scss";
import { memo, ChangeEvent } from "react";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import { ROUTER } from "utils/router";
import { MdEventSeat, MdMyLocation } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

const category = require("assets/user/images/categories/khuyenmai1.png");
const category2 = require("assets/user/images/categories/khuyenmai2.png");
const category3 = require("assets/user/images/categories/khuyenmai3.png");
const category4 = require("assets/user/images/categories/khuyenmai4.png");
const category5 = require("assets/user/images/categories/khuyenmai5.png");

interface Filters {
  departureTime: string[];
  busType: string[];
  seatRow: string[];
  floor: string[];
}

interface SliderItem {
  id: number;
  image: string;
}

interface TripInfo {
  id: number;
  image: string;
  title: string;
  price: string;
  content: string;
}

interface Trip {
  [key: string]: any;
}

interface ActiveSection {
  [key: number]: string;
}

const HomePage = () => {
  const [isRoundTrip, setIsRoundTrip] = useState<boolean>(false);
  const [departureDate, setDepartureDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [returnDate, setReturnDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [filters, setFilters] = useState<Filters>({
    departureTime: [],
    busType: [],
    seatRow: [],
    floor: [],
  });

  const handleTabChange = (): void => {
    setIsRoundTrip(!isRoundTrip);
  };

  const handleDepartureDateChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setDepartureDate(event.target.value);
    if (event.target.value > returnDate) {
      setReturnDate(event.target.value);
    }
  };

  const handleReturnDateChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setReturnDate(event.target.value);
  };

  const handleFilterChange = (category: keyof Filters, value: string): void => {
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

  const deleteAllFilters = (): void => {
    setFilters({
      departureTime: [],
      busType: [],
      seatRow: [],
      floor: [],
    });
  };

  const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");

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

  const sliderItems: SliderItem[] = [
    { id: 1, image: category },
    { id: 2, image: category2 },
    { id: 3, image: category3 },
    { id: 4, image: category4 },
    { id: 5, image: category5 },
  ];

  const tripInfo: TripInfo[] = [
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

  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [trip, setTrip] = useState<Trip>({});

  const fetchTrips = async () => {
    try {
      const response = await fetch("/trip");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTrip(data);
    } catch (error) {
      console.error("Error fetching trips:", error);
      // You might want to set an error state here to show to the user
      setTrip([]); // Set empty array as fallback
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1000, // duration of the animation
      once: true,    // whether animation should happen only once - while scrolling down
    });
    fetchTrips();
  }, []);

  const handleSearch = (): void => {
    setHasSearched(true);

    const fetchTrips = async (): Promise<void> => {
      const response = await fetch(
        `http://localhost:8000/trip/fromto/${from}/${to}`
      );
      const data = await response.json();
      setTrip(data);
    };

    fetchTrips();
  };

  const [activeSection, setActiveSection] = useState<ActiveSection>({});

  const handleButtonClick = (section: string, index: number): void => {
    setActiveSection((prevSections) => ({
      ...prevSections,
      [index]: section,
    }));
  };
  const navigate = useNavigate();

  const handleBookTicket = (tripId: string): void => {
    navigate(`${ROUTER.USER.BOOK_TICKET}/${tripId}`);
  };

  const features = [
    {
      icon: <FaShieldAlt />,
      title: "An toàn tuyệt đối",
      description: "Đội ngũ lái xe chuyên nghiệp, xe được bảo trì thường xuyên"
    },
    {
      icon: <FaClock />,
      title: "Đúng giờ",
      description: "Cam kết đúng giờ khởi hành và đến nơi"
    },
    {
      icon: <FaBus />,
      title: "Tiện nghi",
      description: "Xe hiện đại, tiện nghi cao cấp"
    },
    {
      icon: <FaTicketAlt />,
      title: "Giá tốt",
      description: "Giá vé cạnh tranh, nhiều ưu đãi"
    }
  ];

  const popularDestinations = [
    {
      id: 1,
      name: "Đà Lạt",
      image: category,
      description: "Thành phố ngàn thông",
      price: "290,000 VND"
    },
    {
      id: 2,
      name: "Nha Trang",
      image: category2,
      description: "Thành phố biển xinh đẹp",
      price: "350,000 VND"
    },
    {
      id: 3,
      name: "Phan Thiết",
      image: category3,
      description: "Thiên đường nghỉ dưỡng",
      price: "320,000 VND"
    }
  ];

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-item" data-aos="fade-right"></div>
        <div className="box" data-aos="fade-left">
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
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setFrom(e.target.value)}
                  />
                </div>
                <div className="box-content_left_top_item">
                  <h6>Điểm đến</h6>
                  <input
                    type="text"
                    placeholder="Nơi đến"
                    value={to}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setTo(e.target.value)}
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
      </div>

      <section className="features-section" data-aos="fade-up">
        <div className="container">
          <h2 className="section-title">Tại sao chọn chúng tôi?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card" data-aos="zoom-in" data-aos-delay={index * 100}>
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="popular-destinations" data-aos="fade-up">
        <div className="container">
          <h2 className="section-title">Điểm đến phổ biến</h2>
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
          >
            {popularDestinations.map((destination) => (
              <div key={destination.id} className="destination-card" data-aos="flip-up">
                <img src={destination.image} alt={destination.name} />
                <div className="destination-info">
                  <h3>{destination.name}</h3>
                  <p>{destination.description}</p>
                  <div className="price">Từ {destination.price}</div>
                  <button onClick={() => handleBookTicket(destination.id.toString())}>
                    Đặt vé ngay
                  </button>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      <section className="promotions-section" data-aos="fade-up">
        <div className="container">
          <h2 className="section-title">Khuyến mãi hấp dẫn</h2>
          <div className="promotions-grid">
            <div className="promotion-card" data-aos="fade-in" data-aos-delay="200">
              <img src={category4} alt="Khuyến mãi 1" />
              <div className="promotion-content">
                <h3>Giảm giá 20% cho chuyến đầu tiên</h3>
                <p>Áp dụng cho tất cả các tuyến xe</p>
              </div>
            </div>
            <div className="promotion-card" data-aos="fade-in" data-aos-delay="400">
              <img src={category5} alt="Khuyến mãi 2" />
              <div className="promotion-content">
                <h3>Mua 2 tặng 1</h3>
                <p>Cho các chuyến xe cuối tuần</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default memo(HomePage); 