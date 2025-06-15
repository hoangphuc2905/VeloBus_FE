import { memo, useEffect } from "react";
import "./style.scss";
import AOS from 'aos';
import 'aos/dist/aos.css';

// Import images for each section
const aboutUsImage = "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=1000&auto=format&fit=crop";
const missionImage = "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1000&auto=format&fit=crop";
const visionImage = "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop";
const valuesImage = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop";

interface SectionContent {
  title: string;
  paragraphs: string[];
  image: string;
}

const sectionContents: SectionContent[] = [
  {
    title: "Về chúng tôi",
    paragraphs: [
      "VeloBus luôn đặt chất lượng sản phẩm và dịch vụ lên hàng đầu. Chúng tôi không ngừng cải tiến và phát triển để mang đến cho khách hàng những trải nghiệm tốt nhất.",
      "Với phương châm \"Chất lượng là danh dự\", chúng tôi cam kết mang đến cho khách hàng những sản phẩm và dịch vụ tốt nhất."
    ],
    image: aboutUsImage
  },
  {
    title: "Sứ mệnh của chúng tôi",
    paragraphs: [
      "Sứ mệnh của VeloBus là trở thành nhà cung cấp dịch vụ vận tải hành khách hàng đầu, mang đến sự tiện lợi, an toàn và đáng tin cậy cho mọi chuyến đi.",
      "Chúng tôi nỗ lực không ngừng để kết nối mọi người, mọi miền đất nước thông qua mạng lưới vận chuyển rộng khắp và dịch vụ chuyên nghiệp."
    ],
    image: missionImage
  },
  {
    title: "Tầm nhìn",
    paragraphs: [
      "Chúng tôi hướng tới việc xây dựng một hệ sinh thái vận tải thông minh, ứng dụng công nghệ tiên tiến để tối ưu hóa trải nghiệm của khách hàng.",
      "VeloBus sẽ là lựa chọn hàng đầu cho mọi hành trình, nơi khách hàng cảm nhận được sự khác biệt về chất lượng và dịch vụ."
    ],
    image: visionImage
  },
  {
    title: "Giá trị cốt lõi",
    paragraphs: [
      "Khách hàng là trọng tâm: Luôn lắng nghe và thấu hiểu nhu cầu của khách hàng để cung cấp dịch vụ vượt trội.",
      "An toàn là trên hết: Đảm bảo an toàn tuyệt đối cho mọi hành khách và phương tiện.",
      "Chuyên nghiệp và tận tâm: Đội ngũ nhân viên được đào tạo bài bản, phục vụ tận tình và chu đáo.",
      "Đổi mới và phát triển: Không ngừng cải tiến công nghệ và dịch vụ để đáp ứng mọi yêu cầu của thị trường."
    ],
    image: valuesImage
  }
];

const Introduce: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  const renderSection = (content: SectionContent, isReversed: boolean = false) => (
    <div 
      className={`section_image_text ${isReversed ? 'reverse' : ''}`}
      data-aos={isReversed ? "fade-left" : "fade-right"}
    >
      {!isReversed && (
        <div className="image_container" data-aos="zoom-in" data-aos-delay="200">
          <img src={content.image} alt={content.title} />
        </div>
      )}
      <div className="text_container" data-aos="fade-up" data-aos-delay="300">
        <h3>{content.title}</h3>
        {content.paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      {isReversed && (
        <div className="image_container" data-aos="zoom-in" data-aos-delay="200">
          <img src={content.image} alt={content.title} />
        </div>
      )}
    </div>
  );

  return (
    <div className="container">
      <div className="section_title" data-aos="fade-down">
        <h2>VELOBUS</h2>
        <p>"Chất lượng là danh dự"</p>
      </div>
      <div className="section_content">
        <p>
          Phúc An là một công ty 
        </p>
        <p>
          Chúng tôi cam kết mang đến cho khách hàng những sản phẩm chất lượng
          nhất, giá cả hợp lý nhất và dịch vụ chăm sóc khách hàng tốt nhất. Đến
          với VeloBus, khách hàng sẽ được trải nghiệm một dịch vụ mua sắm trực
          tuyến tuyệt vời, nhanh chóng, tiện lợi và an toàn.
        </p>
      </div>
      {sectionContents.map((content, index) => (
        <div key={index}>
          {renderSection(content, index % 2 !== 0)} 
        </div>
      ))}
    </div>
  );
};

export default memo(Introduce); 