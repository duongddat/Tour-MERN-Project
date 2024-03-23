const express = require("express");

const authController = require("../controllers/authController");
const bookingController = require("../controllers/bookingController");

const router = express.Router();

router.route("/success").get(bookingController.paidTour);

router.use(authController.protect);

router.post("/checkout-session/:tourID", bookingController.getCheckoutSession);
router.route("/my-tour").get(bookingController.getAllBookingOfUser);

router.use(authController.restrictTo("admin"));

router.route("/").get(bookingController.getAllBooking);
router
  .route("/:id")
  .get(bookingController.getBooking)
  .delete(bookingController.deleteBooking);

module.exports = router;
