const Tour = require("../models/tourModel");
const Country = require("../models/countryModel");
const AIPFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllTours = catchAsync(async (req, res, next) => {
  const features = new AIPFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const tours = await features.query;

  res.status(200).json({
    status: "success",
    message: "Successfully retrieved",
    lenght: tours.length,
    data: {
      tours,
    },
  });
});

exports.getTourByCountry = catchAsync(async (req, res, next) => {
  const slug = req.params.slug;

  const country = await Country.findOne({ slug });
  if (!country) {
    next(new AppError("The slug was not found in any countries", 404));
  }

  const features = new AIPFeatures(
    Tour.find({ country: country._id }),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const tours = await features.query;

  if (tours.length === 0) {
    next(new AppError("Not found in any tours", 404));
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
  const tour = await Tour.findById(id).populate("reviews");

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
