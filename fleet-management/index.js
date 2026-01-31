const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());

// middlewares
app.use(require("./middlewares/logger.middleware"));

// routes
app.use("/users", require("./routes/user.routes"));
app.use("/vehicles", require("./routes/vehicle.routes"));
app.use("/trips", require("./routes/trip.routes"));
app.use("/analytics", require("./routes/analytics.routes"));

// 404
app.use(require("./middlewares/notFound.middleware"));

app.listen(process.env.PORT, () => {
  console.log("Server running");
});
