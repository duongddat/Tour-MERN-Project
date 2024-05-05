const Discount = require("../models/discountModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.checkDiscountCode = catchAsync(async (req, res, next) => {
  const { code, countryId } = req.body;

  const discount = await Discount.isValidDiscountCode(code, countryId);

  if (!discount) {
    return next(new AppError("Mã giảm giá không hợp lệ!", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Áp mã giảm giá thành công!",
    data: {
      percentage: discount.percentage,
    },
  });
});

exports.getAllDiscounts = catchAsync(async (req, res, next) => {
  const discounts = await Discount.find({}).sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    message: "Truy xuất thành công",
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
    return next(new AppError("Không tìm thấy mã giảm giá nào với ID đó!", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Truy xuất thành công",
    data: {
      discount,
    },
  });
});

exports.createDiscount = catchAsync(async (req, res, next) => {
  const newDiscount = await Discount.create(req.body);

  res.status(201).json({
    status: "success",
    message: "Tạo mã giảm giá thành công",
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
    return next(new AppError("Không tìm thấy mã giảm giá nào với ID đó!", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Đã cập nhật dữ liệu thành công!",
    data: {
      discount,
    },
  });
});

exports.deleteDiscount = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const discount = await Discount.findByIdAndDelete(id);

  if (!discount) {
    return next(new AppError("Không tìm thấy mã giảm giá nào với ID đó!", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
