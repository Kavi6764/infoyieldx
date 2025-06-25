const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  department: {
    type: String,
  },
  location: {
    type: String,
  },
  type: {
    type: String,
    enum: ["Full-time", "Part-time", "Internship", "Contract"],
    default: "Full-time",
  },
  description: {
    type: String,
  },
  responsibilities: {
    type: [String], // e.g., ["Manage team", "Write code"]
  },
  requirements: {
    type: [String], // e.g., ["2+ years experience", "React knowledge"]
  },
  salaryRange: {
    type: String, // Optional field: "₹4–6 LPA", "$50K–70K", etc.
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  }
});
const JobModels =  mongoose.model("Job", jobSchema);
module.exports = JobModels;
