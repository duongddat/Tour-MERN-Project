const multer = require("multer");
const sharp = require("sharp");

const User = require("../models/userModel");
const Review = require("../models/reviewModel");
const Blog = require("../models/postModel");
const Booking = require("../models/bookingModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

//=====================CONFIGURE IMG FILE=========================
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        "Không phải là hình ảnh! Vui lòng chỉ tải lên hình ảnh.",
        400
      ),
      false
    );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("photo");

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  const ext = req.file.mimetype.split("/")[1];
  req.file.filename = `user-${req.user.id}-${Date.now()}.${ext}`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFile(`public/img/user/${req.file.filename}`);

  next();
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({}).sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    message: "Truy xuất thành công",
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
    return next(new AppError("Không tìm thấy người dùng nào có ID đó", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Truy xuất thành công",
    data: {
      user,
    },
  });
});

exports.getGuide = catchAsync(async (req, res, next) => {
  const users = await User.find({ role: { $in: ["guide", "admin"] } });

  res.status(200).json({
    status: "success",
    message: "Truy xuất thành công",
    lenght: users.length,
    data: {
      users,
    },
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  if (req.file) req.body.photo = req.file.filename;

  const newUser = await User.create(req.body);

  res.status(201).json({
    status: "success",
    message: "Tạo mới người dùng thành công",
    data: {
      data: newUser,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  if (req.file) req.body.photo = req.file.filename;

  const id = req.params.id;
  const user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(new AppError("Không tìm thấy người dùng nào có ID đó", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Cập nhật dữ liệu thành công!",
    data: {
      user,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  // Kiểm tra xem user tồn tại trong review
  const reviewExist = await Review.exists({ user: id });

  // Kiểm tra xem user tồn tại trong bài đăng blog
  const blogExist = await Blog.exists({ user: id });

  // Kiểm tra xem user tồn tại trong danh sách booking
  const bookingExist = await Booking.exists({ user: id });

  // Nếu user tồn tại trong  review, blog hoặc booking
  if (reviewExist || blogExist || bookingExist) {
    return next(
      new AppError(
        "Người dùng đã tham gia vào dữ liệu của hệ thống (Review, Blog, Booking), không thể xóa.",
        400
      )
    );
  }

  const user = await User.findByIdAndDelete(id);

  if (!user) {
    return next(new AppError("Không tìm thấy người dùng nào có ID đó", 404));
  }

  res.status(204).json({
    status: "success",
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
        "Tuyến đường này không dành cho cập nhật mật khẩu. Vui lòng sử dụng chức năng cập nhật mật khẩu!",
        400
      )
    );
  }

  //2. Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, "name", "email", "phone", "address");
  if (req.file) filteredBody.photo = req.file.filename;

  //3. Update user document
  const updateUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    message: "Cập nhật thông tin thành công!",
    data: {
      user: updateUser,
    },
  });
});
