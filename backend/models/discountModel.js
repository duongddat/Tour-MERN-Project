const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "Discount must have a code"],
      unique: true,
    },
    percentage: {
      type: Number,
      required: [true, "Discount must have a Percentage"],
      min: 0,
      max: 100,
    },
    expiryDate: {
      type: Date,
      required: [true, "Discount must have expiry date"],
    },
    country: {
      type: mongoose.Schema.ObjectId,
      ref: "Country",
      required: [true, "Discount must belong to a country"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

discountSchema.pre(/^find/, function (next) {
  this.populate({
    path: "country",
    select: "-__v -createdAt -updatedAt",
  });

  next();
});

discountSchema.statics.isValidDiscountCode = async function (code, countryId) {
  const discount = await this.findOne({
    code,
    country: countryId,
    expiryDate: { $gte: new Date() },
    isActive: true,
  });
  return discount;
};

const Discount = mongoose.model("Discount", discountSchema);

module.exports = Discount;
