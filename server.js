const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Connect to DB
connectDB();

app.use(express.json({ extended: false }));
app.use(cors());

// Public folder
app.use(express.static("./public"));

// Routes
app.use("/api/report", require("./routes/report.route.js"));

app.listen(1000, () => {
  console.log("Server is listening..");
});
