const mongoose = require("mongoose");
const slugify = require("slugify");

const countrySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A country must have name"],
      unique: true,
      trim: true,
    },
    slug: String,
  },
  { timestamps: true }
);

countrySchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Country = mongoose.model("Country", countrySchema);

module.exports = Country;
