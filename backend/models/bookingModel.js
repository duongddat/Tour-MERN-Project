const mongoose = require("mongoose");
const moment = require("moment");

const AppError = require("../utils/appError");

const bookingSchema = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: "Tour",
    required: [true, "Booking must belong to a Tour!"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Booking must belong to a User!"],
  },
  guestSize: {
    type: Number,
    required: [true, "Booking must have a guestSize."],
  },
  price: {
    type: Number,
    required: [true, "Booking must have a price."],
  },
  bookAt: {
    type: Date,
    required: [true, "Booking must have a date"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  paid: {
    type: Boolean,
    default: false,
  },
});

bookingSchema.pre(/^find/, function (next) {
  this.populate("user").populate({
    path: "tour",
    select: "title slug",
  });

  next();
});

bookingSchema.pre("save", function (next) {
  const currentDate = moment();
  const bookingDate = moment(this.bookAt, "DD/MM/YYYY");

  if (bookingDate.isBefore(currentDate, "day")) {
    return next(new AppError("Booking date cannot be in the past.", 400));
  }
  next();
});

bookingSchema.pre(/^find/, async function (next) {
  await this.model.deleteMany({
    paid: false,
  });

  next();
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
