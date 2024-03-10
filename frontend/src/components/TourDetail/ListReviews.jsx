import { formatVietnameseDate } from "../../helper/formattingDate";
import "./ReviewTour.css";

function ListReviews({ reviews }) {
  return (
    <div className="mb-5 user__reviews">
      {reviews.map((review) => (
        <div key={review._id} className="reviews">
          <div className="review-item">
            <img
              className="user-avatar"
              src={`http://localhost:8080/img/user/${review.user.photo}`}
              alt={review.user._id}
            />
            <div className="w-100">
              <div className="d-flex align-items-center justify-content-between">
                <div className="flex-grow-1 review-info">
                  <h5 className="md">{review.user.name}</h5>
                  <p className="sm">{formatVietnameseDate(review.createdAt)}</p>
                </div>
                <div className="d-flex align-items-center column-gap-2 review-ratings">
                  <span>{review.rating}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="tour-review_icon"
                    fill="currentColor"
                  >
                    <path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26ZM12.0006 15.968L16.2473 18.3451L15.2988 13.5717L18.8719 10.2674L14.039 9.69434L12.0006 5.27502L9.96214 9.69434L5.12921 10.2674L8.70231 13.5717L7.75383 18.3451L12.0006 15.968Z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="user-review sm">{review.review}</div>
        </div>
      ))}
    </div>
  );
}

export default ListReviews;
