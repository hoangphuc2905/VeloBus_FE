import { useState, memo } from "react";
import "./style.scss";

import image1 from "assets/user/images/categories/khuyenmai1.png";

const Introduce = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="container">
      <div className="section_title">
        <h2>PHÚC AN</h2>
        <p>"Chất lượng là danh dự"</p>
      </div>
      <div className="section_content">
        <p>
          Phúc An là một công ty 
        </p>
        <p>
          Chúng tôi cam kết mang đến cho khách hàng những sản phẩm chất lượng
          nhất, giá cả hợp lý nhất và dịch vụ chăm sóc khách hàng tốt nhất. Đến
          với BroPlus, khách hàng sẽ được trải nghiệm một dịch vụ mua sắm trực
          tuyến tuyệt vời, nhanh chóng, tiện lợi và an toàn.
        </p>
      </div>
      <div className="section_image_text">
        <div className="image_container">
          <img src={image1} alt="BroPlus" />
        </div>
        <div className="text_container">
          <h3>Về chúng tôi</h3>
          <p>
            BroPlus luôn đặt chất lượng sản phẩm và dịch vụ lên hàng đầu. Chúng
            tôi không ngừng cải tiến và phát triển để mang đến cho khách hàng
            những trải nghiệm tốt nhất.
          </p>
          <p>
            Với phương châm "Chất lượng là danh dự", chúng tôi cam kết mang đến
            cho khách hàng những sản phẩm và dịch vụ tốt nhất.
          </p>
        </div>
      </div>
      {showMore && (
        <>
          <div className="section_image_text reverse">
            <div className="text_container">
              <h3>Về chúng tôi</h3>
              <p>
                BroPlus luôn đặt chất lượng sản phẩm và dịch vụ lên hàng đầu.
                Chúng tôi không ngừng cải tiến và phát triển để mang đến cho
                khách hàng những trải nghiệm tốt nhất.
              </p>
              <p>
                Với phương châm "Chất lượng là danh dự", chúng tôi cam kết mang
                đến cho khách hàng những sản phẩm và dịch vụ tốt nhất.
              </p>
            </div>
            <div className="image_container">
              <img src={image1} alt="BroPlus" />
            </div>
          </div>
          <div className="section_image_text">
            <div className="image_container">
              <img src={image1} alt="BroPlus" />
            </div>
            <div className="text_container">
              <h3>Về chúng tôi</h3>
              <p>
                BroPlus luôn đặt chất lượng sản phẩm và dịch vụ lên hàng đầu.
                Chúng tôi không ngừng cải tiến và phát triển để mang đến cho
                khách hàng những trải nghiệm tốt nhất.
              </p>
              <p>
                Với phương châm "Chất lượng là danh dự", chúng tôi cam kết mang
                đến cho khách hàng những sản phẩm và dịch vụ tốt nhất.
              </p>
            </div>
          </div>
          <div className="section_image_text reverse">
            <div className="text_container">
              <h3>Về chúng tôi</h3>
              <p>
                BroPlus luôn đặt chất lượng sản phẩm và dịch vụ lên hàng đầu.
                Chúng tôi không ngừng cải tiến và phát triển để mang đến cho
                khách hàng những trải nghiệm tốt nhất.
              </p>
              <p>
                Với phương châm "Chất lượng là danh dự", chúng tôi cam kết mang
                đến cho khách hàng những sản phẩm và dịch vụ tốt nhất.
              </p>
            </div>
            <div className="image_container">
              <img src={image1} alt="BroPlus" />
            </div>
          </div>
          <div className="section_image_text">
            <div className="image_container">
              <img src={image1} alt="BroPlus" />
            </div>
            <div className="text_container">
              <h3>Về chúng tôi</h3>
              <p>
                BroPlus luôn đặt chất lượng sản phẩm và dịch vụ lên hàng đầu.
                Chúng tôi không ngừng cải tiến và phát triển để mang đến cho
                khách hàng những trải nghiệm tốt nhất.
              </p>
              <p>
                Với phương châm "Chất lượng là danh dự", chúng tôi cam kết mang
                đến cho khách hàng những sản phẩm và dịch vụ tốt nhất.
              </p>
            </div>
          </div>
        </>
      )}
      <button onClick={() => setShowMore(!showMore)} className="toggle-button">
        {showMore ? "Ẩn bớt" : "Xem thêm"}
      </button>

      <div className="section_image_text reverse">
            <div className="text_container">
              <h3>Về chúng tôi</h3>
              <p>
                BroPlus luôn đặt chất lượng sản phẩm và dịch vụ lên hàng đầu.
                Chúng tôi không ngừng cải tiến và phát triển để mang đến cho
                khách hàng những trải nghiệm tốt nhất.
              </p>
              <p>
                Với phương châm "Chất lượng là danh dự", chúng tôi cam kết mang
                đến cho khách hàng những sản phẩm và dịch vụ tốt nhất.
              </p>
            </div>
            <div className="image_container">
              <img src={image1} alt="BroPlus" />
            </div>
          </div>
          <div className="section_image_text">
            <div className="image_container">
              <img src={image1} alt="BroPlus" />
            </div>
            <div className="text_container">
              <h3>Về chúng tôi</h3>
              <p>
                BroPlus luôn đặt chất lượng sản phẩm và dịch vụ lên hàng đầu.
                Chúng tôi không ngừng cải tiến và phát triển để mang đến cho
                khách hàng những trải nghiệm tốt nhất.
              </p>
              <p>
                Với phương châm "Chất lượng là danh dự", chúng tôi cam kết mang
                đến cho khách hàng những sản phẩm và dịch vụ tốt nhất.
              </p>
            </div>
          </div>
    </div>
  );
};

export default memo(Introduce);
