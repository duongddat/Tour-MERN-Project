const multer = require("multer");
const sharp = require("sharp");

const Tour = require("../models/tourModel");
const Country = require("../models/countryModel");
const Booking = require("../models/bookingModel");
const Review = require("../models/reviewModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const AIPFeatures = require("../utils/apiFeatures");
const covertSearchKey = require("../utils/covertSearchUnikey");

//=====================CONFIGURE IMG FILE=============================
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

exports.uploadImages = upload.fields([
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 5 },
]);
//-------------RESIZE IMAGE AND SAVE FILE TO FOLDER--------------
exports.resizeImages = catchAsync(async (req, res, next) => {
  if (!req.files || (!req.files.imageCover && !req.files.images)) {
    return next();
  }

  if (req.files.imageCover) {
    const imageCover = `tour-cover-${Date.now()}-cover.jpeg`;
    await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`public/img/tour/${imageCover}`);

    //Convert to factory function req.body
    req.body.imageCover = imageCover;
  }

  if (req.files.images) {
    req.body.images = [];

    await Promise.all(
      req.files.images.map(async (file, i) => {
        const filename = `tour-images-${Date.now()}-${i + 1}.jpeg`;

        await sharp(file.buffer)
          .resize(2000, 1333)
          .toFormat("jpeg")
          .jpeg({ quality: 95 })
          .toFile(`public/img/tour/${filename}`);

        req.body.images.push(filename);
      })
    );
  }

  next();
});

//===================== END - CONFIGURE IMG FILE=========================
exports.getAllTours = catchAsync(async (req, res, next) => {
  const features = new AIPFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields();

  const tours = await features.query;

  res.status(200).json({
    status: "success",
    message: "Truy xuất thành công",
    lenght: tours.length,
    data: {
      tours,
    },
  });
});

exports.getTopTours = catchAsync(async (req, res, next) => {
  const features = new AIPFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const tours = await features.query;

  res.status(200).json({
    status: "success",
    message: "Truy xuất thành công",
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
    return next(
      new AppError(
        "Slug không được tìm thấy trong bất kỳ danh mục quốc gia nào",
        404
      )
    );
  }

  const features = new AIPFeatures(
    Tour.find({ country: country._id }),
    req.query
  )
    .filter()
    .sort()
    .limitFields();

  const tours = await features.query;

  res.status(200).json({
    status: "success",
    message: "Truy xuất thành công",
    lenght: tours.length,
    data: {
      tours,
    },
  });
});

exports.getTourBySearch = catchAsync(async (req, res, next) => {
  const keysearch = covertSearchKey(req.query.key || "");

  const key = new RegExp(keysearch, "i"); // Tạo 1 biểu thức chính quy (cờ i biểu thị tìm kiếm ko phân biệt hoa thường)
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

  //Lọc các query còn lại
  const additionalQueries = {};
  for (const param in req.query) {
    if (!["key", "duration", "maxGroupSize"].includes(param)) {
      additionalQueries[param] = req.query[param];
    }
  }

  const features = new AIPFeatures(Tour.find(query), additionalQueries)
    .filter()
    .sort()
    .limitFields();

  const tours = await features.query;

  res.status(200).json({
    status: "success",
    message: "Truy xuất thành công",
    lenght: tours.length,
    data: {
      tours,
    },
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const tour = await Tour.findById(id).populate({
    path: "reviews",
    options: { sort: { createdAt: 1 } },
  });

  if (!tour) {
    return next(
      new AppError("Không tìm thấy chuyến tham quan nào có ID đó", 404)
    );
  }

  res.status(200).json({
    status: "success",
    message: "Truy xuất thành công",
    data: {
      tour,
    },
  });
});

exports.getTourBySlug = catchAsync(async (req, res, next) => {
  const slug = req.params.slug;
  const tour = await Tour.findOne({ slug: slug }).populate({
    path: "reviews",
    options: { sort: { createdAt: 1 } },
  });

  if (!tour) {
    return next(
      new AppError("Không tìm thấy chuyến tham quan nào có slug đó", 404)
    );
  }

  res.status(200).json({
    status: "success",
    message: "Truy xuất thành công",
    data: {
      tour,
    },
  });
});

exports.createTour = catchAsync(async (req, res, next) => {
  let startLocation = req.body.startLocation;
  let locations = req.body.locations;
  const price = req.body.price;
  const priceDiscount = req.body.priceDiscount;

  if (priceDiscount && (priceDiscount < 0 || priceDiscount >= price)) {
    return next(
      new AppError("Giảm giá phải không âm và thấp hơn giá hiệnt tại!", 400)
    );
  }

  if (typeof locations === "string") {
    locations = JSON.parse(locations);
  }

  if (typeof startLocation === "string") {
    startLocation = JSON.parse(startLocation);
  }

  const newTour = await Tour.create({ ...req.body, startLocation, locations });
  res.status(200).json({
    status: "success",
    message: "Tạo mới chuyến tham quan thành công",
    data: {
      tour: newTour,
    },
  });
});

exports.updateTour = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  let startLocation = req.body.startLocation;
  let locations = req.body.locations;
  const price = req.body.price;
  const priceDiscount = req.body.priceDiscount;

  if (priceDiscount && (priceDiscount * 1 <= 0 || priceDiscount * 1 >= price)) {
    return next(
      new AppError("Giảm giá phải không âm và thấp hơn giá hiệnt tại!", 400)
    );
  }

  if (typeof locations === "string") {
    locations = JSON.parse(locations);
  }

  if (typeof startLocation === "string") {
    startLocation = JSON.parse(startLocation);
  }

  const tour = await Tour.findByIdAndUpdate(
    id,
    { ...req.body, startLocation, locations },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!tour) {
    return next(
      new AppError("Không tìm thấy chuyến tham quan nào có ID đó", 404)
    );
  }

  if (priceDiscount === undefined || priceDiscount === null) {
    tour.priceDiscount = undefined;
    await tour.save();
  }

  res.status(200).json({
    status: "success",
    message: "Cập nhật chuyến tham quan thành công!",
    data: {
      tour,
    },
  });
});

exports.deleteTour = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  // Kiểm tra xem tour tồn tại trong review
  const reviewExist = await Review.exists({ tour: id });

  // Kiểm tra xem tour tồn tại trong danh sách booking
  const bookingExist = await Booking.exists({ tour: id });

  // Nếu tour tồn tại trong  review hoặc booking
  if (reviewExist || bookingExist) {
    return next(
      new AppError(
        "Chuyến tham qua đã tham gia vào dữ liệu của hệ thống (Booking, Review), không thể xóa.",
        400
      )
    );
  }

  const tour = await Tour.findByIdAndDelete(id);

  if (!tour) {
    return next(
      new AppError("Không tìm thấy chuyến tham quan nào có ID đó", 404)
    );
  }

  res.status(204).json({
    status: "success",
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
      $sort: { numTourCreate: 1 },
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

exports.countToursByCountry = catchAsync(async (req, res, next) => {
  // Lấy danh sách tất cả các quốc gia cùng với số lượng tour tương ứng
  const countriesWithTours = await Country.aggregate([
    {
      $lookup: {
        from: "tours",
        localField: "_id",
        foreignField: "country",
        as: "tours",
      },
    },
    {
      $project: {
        _id: 0,
        country: "$name",
        count: { $size: "$tours" },
      },
    },
  ]);

  // Tính tổng số lượng tour hiện tại
  const totalTours = countriesWithTours.reduce(
    (total, country) => total + country.count,
    0
  );

  // Tính phần trăm số lượng tour của mỗi quốc gia trong số tour hiện tại
  const toursByCountryWithPercentage = countriesWithTours.map((country) => ({
    country: country.country,
    count: country.count,
    percentage: ((country.count || 0) / totalTours) * 100,
  }));

  // Gửi kết quả về client
  res.status(200).json({
    status: "success",
    data: { statistic: toursByCountryWithPercentage },
  });
});
