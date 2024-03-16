import { Form } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { currencyFormatter } from "../../helper/formattingPrice";
import { setMessage } from "../../store/message-slice";
import "./Booking.css";

function Booking({ tour }) {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(null);
  const totalPrice = tour.price * (amount || 1);

  function handleChangeAmount(event) {
    setAmount(event.target.value);
  }

  function handleCreateBooking(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    const { email, date } = data;

    if (!userInfo) {
      dispatch(
        setMessage({
          type: "error",
          message: "Vui lòng đăng nhập để đặt tour!",
        })
      );
      return;
    }

    if (userInfo.email !== email) {
      dispatch(
        setMessage({
          type: "error",
          message: "Vui lòng nhập đúng email của bạn!",
        })
      );

      return;
    }

    const selectedDate = new Date(date);
    const currentDate = new Date();

    currentDate.setDate(currentDate.getDate() + 2);

    if (selectedDate < currentDate) {
      dispatch(
        setMessage({
          type: "error",
          message:
            "Vui lòng chọn một ngày ít nhất là 2 ngày sau ngày hiện tại!",
        })
      );
      return;
    }

    console.log(data);
  }

  return (
    <div className="tour-content booking sticky">
      <div className="booking__top d-flex align-items-center jusstify-content-between flex-wrap">
        <h5 className="flex-grow-1">
          {currencyFormatter.format(tour.price)}
          <span>/khách</span>
        </h5>
        <span className="item__ratings d-flex justify-content-center align-items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M11.9998 17L6.12197 20.5902L7.72007 13.8906L2.48926 9.40983L9.35479 8.85942L11.9998 2.5L14.6449 8.85942L21.5104 9.40983L16.2796 13.8906L17.8777 20.5902L11.9998 17ZM11.9998 14.6564L14.8165 16.3769L14.0507 13.1664L16.5574 11.0192L13.2673 10.7554L11.9998 7.70792L10.7323 10.7554L7.44228 11.0192L9.94893 13.1664L9.18311 16.3769L11.9998 14.6564Z"></path>
          </svg>
          <label className="xs">{`${tour.ratingsAverage} ratings (${tour.ratingsQuantity})`}</label>
        </span>
      </div>
      {/* ==================== Booking from (start)====================== */}
      <div className="booking__form">
        <h5>Thông tin</h5>
        <Form onSubmit={handleCreateBooking}>
          <div className="booking__info-form">
            <div className="mb-3">
              <input
                type="text"
                placeholder="Nhập họ tên"
                id="fullName"
                name="fullName"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Nhập số điện thoại"
                id="phone"
                name="phone"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                placeholder="Nhập email"
                id="email"
                name="email"
                required
              />
            </div>
            <div className="mb-3 d-flex align-items-center gap-3">
              <input
                type="date"
                placeholder=""
                id="date"
                name="date"
                required
              />
              <input
                type="number"
                placeholder="Nhập số lượng"
                id="guestSize"
                name="guestSize"
                onChange={(event) => handleChangeAmount(event)}
                required
              />
            </div>
          </div>
          <div className="booking__bottom mt-2">
            <ul className="list-group">
              <li className="list-group-item border-0 px-0">
                <h5 className="d-flex align-items-center gap-1">
                  {currencyFormatter.format(tour.price)} x {amount || 1} người
                </h5>
                <span>{currencyFormatter.format(totalPrice)}</span>
              </li>
              <li className="list-group-item border-0 px-0 total">
                <h5>Tổng tiền:</h5>
                <span>{currencyFormatter.format(totalPrice)}</span>
              </li>
            </ul>
            <button type="submit" className="button w-100">
              Đặt ngay
            </button>
          </div>
        </Form>
      </div>
      {/* ==================== Booking from (end)====================== */}
    </div>
  );
}

export default Booking;
