import { Link } from "react-router-dom";

import noDataMessage from "../../assets/img/no-data-message.png";
import { currencyFormatter } from "../../helper/formattingPrice";
import { formatDateDefault } from "../../helper/formattingDate";
import BookingCountdown from "./BookingCountDown";

function MyBooking({ booking }) {
  return (
    <>
      {booking.length > 0 && (
        <div className="table-responsive mb-5">
          <table className="table table-hover align-middle text-center   mb-5">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Tour</th>
                <th scope="col">Số người</th>
                <th scope="col">Ngày khởi hành</th>
                <th scope="col">Trạng thái</th>
                <th scope="col">Tổng tiền</th>
                <th scope="col">Công cụ</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {booking.map((book, index) => (
                <tr key={book._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{book.tour.title}</td>
                  <td>{book.guestSize} người</td>
                  <td>{formatDateDefault(book.bookAt)}</td>
                  <td>
                    <BookingCountdown bookAt={book.bookAt} />
                  </td>
                  <td>
                    <strong className="table-text__red">
                      {currencyFormatter.format(book.price)}
                    </strong>
                  </td>
                  <td>
                    <Link
                      to={`/tours/detail/${book.tour.slug}`}
                      className="table-link"
                    >
                      Chi tiết tour
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-center md">That all~</p>
        </div>
      )}
      {booking.length === 0 && (
        <div className="mhy-data-lg">
          <img src={noDataMessage} alt="No data message blog" />
          <p className="mhy-data-lg_text">Bạn chưa đặt tour du lịch nào~</p>
        </div>
      )}
    </>
  );
}

export default MyBooking;
