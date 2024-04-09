import { Typewriter } from "react-simple-typewriter";

import AboutGif from "../../assets/img/about.gif";
import CurveImg from "../../assets/img/curve.png";
import "./AboutUsPage.css";

function AboutUsPage() {
  return (
    <section className="banner">
      <div className="container">
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
              <strong>HoYoViVu</strong> là nguồn cảm hứng cho mọi chuyến đi của
              bạn!
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
  );
}

export default AboutUsPage;
