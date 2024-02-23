const Tour = require("../models/tourModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllTours = catchAsync(async (req, res, next) => {
  //BUILD QUERY
  //1A. Filtering
  const queryObj = { ...req.query };
  const excludedFields = ["page", "sort", "limit", "fields"];
  excludedFields.forEach((el) => delete queryObj[el]);

  //1B. Advanced filtering
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  let query = Tour.find(JSON.parse(queryStr));

  //2. Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt -_id");
  }

  //3.Field limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    query = query.select(fields);
  } else {
    query = query.select("-__v");
  }

  //4.Pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);

  if (req.query.page) {
    const numTours = await Tour.countDocuments();
    if (skip >= numTours) throw new Error("This page does not exist");
  }

  //EXECUTE QUERY
  const tours = await query;

  res.status(200).json({
    status: "success",
    message: "Successfully retrieved",
    lenght: tours.length,
    data: {
      tours,
    },
  });
});

exports.getTourBySearch = catchAsync(async (req, res, next) => {
  const key = new RegExp(req.query.key, "i"); // Tạo 1 biểu thức chính quy (cờ i biểu thị tìm kiếm ko phân biệt hoa thường)
  const duration = parseInt(req.query.duration);
  const maxGroupSize = parseInt(req.query.maxGroupSize);
  const query = {
    $or: [{ title: key }, { description: key }],
  };

  // Check duration
  if (duration !== undefined && !isNaN(duration)) {
    query.duration = { $gte: duration };
  }

  // Check maxGroupSize
  if (maxGroupSize !== undefined && !isNaN(maxGroupSize)) {
    query.maxGroupSize = { $gte: maxGroupSize };
  }

  const tours = await Tour.find(query);

  if (tours.length === 0) {
    next(new AppError("The search key was not found in any tours", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Successfully retrieved",
    lenght: tours.length,
    data: {
      tours,
    },
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const tour = await Tour.findById(id);

  if (!tour) {
    next(new AppError("No tour found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Successfully retrieved",
    data: {
      tour,
    },
  });
});

exports.createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);

  res.status(200).json({
    status: "success",
    message: "Successfully created",
    data: {
      tour: newTour,
    },
  });
});

exports.updateTour = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const tour = await Tour.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!tour) {
    next(new AppError("No tour found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Successfully updated",
    data: {
      tour,
    },
  });
});

exports.deleteTour = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const tour = await Tour.findByIdAndDelete(id);

  if (!tour) {
    next(new AppError("No tour found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    message: "Successfully deleted",
    data: null,
  });
});

exports.getMonthStatistic = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;
  const statistic = await Tour.aggregate([
    {
      $unwind: "$createdAt",
    },
    {
      $match: {
        createdAt: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        numTourCreate: { $sum: 1 },
        tours: { $push: "$title" },
      },
    },
    {
      $addFields: { month: "$_id" },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: { numTourCreate: -1 },
    },
    {
      $limit: 12,
    },
  ]);
  res.status(200).json({
    status: "success",
    data: {
      statistic,
    },
  });
});
