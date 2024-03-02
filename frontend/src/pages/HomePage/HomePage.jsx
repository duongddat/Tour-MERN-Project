// import { useLoaderData } from "react-router-dom";

import Subtitle from "../../shared/Subtitle";
import heroImg from "../../assets/img/hero-img01.jpg";
import heroImg02 from "../../assets/img/hero-img02.jpg";
import heroVideo from "../../assets/video/hero-video.mp4";
import worldImg from "../../assets/img/world.png";
import headingBorderImg from "../../assets/img/heading-border.webp";

import "./HomePage.css";
import SearchBar from "../../shared/SearchBar";
import { Link } from "react-router-dom";

export default function HomePage() {
  // const data = useLoaderData();
  // console.log(data.data.tours);
  return (
    <>
      {/*========================Hero section(start)===============================*/}
      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="hero__content">
                <div className="hero__subtitle d-flex align-items-center">
                  <Subtitle subtitle="Know Before You Go" />
                  <img src={worldImg} alt="World Image" />
                </div>
                <h1>
                  Traveling opens the door to creating
                  <span className="hinglight"> memories</span>
                </h1>
                <p>
                  Tận hưởng sự xa hoa và đẳng cấp tối đa với các tour du lịch
                  mới nhất và phổ biến nhất. Khám phá một hành trình tuyệt vời
                  đưa bạn vào thế giới của sự sang trọng, tiện nghi và trải
                  nghiệm không thể quên.
                </p>
                <div>
                  <img src={headingBorderImg} alt="Heading Border Image" />
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-4">
              <div className="hero__img-box">
                <img src={heroImg} alt="Hero Image" />
              </div>
            </div>
            <div className="col-lg-2 col-md-4">
              <div className="hero__img-box mt-4">
                <video src={heroVideo} alt="Hero Video" muted autoPlay loop />
              </div>
            </div>
            <div className="col-lg-2 col-md-4">
              <div className="hero__img-box mt-5-md-size">
                <img src={heroImg02} alt="Hero Image 02" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*========================Hero section(end)===============================*/}
      <SearchBar />
      <section className="m-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 gap-40">
              <h5 className="services__subtitle">What we serve</h5>
              <h3 className="services__title">
                Tour du lịch mới và phổ biến nhất
              </h3>
              <div>
                <img src={headingBorderImg} alt="Heading Border Image" />
              </div>
            </div>
            <div className="col-lg-6">
              <p className="lg services__description">
                Chuyên tour du lịch Cao cấp giá rẻ đầu tiên tại Việt Nam. Với
                sản phẩm tour đa dạng phong phú, dịch vụ chất lượng và uy tín.
                Mở ra nhiều trải nghiệm mới mẻ cùng chúng tôi HoYoViVu
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="d-flex justify-content-center">
        <Link
          to="/tours"
          className="button btn-see-more d-flex align-items-center"
        >
          <div className="md">Xem tất cả tour </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
          </svg>
        </Link>
      </div>
    </>
  );
}
