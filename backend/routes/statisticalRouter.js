const express = require("express");
const statisticalController = require("../controllers/statisticalController");

const router = express.Router();

router.get("/record-of-month", statisticalController.getRecordsOfMonth);
router.get("/new-record", statisticalController.getNewRecordsCount);
router.get("/revenue-booking", statisticalController.revenueStatistics);

module.exports = router;
