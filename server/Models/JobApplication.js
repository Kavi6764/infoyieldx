const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    dob: { type: Date },
    gender: { type: String, enum: ["male", "female", "other"] },

    position: { type: String, required: true },
    degree: { type: String },
    university: { type: String },
    graduationYear: { type: String },

    coverLetter: { type: String },
    skills: { type: [String], default: [] },

    currentSalary: { type: String },
    expectedSalary: { type: String, required: true },
    availability: { type: String, required: true },
    experience: { type: String, required: true },

    resume: { type: String }, // store file path or URL
  },
  { timestamps: true }
);
const JobApplicationModel = mongoose.model(
  "JobApplication",
  jobApplicationSchema
);
module.exports = JobApplicationModel;
