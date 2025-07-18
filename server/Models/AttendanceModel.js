const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  date: {
    type: String, 
    required: true,
  },
  status: {
    type: String,
    enum: ["Present", "Late", "Absent"],
    required: true,
  },
  markedAt: {
    type: Date,
    default: null,
  }
  
}, { timestamps: true });

// Ensure one attendance record per employee per day
attendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Attendance", attendanceSchema);
