const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({});

  res.status(200).json({
    status: "success",
    message: "Successfully retrieved",
    lenght: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);

  if (!user) {
    next(new AppError("No user found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Successfully retrieved",
    data: {
      user,
    },
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      data: newUser,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    next(new AppError("No user found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Successfully updated",
    data: {
      user,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    next(new AppError("No user found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    message: "Successfully deleted",
    data: null,
  });
});

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

const filterObj = (obj, ...allowedField) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedField.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  //1. Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword.",
        400
      )
    );
  }

  //2. Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, "name", "email");
  if (req.file) filteredBody.photo = req.file.filename;

  //3. Update user document
  const updateUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updateUser,
    },
  });
});