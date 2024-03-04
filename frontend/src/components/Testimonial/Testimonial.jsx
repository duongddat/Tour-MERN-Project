// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import ava01 from "../../assets/img/ava-3.jpg";
import "./Testimonial.css";

function Testimonial() {
  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        320: {
          slidesPerView: 1,
        },
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      }}
    >
      <SwiperSlide>
        <div className="testimonial py-4 px-3">
          <div className="swiper-client-msg">
            <p>Tour du lịch Mù Cang chải thật tuyệt vời tôi rất thích nó!!!</p>
          </div>
          <div className="swiper-client-data d-flex justify-content-center align-items-center gap-4 mt-3">
            <img src={ava01} alt="" />
            <div className="client-data-details">
              <h6 className="mb-0 mt-3">User 1</h6>
              <p>User 1</p>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="testimonial py-4 px-3">
          <div className="swiper-client-msg">
            <p>Tour du lịch Mù Cang chải thật tuyệt vời tôi rất thích nó!!!</p>
          </div>
          <div className="swiper-client-data d-flex justify-content-center align-items-center gap-4 mt-3">
            <img src={ava01} alt="" />
            <div className="client-data-details">
              <h6 className="mb-0 mt-3">User 1</h6>
              <p>User 1</p>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="testimonial py-4 px-3">
          <div className="swiper-client-msg">
            <p>Tour du lịch Mù Cang chải thật tuyệt vời tôi rất thích nó!!!</p>
          </div>
          <div className="swiper-client-data d-flex justify-content-center align-items-center gap-4 mt-3">
            <img src={ava01} alt="" />
            <div className="client-data-details">
              <h6 className="mb-0 mt-3">User 1</h6>
              <p>User 1</p>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="testimonial py-4 px-3">
          <div className="swiper-client-msg">
            <p>
              Tour du lịch Mù Cang chải thật tuyệt!!! Tour du lịch Mù Cang chải
              thật!!! Tour du lịch Mù Cang chải thật!!!Tour du lịch Mù Cang chải
              thật!!! Tour du lịch Mù Cang chải thật!!! Tour du lịch Mù Cang
              chải thật!!!
            </p>
          </div>
          <div className="swiper-client-data d-flex justify-content-center align-items-center gap-4 mt-3">
            <img src={ava01} alt="" />
            <div className="client-data-details">
              <h6 className="mb-0 mt-3">User 1</h6>
              <p>User 1</p>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

export default Testimonial;
