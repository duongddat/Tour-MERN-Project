const moment = require("moment");

const Discount = require("../models/discountModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllDiscounts = catchAsync(async (req, res, next) => {
  const discounts = await Discount.find({});

  res.status(200).json({
    status: "success",
    message: "Successfully retrieved",
    lenght: discounts.length,
    data: {
      discounts,
    },
  });
});

exports.getDiscount = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const discount = await Discount.findById(id);

  if (!discount) {
    return next(new AppError("No discount found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Successfully retrieved",
    data: {
      discount,
    },
  });
});

exports.createDiscount = catchAsync(async (req, res, next) => {
  const newDiscount = await Discount.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      Discount: newDiscount,
    },
  });
});

exports.updateDiscount = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const discount = await Discount.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!discount) {
    return next(new AppError("No Discount found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Successfully updated",
    data: {
      discount,
    },
  });
});

exports.deleteDiscount = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const discount = await Discount.findByIdAndDelete(id);

  if (!discount) {
    return next(new AppError("No Discount found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    message: "Successfully deleted",
    data: null,
  });
});
