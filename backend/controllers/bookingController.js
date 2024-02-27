const stripe = require("stripe")(
  "sk_test_51Oo58LGF36WaT16Ll0FtkRUiUehOtjRSIepG4RL4uwyGlqmAMttZm9H7r5eauJAzlkvwxNtRzscMUIBfMGrkQuqo00icsEnQHK"
);
const moment = require("moment");

const Tour = require("../models/tourModel");
const Booking = require("../models/bookingModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const { guestSize, bookAt } = req.body;

  //1. Get the currently booked tour and save booking
  //Current booked tour
  const tour = await Tour.findById(req.params.tourID);

  const totalPrice = guestSize * tour.price;
  const parsedDate = moment(bookAt, "DD/MM/YYYY").toDate();

  //Save booking tour
  const booking = await Booking.create({
    tour: tour._id,
    user: req.user._id,
    guestSize,
    bookAt: parsedDate,
    price: totalPrice,
  });

  //2. Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    customer_email: req.user.email,
    client_reference_id: req.params.tourID,
    line_items: [
      {
        price_data: {
          unit_amount: Math.round(totalPrice * 0.000041 * 100), //cover VND to USD
          currency: "usd",
          product_data: {
            name: tour.title,
            description: `Ngày khởi hành: ${bookAt} -:- Số lượng người: ${guestSize} x ${tour.price} đồng`,
            images: [
              "https://upload-os-bbs.hoyolab.com/upload/2023/03/24/4dca08bc4e21bb299398af982531bb79_405534880414408859.png?x-oss-process=image%2Fresize%2Cs_500%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_80",
            ],
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${req.protocol}://${req.get("host")}/booking/success/?id=${
      booking._id
    }`,
    cancel_url: `${req.protocol}://${req.get("host")}/tours/${tour.slug}`,
  });

  if (!session) {
    return res.status(400).json({
      status: "error",
      message: "Something went wrong",
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
    next(new AppError("Try to later!!!!", 401));
  }

  res.status(200).json({
    status: "success",
    message: "Successfully to Pay",
  });
});

exports.getAllBookingOfUser = catchAsync(async (req, res, next) => {
  const booking = await Booking.find({ user: req.params.userId });

  res.status(200).json({
    status: "success",
    length: booking.length,
    data: {
      booking,
    },
  });
});

exports.getAllBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.find();

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
    next(new AppError("No booking found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Successfully retrieved",
    data: {
      booking,
    },
  });
});

exports.deleteBooking = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const booking = await Booking.findByIdAndDelete(id);

  if (!booking) {
    next(new AppError("No booking found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    message: "Successfully deleted",
    data: null,
  });
});
