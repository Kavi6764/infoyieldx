const mongoose = require("mongoose");

const regularizationSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
  date: { type: String, required: true }, // Format: "YYYY-MM-DD"
  requestedStatus: { type: String, enum: ["Present", "Late"], required: true },
  reason: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "HR", default: null },
  reviewedAt: { type: Date, default: null }
});

module.exports = mongoose.model("Regularization", regularizationSchema);
