const express = require("express");

const tourController = require("../controllers/tourController");
const authController = require("../controllers/authController");
const reviewRouter = require("../routes/reviewRouter");

const router = express.Router();

router.use("/:tourId/reviews", reviewRouter);

router.route("/country/:slug").get(tourController.getTourByCountry);
router.route("/monthy-statistic/:year").get(tourController.getMonthStatistic);
router.route("/search").get(tourController.getTourBySearch);

router
  .route("/")
  .get(tourController.getAllTours)
  .post(
    tourController.uploadImages,
    tourController.resizeImages,
    tourController.createTour
  );

router
  .route("/:id")
  .get(tourController.getTour)
  .patch(
    tourController.uploadImages,
    tourController.resizeImages,
    tourController.updateTour
  )
  .delete(tourController.deleteTour);

module.exports = router;
