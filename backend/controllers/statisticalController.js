const moment = require("moment");

const catchAsync = require("../utils/catchAsync");
const Review = require("../models/reviewModel");
const Tour = require("../models/tourModel");
const Post = require("../models/postModel");
const User = require("../models/userModel");
const Booking = require("../models/bookingModel");
const AppError = require("../utils/appError");

exports.getNewRecordsCount = catchAsync(async (req, res, next) => {
  const today = moment().startOf("day");
  const tomorrow = moment(today).endOf("day");

  // Query for counting new records for each model
  const newCounts = await Promise.all([
    Tour.countDocuments({ createdAt: { $gte: today, $lt: tomorrow } }),
    Post.countDocuments({ createdAt: { $gte: today, $lt: tomorrow } }),
    User.countDocuments({ createdAt: { $gte: today, $lt: tomorrow } }),
    Review.countDocuments({ createdAt: { $gte: today, $lt: tomorrow } }),
  ]);

  // Query for counting total records for each model
  const totalCounts = await Promise.all([
    Tour.countDocuments({}),
    Post.countDocuments({}),
    User.countDocuments({}),
    Review.countDocuments({}),
  ]);

  // Prepare response data
  const result = {
    Tour: {
      new: newCounts[0],
      total: totalCounts[0],
    },
    Post: {
      new: newCounts[1],
      total: totalCounts[1],
    },
    User: {
      new: newCounts[2],
      total: totalCounts[2],
    },
    Review: {
      new: newCounts[3],
      total: totalCounts[3],
    },
  };

  // Send response
  res.status(200).json({
    status: "success",
    data: { statis: result },
  });
});

exports.getRecordsOfMonth = catchAsync(async (req, res, next) => {
  const { type } = req.query;
  const startOfMonth = moment().startOf("month");
  const endOfMonth = moment().endOf("month");

  let model;
  switch (type) {
    case "tour":
      model = Tour;
      break;
    case "post":
      model = Post;
      break;
    case "user":
      model = User;
      break;
    default:
      return next(new AppError("Invalid type parameter", 400));
  }

  // Query for counting new records for each week in the current month
  const result = {};
  let currentDate = startOfMonth.clone().startOf("week");
  let weekIndex = 1;

  while (currentDate.isBefore(endOfMonth)) {
    const count = await model.countDocuments({
      createdAt: {
        $gte: currentDate,
        $lte: currentDate.clone().endOf("week"),
      },
    });

    result[`Week ${weekIndex}`] = count;
    currentDate.add(1, "week");
    weekIndex++;
  }

  // Send response
  res.status(200).json({
    status: "success",
    data: { statistics: result },
  });
});

exports.revenueStatistics = catchAsync(async (req, res, next) => {
  const { year } = req.query;

  // Initialize query object
  const query = {};

  // Check if year is provided in the query
  if (year) {
    const startOfYear = moment().year(year).startOf("year");
    const endOfYear = moment(startOfYear).endOf("year");
    query.bookAt = {
      $gte: startOfYear.toDate(),
      $lte: endOfYear.toDate(),
    };

    // If the provided year is the current year, include months up to the current month
    if (parseInt(year) === moment().year()) {
      const currentMonth = moment().month() + 1; // Get the current month (January is 0)
      query.bookAt.$lte = moment()
        .month(currentMonth - 1)
        .endOf("month")
        .toDate();
    }
  } else {
    return next(new AppError("Year is a required parameter'", 404));
  }

  // Aggregate bookings based on the provided query
  const bookings = await Booking.aggregate([
    {
      $match: query,
    },
    {
      $group: {
        _id: { $month: "$bookAt" },
        totalRevenue: { $sum: "$price" },
        totalBookings: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        month: "$_id",
        totalRevenue: 1,
        totalBookings: 1,
      },
    },
  ]);

  // Send response
  res.status(200).json({ status: "success", data: { statistics: bookings } });
});
