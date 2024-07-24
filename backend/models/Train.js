const mongoose = require("mongoose");

const trainSchema = new mongoose.Schema({
  trainNumber: String,
  trainName: String,
  fromStnCode: String,
  toStnCode: String,
  arrivalTime: String,
  departureTime: String,
  distance: String,
  duration: String,
  runningMon: String,
  runningTue: String,
  runningWed: String,
  runningThu: String,
  runningFri: String,
  runningSat: String,
  runningSun: String,
  avlClasses: [String],
  trainType: [String],
  atasOpted: String,
  flexiFlag: String,
  trainOwner: String,
  trainsiteId: String,
});

module.exports = mongoose.model("Train", trainSchema);
