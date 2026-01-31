const express = require("express");
const rateLimiter = require("../middlewares/rateLimiter.middleware");
const {
  addVehicle,
  assignDriver,
  getVehicle
} = require("../controllers/vehicle.controller");

const router = express.Router();

router.post("/add", rateLimiter, addVehicle);
router.patch("/assign-driver/:id", assignDriver);
router.get("/:id", getVehicle);

module.exports = router;
