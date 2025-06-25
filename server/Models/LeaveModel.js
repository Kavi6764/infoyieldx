const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee", // Assuming you have an Employee model
    required: true,
  },
  leaveType: {
    type: String,
    enum: ["sick", "casual", "earned", "unpaid"],
    required: true,
  },
  fromDate: {
    type: Date,
    required: true,
  },
  toDate: {
    type: Date,
    required: true,
  },
  reason: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const LeaveModel = mongoose.model("Leave", leaveSchema);
module.exports = LeaveModel;
