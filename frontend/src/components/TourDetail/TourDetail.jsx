import TourImgGallery from "./TourImgGallery.jsx";
import headingBorderImg from "../../assets/img/heading-border.webp";
import { currencyFormatter } from "../../helper/formattingPrice";
import "./TourDetail.css";
import MapBox from "./MapBox.jsx";
import ReviewTour from "./ReviewTour.jsx";

function TourDetail({ tour }) {
  const paragraphs = tour.description.split("\n");

  return (
    <>
      <div className="tour-content">
        <div className="tour__header">
          <div className="d-flex flex-wrap gap-16">
            <div className="d-flex flex-column flex-grow-1 gap-16">
              <h4 className="fw-bold tour-title">{tour.title}</h4>
              <div className="d-flex gap-8">
                <div className="item__ratings d-flex justify-content-center align-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M11.9998 17L6.12197 20.5902L7.72007 13.8906L2.48926 9.40983L9.35479 8.85942L11.9998 2.5L14.6449 8.85942L21.5104 9.40983L16.2796 13.8906L17.8777 20.5902L11.9998 17ZM11.9998 14.6564L14.8165 16.3769L14.0507 13.1664L16.5574 11.0192L13.2673 10.7554L11.9998 7.70792L10.7323 10.7554L7.44228 11.0192L9.94893 13.1664L9.18311 16.3769L11.9998 14.6564Z"></path>
                  </svg>
                  <label className="xs">{`${tour.ratingsAverage} ratings (${tour.ratingsQuantity})`}</label>
                </div>
              </div>
            </div>
            <h4 className="tour-price tour-title">
              {currencyFormatter.format(tour.price)}/khách
            </h4>
          </div>
          <div className="mt-2">
            <img src={headingBorderImg} alt="Heading Border Image" />
          </div>
        </div>
        <div className="tour-ImgCover">
          <img
            src={`http://localhost:8080/img/tour/${tour.imageCover}`}
            alt={tour.title}
            className="img-tour__cover"
          />
        </div>
        <div className="mt-5 p-2">
          <div className="row row-gap-4 mb-5">
            <div className="overview-box__group col-md-6">
              <h5 className="heading-secondary">Thông tin nhanh</h5>
              <div className="mb-3">
                <img src={headingBorderImg} alt="Heading Border Image" />
              </div>
              <div className="overview-box__detail">
                <svg
                  className="overview-box__icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 20.8995L16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995ZM12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13ZM12 15C9.79086 15 8 13.2091 8 11C8 8.79086 9.79086 7 12 7C14.2091 7 16 8.79086 16 11C16 13.2091 14.2091 15 12 15Z"></path>
                </svg>
                <span className="overview-box__label">Quốc gia:</span>
                <span className="overview-box__text md">
                  {tour.country.name}
                </span>
              </div>
              <div className="overview-box__detail">
                <svg
                  className="overview-box__icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M6 4H4V2H20V4H18V6C18 7.61543 17.1838 8.91468 16.1561 9.97667C15.4532 10.703 14.598 11.372 13.7309 12C14.598 12.628 15.4532 13.297 16.1561 14.0233C17.1838 15.0853 18 16.3846 18 18V20H20V22H4V20H6V18C6 16.3846 6.81616 15.0853 7.8439 14.0233C8.54682 13.297 9.40202 12.628 10.2691 12C9.40202 11.372 8.54682 10.703 7.8439 9.97667C6.81616 8.91468 6 7.61543 6 6V4ZM8 4V6C8 6.68514 8.26026 7.33499 8.77131 8H15.2287C15.7397 7.33499 16 6.68514 16 6V4H8ZM12 13.2219C10.9548 13.9602 10.008 14.663 9.2811 15.4142C9.09008 15.6116 8.92007 15.8064 8.77131 16H15.2287C15.0799 15.8064 14.9099 15.6116 14.7189 15.4142C13.992 14.663 13.0452 13.9602 12 13.2219Z"></path>
                </svg>
                <span className="overview-box__label">Thời lượng:</span>
                <span className="overview-box__text md">
                  {tour.duration} ngày
                </span>
              </div>
              <div className="overview-box__detail">
                <svg
                  className="overview-box__icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM17.3628 15.2332C20.4482 16.0217 22.7679 18.7235 22.9836 22H20C20 19.3902 19.0002 17.0139 17.3628 15.2332ZM15.3401 12.9569C16.9728 11.4922 18 9.36607 18 7C18 5.58266 17.6314 4.25141 16.9849 3.09687C19.2753 3.55397 21 5.57465 21 8C21 10.7625 18.7625 13 16 13C15.7763 13 15.556 12.9853 15.3401 12.9569Z"></path>
                </svg>
                <span className="overview-box__label">Tối đa:</span>
                <span className="overview-box__text md">
                  {tour.maxGroupSize} người
                </span>
              </div>
            </div>
            <div className="overview-box__group col-md-6">
              <h5 className="heading-secondary">Hướng dẫn viên</h5>
              <div className="mb-3">
                <img src={headingBorderImg} alt="Heading Border Image" />
              </div>
              {tour.guides.length > 0 &&
                tour.guides.map((guide) => (
                  <div key={guide._id} className="overview-box__detail">
                    <img
                      className="overview-box__img"
                      src={`http://localhost:8080/img/user/${guide.photo}`}
                      alt={guide.name}
                    />
                    <div className="d-flex flex-column">
                      <span className="overview-box__label">Tour guide</span>
                      <span className="overview-box__text md">
                        {guide.name}
                      </span>
                    </div>
                  </div>
                ))}
              {tour.guides.length === 0 && (
                <div className="text-center md text-message">
                  Đang cập nhật...
                </div>
              )}
            </div>
          </div>
          <div className="description-box">
            <h4 className="heading-secondary">Thông tin về {tour.title}</h4>
            <div className="mb-3">
              <img src={headingBorderImg} alt="Heading Border Image" />
            </div>
            {paragraphs.map((para, index) => (
              <p key={index} className="description__text">
                {para}
              </p>
            ))}
          </div>
        </div>
        {/* ======================Gallery section (start)=========================== */}
        <div className="mt-2 p-2">
          <h4 className="heading-secondary">Giới thiệu</h4>
          <div className="mb-3">
            <img src={headingBorderImg} alt="Heading Border Image" />
          </div>
          {tour.images.length > 0 && <TourImgGallery images={tour.images} />}
          {tour.images.length === 0 && (
            <div className="text-center md text-message">
              Đang cập nhật hình ảnh...
            </div>
          )}
        </div>
        {/* =====================Gallery section (end)====================== */}
        {/* =========================Map section (start)========================== */}
        <div className="mt-4 mb-5 p-2">
          <h4 className="heading-secondary">Bản đồ và lịch trình</h4>
          <div className="mb-3">
            <img src={headingBorderImg} alt="Heading Border Image" />
          </div>
          {tour.locations.length > 0 && <MapBox locations={tour.locations} />}
          {tour.locations.length === 0 && (
            <div className="text-center md text-message">
              Đang cập nhật địa điểm...
            </div>
          )}
        </div>
        {/* =======================Map section (end)================================ */}
      </div>
      <div className="tour-content mt-3">
        {/* =======================Review section(start)============================ */}
        <div className="mt-2 p-2 tour__reviews">
          <h4 className="heading-secondary">
            Đánh giá ({tour.ratingsQuantity})
          </h4>
          <div className="mb-3">
            <img src={headingBorderImg} alt="Heading Border Image" />
          </div>
          <ReviewTour reviews={tour.reviews} />
        </div>
        {/* =======================Review section (end)============================= */}
      </div>
    </>
  );
}

export default TourDetail;
