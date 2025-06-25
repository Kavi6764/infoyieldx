const mongoose =require("mongoose");

const hrSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'hr'
  }
}, { timestamps: true });

const HRModel = mongoose.model("HR",hrSchema);

module.exports = HRModel;