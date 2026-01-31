const express = require("express");
const {
  createTrip,
  updateTrip,
  getTrip,
  deleteTrip,
  endTrip
} = require("../controllers/trip.controller");

const router = express.Router();

router.post("/create", createTrip);
router.patch("/update/:id", updateTrip);
router.get("/:id", getTrip);
router.delete("/delete/:id", deleteTrip);
router.patch("/end/:id", endTrip);

module.exports = router;
