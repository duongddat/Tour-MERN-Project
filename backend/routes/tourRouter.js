const express = require("express");

const tourController = require("../controllers/tourController");

const router = express.Router();

router.route("/country/:slug").get(tourController.getTourByCountry);
router.route("/monthy-statistic/:year").get(tourController.getMonthStatistic);
router.route("/search").get(tourController.getTourBySearch);

router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
