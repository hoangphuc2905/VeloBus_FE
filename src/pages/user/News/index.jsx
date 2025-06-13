import { useState, memo } from "react";
import "./style.scss";

const newsData = [
  {
    id: 1,
    title: "Cách đặt vé xe Phúc An nhanh chóng và dễ dàng",
    description: "Hướng dẫn chi tiết về cách đặt vé xe qua trang web Phúc An.",
    content:
      "Đặt vé xe tại Phúc An cực kỳ tiện lợi. Chỉ cần truy cập trang chủ, chọn tuyến đường, ngày giờ khởi hành, và thanh toán online một cách nhanh chóng.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_cSIkRlayR0KtrJxEEvkfrmI14ZfLmY0jzA&s",
  },
  {
    id: 2,
    title: "Ưu đãi tháng 12: Giảm giá 20% cho mọi tuyến đường",
    description: "Cơ hội tuyệt vời để đi xe Phúc An với chi phí tiết kiệm.",
    content:
      "Trong tháng 12, Phúc An áp dụng ưu đãi giảm 20% giá vé cho tất cả các tuyến đường khi đặt vé qua website hoặc app di động.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_cSIkRlayR0KtrJxEEvkfrmI14ZfLmY0jzA&s",
  },
  {
    id: 3,
    title: "Lịch trình xe khách Phúc An dịp Tết Nguyên Đán",
    description: "Cập nhật lịch trình mới nhất cho dịp lễ lớn sắp tới.",
    content:
      "Phúc An đã cập nhật lịch trình các tuyến xe dịp Tết Nguyên Đán. Quý khách nên đặt vé sớm để đảm bảo có chỗ ngồi phù hợp.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_cSIkRlayR0KtrJxEEvkfrmI14ZfLmY0jzA&s",
  },
];

const News = () => {
  const [selectedNews, setSelectedNews] = useState(null);

  const handleSelectNews = (news) => {
    setSelectedNews(news);
  };

  const handleBack = () => {
    setSelectedNews(null);
  };

  return (
    <div className="news-page">
      {!selectedNews ? (
        <div className="news-list">
          <h2 className="news-title">Tin Tức Phúc An</h2>
          <div className="news-items">
            {newsData.map((news) => (
              <div
                key={news.id}
                className="news-item"
                onClick={() => handleSelectNews(news)}
              >
                <img src={news.image} alt={news.title} className="news-image" />
                <div className="news-content">
                  <h3 className="news-item-title">{news.title}</h3>
                  <p className="news-description">{news.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="news-detail">
          <button onClick={handleBack} className="back-button">
            &larr; Quay lại
          </button>
          <h2 className="detail-title">{selectedNews.title}</h2>
          <img
            src={selectedNews.image}
            alt={selectedNews.title}
            className="detail-image"
          />
          <p className="detail-content">{selectedNews.content}</p>
        </div>
      )}
    </div>
  );
};

export default memo(News);