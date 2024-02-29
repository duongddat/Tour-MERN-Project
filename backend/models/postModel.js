const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title can not be empty!"],
    },
    description: {
      type: String,
    },
    photo: [String],
    country: {
      type: mongoose.Schema.ObjectId,
      ref: "Country",
      required: [true, "Post must belong to a country"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Post must belong to a user"],
    },
    likes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

postSchema.pre(/^find/, function (next) {
  this.populate({
    path: "country",
    select: "-__v -createdAt -updatedAt",
  }).populate({
    path: "user",
    select: "_id name email photo",
  });

  next();
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
