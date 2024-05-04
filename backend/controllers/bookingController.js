const stripe = require("stripe")(
  "sk_test_51Oo58LGF36WaT16Ll0FtkRUiUehOtjRSIepG4RL4uwyGlqmAMttZm9H7r5eauJAzlkvwxNtRzscMUIBfMGrkQuqo00icsEnQHK"
);
const moment = require("moment");

const Tour = require("../models/tourModel");
const Booking = require("../models/bookingModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const { guestSize, bookAt, discount = 0 } = req.body;

  //1. Get the currently booked tour and save booking
  //Current booked tour
  const tour = await Tour.findById(req.params.tourID);

  const totalPrice = guestSize * 1 * (tour.priceDiscount || tour.price);
  const discountedPrice = totalPrice - (totalPrice * discount) / 100;
  const parsedDate = moment(bookAt, "DD/MM/YYYY").toDate();

  //Save booking tour
  const booking = await Booking.create({
    tour: tour._id,
    user: req.user._id,
    guestSize,
    bookAt: parsedDate,
    price: discountedPrice,
  });

  //2. Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    customer_email: req.user.email,
    client_reference_id: req.params.tourID,
    line_items: [
      {
        price_data: {
          unit_amount: discountedPrice,
          currency: "VND",
          product_data: {
            name: tour.title,
            description: `Ngày khởi hành: ${bookAt} -:- Số lượng người: ${guestSize} x ${
              tour.priceDiscount || tour.price
            } đồng ${discount !== 0 && `-:- Giảm giá: ${discount} %`}`,
            images: [
              "https://upload-os-bbs.hoyolab.com/upload/2023/03/24/4dca08bc4e21bb299398af982531bb79_405534880414408859.png?x-oss-process=image%2Fresize%2Cs_500%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_80",
            ],
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.CLIENT_SITE_URL}/checkout-success/${booking._id}`,
    cancel_url: `${process.env.CLIENT_SITE_URL}/tours/detail/${tour.slug}`,
  });

  if (!session) {
    return res.status(400).json({
      status: "error",
      message: "Đã xảy ra lỗi! Vui lòng thử lại sau!!!",
    });
  }

  //3. Create session as response
  res.status(200).json({
    status: "success",
    session: session.url,
    data: {
      booking,
    },
  });
});

exports.paidTour = catchAsync(async (req, res, next) => {
  const updateBooking = await Booking.updateOne(
    { _id: req.query.id },
    {
      paid: true,
    },
    { new: true }
  );

  if (!updateBooking.acknowledged) {
    return next(new AppError("Vui lòng thử lại sau!!!", 401));
  }

  res.status(200).json({
    status: "success",
    message: "Thanh toán thành công!",
  });
});

exports.getAllBookingOfUser = catchAsync(async (req, res, next) => {
  const id = req.user.id;
  const booking = await Booking.find({ user: id }).sort({
    createAd: -1,
    bookAt: -1,
  });

  res.status(200).json({
    status: "success",
    length: booking.length,
    data: {
      booking,
    },
  });
});

exports.getAllBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.find().sort({ createdAt: -1, bookAt: -1 });

  res.status(200).json({
    status: "success",
    length: booking.length,
    data: {
      booking,
    },
  });
});

exports.getBooking = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const booking = await Booking.findById(id);

  if (!booking) {
    return next(new AppError("Không tìm thấy chuyến du lịch với ID đó", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Đã truy xuất thành công",
    data: {
      booking,
    },
  });
});

exports.deleteBooking = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const booking = await Booking.findByIdAndDelete(id);

  if (!booking) {
    return next(new AppError("Không tìm thấy đặt tour nào với ID đó", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.cancelBooking = catchAsync(async (req, res, next) => {
  const bookingId = req.params.bookingId;
  const booking = await Booking.findOne({ _id: bookingId, user: req.user._id });

  if (!booking) {
    return next(new AppError("Không tìm thấy đặt tour nào với ID đó", 404));
  }

  if (booking.cancelled) {
    return next(new AppError("Đặt tour này đã hủy bỏ!!!", 404));
  }

  const currentDate = new Date();
  const bookingDate = new Date(booking.bookAt);
  const twoDaysBeforeBookingDate = new Date(bookingDate);
  twoDaysBeforeBookingDate.setDate(bookingDate.getDate() - 2);

  if (currentDate > twoDaysBeforeBookingDate) {
    return next(
      new AppError(
        "Đặt tour không thể hủy bỏ ít hơn 2 ngày trước ngày khởi hành tour!!!",
        404
      )
    );
  }

  booking.cancelled = true;
  await booking.save();

  res.status(200).json({
    status: "success",
    message: "Hủy đặt tour thành công!",
    data: {
      booking,
    },
  });
});
