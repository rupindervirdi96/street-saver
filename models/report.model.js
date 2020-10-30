const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  fName: {
    type: String,
    required: true,
  },
  lName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  issue: {
    type: String,
    required: true,
  },
  location: {
    type: Object,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
});

module.exports = Report = mongoose.model("report", ReportSchema);
