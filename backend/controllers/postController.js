const multer = require("multer");
const sharp = require("sharp");

const Post = require("../models/postModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

//=====================CONFIGURE IMG FILE=============================
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadImages = upload.array("photo", 5);

exports.resizeImages = catchAsync(async (req, res, next) => {
  if (req.files.length === 0) {
    return next();
  }

  req.body.photo = [];

  await Promise.all(
    req.files.map(async (file, i) => {
      const ext = file.mimetype.split("/")[1];
      const filename = `post-images-${Date.now()}-${i + 1}.${ext}`;

      await sharp(file.buffer).toFile(`public/img/post/${filename}`);

      req.body.photo.push(filename);
    })
  );

  next();
});

//===================== END - CONFIGURE IMG FILE=========================

exports.setUserIds = (req, res, next) => {
  //Allow nested routes
  if (!req.body.user) req.body.user = req.user.id;

  next();
};

exports.getAllPostes = catchAsync(async (req, res, next) => {
  const posts = await Post.find({});

  res.status(200).json({
    status: "success",
    message: "Successfully retrieved",
    lenght: posts.length,
    data: {
      posts,
    },
  });
});

exports.getPostOfUser = catchAsync(async (req, res, next) => {
  const id = req.user.id;
  const posts = await Post.find({ user: id });

  res.status(200).json({
    status: "success",
    message: "Successfully retrieved",
    lenght: posts.length,
    data: {
      posts,
    },
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const post = await Post.findById(id);

  if (!post) {
    return next(new AppError("No post found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Successfully retrieved",
    data: {
      post,
    },
  });
});

exports.createPost = catchAsync(async (req, res, next) => {
  const newPost = await Post.create(req.body);

  res.status(201).json({
    status: "success",
    message: "Successfull to create blog",
    data: {
      data: newPost,
    },
  });
});

exports.checkPostOfUser = catchAsync(async (req, res, next) => {
  const currentPost = await Post.findById(req.params.id);

  if (
    (!currentPost || currentPost.user._id != req.user.id) &&
    !(req.method === "DELETE" && req.user.role === "admin")
  ) {
    return next(new AppError("This post is not yours or doesn't exist!", 401));
  }

  next();
});

exports.updatePost = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const post = await Post.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!post) {
    return next(new AppError("No post found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Successfully updated",
    data: {
      post,
    },
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const post = await Post.findByIdAndDelete(id);

  if (!post) {
    return next(new AppError("No post found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    message: "Successfully deleted",
    data: null,
  });
});

exports.likePost = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const post = await Post.findById(id);

  if (!post.likes.includes(req.user._id)) {
    await Post.updateOne({ _id: id }, { $push: { likes: req.user._id } });

    res.status(200).json({
      status: "success",
      message: "The Post has been liked!",
    });
  } else {
    await Post.updateOne({ _id: id }, { $pull: { likes: req.user._id } });
    res.status(200).json({
      status: "success",
      message: "The Post has been disliked!",
    });
  }
});
