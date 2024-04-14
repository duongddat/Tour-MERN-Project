import { Typewriter } from "react-simple-typewriter";

import AboutGif from "../../assets/img/about.gif";
import CurveImg from "../../assets/img/curve.png";
import "./AboutUsPage.css";
import Subtitle from "../../shared/Subtitle";

function AboutUsPage() {
  return (
    <>
      <section className="banner section-bg">
        <div className="container mt-5 mb-5">
          <div className="row align-items-center row-gap-5">
            <div className="col-xl-7 col-lg-7 col-md-6 col-12">
              <span className="tagline">Travel with us,</span>{" "}
              <span className="text-relative">
                HoYoViVu
                <img src={CurveImg} alt="curve image" className="curve" />
              </span>
              <h1 className="d-flex flex-column gap-2">
                {`Hi, I'm `}
                <div className="wrap text-wrap">
                  <Typewriter
                    words={[
                      "Coder!",
                      "Web developer",
                      "UI/UX developer",
                      "Mobile developer",
                      "Desktop developer",
                    ]}
                    loop={5}
                    cursor
                    cursorStyle="_"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1000}
                  />
                </div>
              </h1>
              <p className="mb-5 text-about">
                <strong>HoYoViVu</strong>, là điểm đến tuyệt vời dành cho những
                người yêu thích du lịch. Từ hướng dẫn chi tiết đến đánh giá chân
                thực và những góc ảnh đẹp mắt, chúng tôi mang đến trải nghiệm du
                lịch độc đáo và phong phú trên khắp thế giới. Hãy để{" "}
                <strong>HoYoViVu</strong> là nguồn cảm hứng cho mọi chuyến đi
                của bạn!
              </p>
              <button className="button">
                Download my CV
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M4 19H20V12H22V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V12H4V19ZM14 9H19L12 16L5 9H10V3H14V9Z"></path>
                </svg>
              </button>
            </div>
            <div className="col-xl-5 col-lg-5 col-md-6 col-12 h-100">
              <div className="d-flex justify-content-center about-img">
                <img src={AboutGif} alt="Header About Image" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-bg mt-5">
        <div className="container">
          <div className="text-end">
            <div className="d-flex">
              <div className="flex-grow-1"></div>
              <Subtitle subtitle="About us!" />
            </div>
            <h4 className="header__title">
              Khai mở những ký ức mới cùng
              <br /> HoYoViVu
            </h4>
          </div>
          <div className="row row-gap-5 mt-5 mb-5">
            <div className="col-xl-3 col-lg-4 col-md-6 col-12">
              <div className="card-about__info card__bg">
                <div className="icon">
                  <i className="ri-rocket-2-fill"></i>
                </div>
                <div className="content">
                  <h2>Dễ dàng thanh toán</h2>
                  <p>
                    Thực hiện thanh toán một cách thuận tiện chỉ trong vài bước
                    đơn giản. Không chỉ giúp tiết kiệm thời gian, chúng tôi còn
                    đảm bảo tính bảo mật tuyệt đối cho thông tin thanh toán của
                    bạn. Bạn có thể yên tâm rằng mọi giao dịch được xử lý một
                    cách an toàn và minh bạch.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-12">
              <div className="card-about__info card-first__bg">
                <div className="icon">
                  <i className="ri-global-fill"></i>
                </div>
                <div className="content">
                  <h2>Rất quyền năng</h2>
                  <p>
                    Tại <strong>HoYoViVu</strong>, chúng tôi không chỉ cung cấp
                    những tour du lịch phong phú và đa dạng, mà còn mang đến
                    trải nghiệm du lịch độc đáo và đẳng cấp thông qua các tour
                    được tổ chức bởi các chuyên gia hàng đầu trong ngành du
                    lịch. Bạn sẽ được hưởng một dịch vụ chăm sóc khách hàng tận
                    tâm và chuyên nghiệp từ khi đặt tour cho đến khi kết thúc
                    chuyến đi.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-12">
              <div className="card-about__info card-second__bg">
                <div className="icon">
                  <i className="ri-hand-coin-fill"></i>
                </div>
                <div className="content">
                  <h2>Chăm sóc khách hành</h2>
                  <p>
                    Tại <strong>HoYoViVu</strong>, chúng tôi luôn đặt lợi ích và
                    sự thoải mái của khách hàng lên hàng đầu. Với đội ngũ nhân
                    viên chăm sóc khách hàng chuyên nghiệp và tận tâm, mỗi yêu
                    cầu và nhu cầu của bạn sẽ được đáp ứng một cách nhanh chóng
                    và chu đáo.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-12">
              <div className="card-about__info card-third__bg">
                <div className="icon">
                  <i className="ri-gift-fill"></i>
                </div>
                <div className="content">
                  <h2>Chính sách ưu đãi</h2>
                  <p>
                    Có cơ hội nhận được các ưu đãi hấp dẫn như giảm giá đặc biệt
                    cho đặt tour sớm, các gói quà tặng giá trị và nhiều hơn nữa.
                    Chúng tôi cũng cung cấp các chính sách hoàn tiền linh hoạt
                    và các ưu đãi đặc biệt dành cho khách hàng thân thiết. Khám
                    phá thế giới một cách tiết kiệm và thú vị hơn bao giờ hết!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutUsPage;
