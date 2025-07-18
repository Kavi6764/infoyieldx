const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
    unique: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: String,
  position: String,
  department: String,
  type: {
    type: String,
    enum: ["intern", "employee"],
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive", "terminated"],
    default: "active",
  },
  joiningDate: {
    type: Date,
    default: Date.now,
  },
  password: {
    type: String,
    required: true,
  },
 leaveBalance: {
  sick: { type: Number, default: 10 },
  casual: { type: Number, default: 20 },
  earned: { type: Number, default: 15 },
  unpaid: { type: Number, default: 0 }
},
  // ✅ Newly added fields
  dateOfBirth: Date,
  address: String,
  salary: String,
  emergencyContact: String,
  avatar: String, // If storing image URL path
});

const EmployeeModel = mongoose.model("Employee", employeeSchema);

module.exports = EmployeeModel;
