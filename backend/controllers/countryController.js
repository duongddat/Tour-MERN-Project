const Country = require("../models/countryModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllCountries = catchAsync(async (req, res, next) => {
  const countries = await Country.find({});

  res.status(200).json({
    status: "success",
    message: "Successfully retrieved",
    lenght: countries.length,
    data: {
      countries,
    },
  });
});

exports.getCountry = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const country = await Country.findById(id);

  if (!country) {
    return next(new AppError("No country found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Successfully retrieved",
    data: {
      country,
    },
  });
});

exports.createCountry = catchAsync(async (req, res, next) => {
  const newCountry = await Country.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      data: newCountry,
    },
  });
});

exports.updateCountry = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const country = await Country.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!country) {
    return next(new AppError("No country found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Successfully updated",
    data: {
      country,
    },
  });
});

exports.deleteCountry = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const country = await Country.findByIdAndDelete(id);

  if (!country) {
    return next(new AppError("No country found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    message: "Successfully deleted",
    data: null,
  });
});
