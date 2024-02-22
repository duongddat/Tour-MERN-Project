const Tour = require("../models/tour");

const cathAsync = require("../utils/catchAsync");

exports.createTour = cathAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);

  res.status(200).json({
    status: "success",
    message: "Successfully created",
    data: {
      tours: newTour,
    },
  });
});
